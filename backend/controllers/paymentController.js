import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Address from "../models/Address.js";
import Finance from "../models/Finance.js";


// =========================
// CREATE PAYMENT ORDER
// =========================

export const createPaymentOrder = async (req, res) => {

    try {

        // const {

        //     addressId,

        //     items,

        //     subtotal,

        //     deliveryCharge,

        //     platformFee,

        //     handlingCharge,

        //     discount,

        //     grandTotal,

        // } = req.body;
const {

addressId,

items,

discount

}=req.body;
const subtotal = items.reduce(
    (sum, item) =>
        sum + (item.price * item.quantity),
    0
);

const finance = await Finance.findOne();

if (!finance) {
    return res.status(404).json({
        success: false,
        message: "Finance settings not found"
    });
}

// DELIVERY

let deliveryCharge = 0;

const deliveryRule = finance.deliveryRules.find(rule =>
    subtotal >= rule.minAmount &&
    subtotal <= rule.maxAmount
);

if (deliveryRule) {
    deliveryCharge = deliveryRule.deliveryCharge;
}


// PLATFORM

let platformFee = 0;

if (finance.platformFee.enabled) {

    if (finance.platformFee.feeType === "Flat") {

        platformFee = finance.platformFee.amount;

    } else {

        platformFee =
            subtotal *
            finance.platformFee.amount /
            100;
    }

    if (
        platformFee >
        finance.platformFee.maximumFee
    ) {
        platformFee =
            finance.platformFee.maximumFee;
    }
}


// HANDLING

let handlingCharge = 0;

if (finance.handlingFee.enabled) {

    if (finance.handlingFee.feeType === "Flat") {

        handlingCharge =
            finance.handlingFee.amount;

    } else {

        handlingCharge =
            subtotal *
            finance.handlingFee.amount /
            100;
    }

}


// PACKAGING

const packingCharge =
finance.packagingFee.enabled
? finance.packagingFee.amount
: 0;


// RAIN

const rainFee =
finance.rainFee.enabled
? finance.rainFee.amount
: 0;


// SURGE

const surgeFee =
finance.surgeFee.enabled
? finance.surgeFee.amount
: 0;


// GST

const taxableAmount =

subtotal +

deliveryCharge +

platformFee +

handlingCharge +

packingCharge +

rainFee +

surgeFee;

const gstAmount =
finance.gst.enabled
?
Number(
(
taxableAmount *
finance.gst.percentage /
100
).toFixed(2)
)
:
0;

const grandTotal =
Number(
(
taxableAmount +
gstAmount
).toFixed(2)
);

// 
console.log("========== PAYMENT CALCULATION ==========");
console.log("Subtotal:", subtotal);
console.log("Delivery:", deliveryCharge);
console.log("Platform:", platformFee);
console.log("Handling:", handlingCharge);
console.log("Packing:", packingCharge);
console.log("GST:", gstAmount);
console.log("Grand Total:", grandTotal);
console.log("=========================================");

// 
        const user = req.user.id;



        // Check Address

        const address = await Address.findById(addressId);

        if (!address) {

            return res.status(404).json({

                success: false,

                message: "Address not found",

            });

        }



        // Save Order

const order = await Order.create({

    orderNumber:
        "NG" +
        Date.now(),

    user,

    address: addressId,

    items: items.map(item => ({

        product: item.product,

        vendor: item.vendor,

        productName: item.name,

        productDescription: "",

        productImage: item.image,

        price: item.price,

        quantity: item.quantity,

        subtotal: item.total,

    })),

    totalItems: items.reduce(
        (sum, item) => sum + item.quantity,
        0
    ),

    
subtotal,

deliveryCharge,

platformFee,

handlingCharge,

packingCharge,

tax:gstAmount,

discount,

grandTotal,

});



        // Razorpay Order
console.log("Creating Razorpay Order...");
       const razorpayOrder = await razorpay.orders.create({

    amount: grandTotal * 100,

    currency: "INR",

    receipt: order.orderNumber,

    notes: {

        website: "NexttGrains",

        source: "NexttGrains",

        orderNumber: order.orderNumber,

        mongoOrderId: order._id.toString(),

        customerId: user,

    },

});



        // Save Razorpay Order Id

        order.razorpayOrderId = razorpayOrder.id;

        await order.save();



        // Save Payment

        await Payment.create({

            user,

            order: order._id,

            razorpayOrderId: razorpayOrder.id,

            amount: grandTotal,

            paymentStatus: "Pending",
             sourceApp:"NexttGrains"

        });



        res.status(200).json({

            success: true,

            order,

            razorpayOrder,

        });

    }

catch (error) {

    console.log("========= PAYMENT ERROR =========");
    console.log(error);
    console.log(error.message);
    console.log(error.stack);

    res.status(500).json({
        success:false,
        message:error.message
    });

}

};



export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid Signature",
            });
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        payment.paymentStatus = "Paid";
        payment.paidAt = new Date();

        await payment.save();

        const order = await Order.findById(payment.order);

        order.paymentStatus = "Paid";
        order.paymentMethod = "UPI";
        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;

        await order.save();

        return res.json({
            success: true,
            message: "Payment Verified",
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};