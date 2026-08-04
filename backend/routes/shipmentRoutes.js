import express from "express";

import {

    createShipment,

    getShipmentTracking,

    cancelShipmentController,

    downloadLabel,

    downloadManifestController

} from "../controllers/shipmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================================
   CREATE SHIPMENT
========================================================== */

router.post(

    "/create/:orderId",

    authMiddleware,

    createShipment

);

/* ==========================================================
   TRACK SHIPMENT
========================================================== */

router.get(

    "/track/:awb",

    authMiddleware,

    getShipmentTracking

);

/* ==========================================================
   CANCEL SHIPMENT
========================================================== */

router.put(

    "/cancel/:shipmentId",

    authMiddleware,

    cancelShipmentController

);

/* ==========================================================
   SHIPPING LABEL
========================================================== */

router.get(

    "/label/:shipmentId",

    authMiddleware,

    downloadLabel

);

/* ==========================================================
   MANIFEST
========================================================== */

router.get(

    "/manifest/:shipmentId",

    authMiddleware,

    downloadManifestController

);

export default router;