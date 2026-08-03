import Contact from "../models/Contact.js";

/* ==========================================================
    CREATE CONTACT MESSAGE
========================================================== */

export const createContact = async (req, res) => {

try{

const{

fullName,
email,
phone,
category,
subject,
message

}=req.body;
console.log({

fullName,
email,
phone,
category,
subject,
message

});

/* ------------------------------
Validation
------------------------------ */

// if(
// !fullName ||
// !email ||
// !phone ||
// !subject ||
// !message
// ){

// return res.status(400).json({

// success:false,
// message:"All fields are required."

// });

// }
/* ------------------------------
Validation
------------------------------ */

// Full Name
if (!fullName || fullName.trim() === "") {

    return res.status(400).json({
        success: false,
        message: "Full name is required."
    });

}

if (fullName.trim().length < 3) {

    return res.status(400).json({
        success: false,
        message: "Full name must contain at least 3 characters."
    });

}

// Email
if (!email || email.trim() === "") {

    return res.status(400).json({
        success: false,
        message: "Email is required."
    });

}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {

    return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
    });

}

// Phone
if (!phone || phone.trim() === "") {

    return res.status(400).json({
        success: false,
        message: "Mobile number is required."
    });

}

const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(phone)) {

    return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number."
    });

}

// Category
if (!category || category.trim() === "") {

    return res.status(400).json({
        success: false,
        message: "Please select a category."
    });

}

// Subject
if (!subject || subject.trim() === "") {

    return res.status(400).json({
        success: false,
        message: "Subject is required."
    });

}

if (subject.trim().length < 5) {

    return res.status(400).json({
        success: false,
        message: "Subject must contain at least 5 characters."
    });

}

// Message
if (!message || message.trim() === "") {

    return res.status(400).json({
        success: false,
        message: "Message is required."
    });

}

if (message.trim().length < 20) {

    return res.status(400).json({
        success: false,
        message: "Message must contain at least 20 characters."
    });

}
/* ------------------------------
Save
------------------------------ */

const contact=await Contact.create({

fullName,
email,
phone,
category,
subject,
message

});

return res.status(201).json({

success:true,

message:"Your message has been sent successfully.",

contact

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
    GET ALL CONTACTS
========================================================== */

export const getAllContacts=async(req,res)=>{

try{

const contacts=await Contact.find({

isDeleted:false

})

.sort({

createdAt:-1

});

return res.json({

success:true,

count:contacts.length,

contacts

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
    GET SINGLE CONTACT
========================================================== */

export const getSingleContact=async(req,res)=>{

try{

const contact=await Contact.findById(

req.params.id

);

if(!contact){

return res.status(404).json({

success:false,

message:"Contact not found."

});

}

return res.json({

success:true,

contact

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
    UPDATE CONTACT STATUS
========================================================== */

export const updateContactStatus = async (req, res) => {

try{

const { status } = req.body;

const contact = await Contact.findById(req.params.id);

if(!contact){

return res.status(404).json({

success:false,

message:"Contact not found."

});

}

contact.status = status;

await contact.save();

return res.json({

success:true,

message:"Contact status updated successfully.",

contact

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
    MARK AS READ
========================================================== */

export const markAsRead = async (req, res) => {

try{

const contact = await Contact.findById(req.params.id);

if(!contact){

return res.status(404).json({

success:false,

message:"Contact not found."

});

}

contact.isRead = true;

await contact.save();

return res.json({

success:true,

message:"Marked as read.",

contact

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
    DELETE CONTACT
========================================================== */

export const deleteContact = async (req, res) => {

try{

const contact = await Contact.findById(req.params.id);

if(!contact){

return res.status(404).json({

success:false,

message:"Contact not found."

});

}

contact.isDeleted = true;

await contact.save();

return res.json({

success:true,

message:"Contact deleted successfully."

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
    CONTACT DASHBOARD STATS
========================================================== */

export const getContactStats = async (req, res) => {

try{

const total = await Contact.countDocuments({

isDeleted:false

});

const unread = await Contact.countDocuments({

isDeleted:false,

isRead:false

});

const pending = await Contact.countDocuments({

isDeleted:false,

status:{
$ne:"Resolved"
}

});

const resolved = await Contact.countDocuments({

isDeleted:false,

status:"Resolved"

});

return res.json({

success:true,

stats:{

total,

unread,

pending,

resolved

}

});

}

catch(error){

return res.status(500).json({

success:false,

message:error.message

});

}

};

// reply contact
export const replyContact=async(req,res)=>{

const{

reply

}=req.body;

const contact=await Contact.findById(req.params.id);

contact.adminReply=reply;

contact.replyDate=new Date();

await contact.save();

res.json({

success:true,

message:"Reply saved."

});

}