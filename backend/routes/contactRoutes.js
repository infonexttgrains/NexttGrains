import express from "express";

import {

    createContact,

    getAllContacts,

    getSingleContact,

    updateContactStatus,

    markAsRead,

    deleteContact,

    getContactStats,
    replyContact

} from "../controllers/contactController.js";

// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ==========================================================
   WEBSITE
========================================================== */

// Submit Contact Form

router.post(

    "/",

    createContact

);

/* ==========================================================
   ADMIN
========================================================== */

// Dashboard Stats

router.get(

    "/admin/stats",

    // authMiddleware,
    // adminMiddleware,

    getContactStats

);

// Get All Messages

router.get(

    "/admin",

    // authMiddleware,
    // adminMiddleware,

    getAllContacts

);

// Get Single Message

router.get(

    "/admin/:id",

    // authMiddleware,
    // adminMiddleware,

    getSingleContact

);

// Update Status

router.put(

    "/admin/status/:id",

    // authMiddleware,
    // adminMiddleware,

    updateContactStatus

);

// Mark As Read

router.put(

    "/admin/read/:id",

    // authMiddleware,
    // adminMiddleware,

    markAsRead

);

// Delete Message

router.delete(

    "/admin/:id",

    // authMiddleware,
    // adminMiddleware,

    deleteContact

);

router.put(

"/admin/reply/:id",

replyContact

);

export default router;