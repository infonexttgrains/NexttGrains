import Order from "../models/Order.js";
import {
    createNimbusShipment,
    trackShipment,
    cancelShipment,
    generateShippingLabel,
    generateManifest
} from "../services/nimbusService.js";


/* ==========================================================
   CREATE SHIPMENT
========================================================== */

export const createShipment = async (req, res) => {

    try {

        const order = await Order
            .findById(req.params.orderId)
            .populate("address")
            .populate("items.product");

        if (!order) {

            return res.status(404).json({

                success:false,
                message:"Order not found."

            });

        }

        /* ------------------------------------------
           Prepare Shipment Payload
        ------------------------------------------ */

        const shipmentPayload = {

            order

        };

        /* ------------------------------------------
           Nimbus API
        ------------------------------------------ */

        const response =
            await createNimbusShipment(
                shipmentPayload
            );

        return res.json({

            success:true,

            response

        });

    }

    catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

/* ==========================================================
   TRACK SHIPMENT
========================================================== */

export const getShipmentTracking = async (req,res)=>{

    try{

        const {

            awb

        }=req.params;

        const tracking=

            await trackShipment(awb);

        return res.json({

            success:true,

            tracking

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

/* ==========================================================
   CANCEL SHIPMENT
========================================================== */

export const cancelShipmentController=async(req,res)=>{

    try{

        const{

            shipmentId

        }=req.params;

        const response=

            await cancelShipment(

                shipmentId

            );

        return res.json({

            success:true,

            response

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

/* ==========================================================
   LABEL
========================================================== */

export const downloadLabel=async(req,res)=>{

    try{

        const{

            shipmentId

        }=req.params;

        const label=

            await generateShippingLabel(

                shipmentId

            );

        return res.json({

            success:true,

            label

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

/* ==========================================================
   MANIFEST
========================================================== */

export const downloadManifestController=async(req,res)=>{

    try{

        const{

            shipmentId

        }=req.params;

        const manifest=

            await generateManifest(

                shipmentId

            );

        return res.json({

            success:true,

            manifest

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};