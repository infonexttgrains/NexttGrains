import nimbusAPI, {

    NIMBUS_API_KEY,
    NIMBUS_API_SECRET,
    NIMBUS_EMAIL

} from "../config/nimbus.js";

/* ==========================================================
   GET ACCESS TOKEN
========================================================== */

export const getNimbusAccessToken = async () => {

    try {

        const { data } = await nimbusAPI.post(

            "/v1/auth/login",

            {

                email: NIMBUS_EMAIL,

                api_key: NIMBUS_API_KEY,

                api_secret: NIMBUS_API_SECRET

            }

        );

        if (!data?.data?.token) {

            throw new Error(
                "Nimbus access token not received."
            );

        }

        return data.data.token;

    }

    catch (error) {

        console.log("========== NIMBUS LOGIN ==========");

        console.log(

            error.response?.data ||

            error.message

        );

        console.log("==================================");

        throw error;

    }

};

/* ==========================================================
   CREATE SHIPMENT
========================================================== */

export const createNimbusShipment = async (

    shipmentData

) => {

    try {

        const token =

            await getNimbusAccessToken();

        const { data } = await nimbusAPI.post(

            "/v1/shipments",

            shipmentData,

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        return data;

    }

    catch (error) {

        console.log("========== CREATE SHIPMENT ==========");

        console.log(

            error.response?.data ||

            error.message

        );

        console.log("=====================================");

        throw error;

    }

};

/* ==========================================================
   TRACK SHIPMENT
========================================================== */

export const trackShipment = async (

    awbNumber

) => {

    try {

        const token =

            await getNimbusAccessToken();

        const { data } = await nimbusAPI.get(

            `/v1/shipments/track/${awbNumber}`,

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        return data;

    }

    catch (error) {

        console.log("========== TRACK SHIPMENT ==========");

        console.log(

            error.response?.data ||

            error.message

        );

        console.log("====================================");

        throw error;

    }

};

/* ==========================================================
   CANCEL SHIPMENT
========================================================== */

export const cancelShipment = async (

    shipmentId

) => {

    try {

        const token =

            await getNimbusAccessToken();

        const { data } = await nimbusAPI.post(

            `/v1/shipments/${shipmentId}/cancel`,

            {},

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        return data;

    }

    catch (error) {

        console.log("========== CANCEL SHIPMENT ==========");

        console.log(

            error.response?.data ||

            error.message

        );

        console.log("=====================================");

        throw error;

    }

};

/* ==========================================================
   DOWNLOAD LABEL
========================================================== */

export const generateShippingLabel = async (

    shipmentId

) => {

    try {

        const token =

            await getNimbusAccessToken();

        const { data } = await nimbusAPI.get(

            `/v1/shipments/${shipmentId}/label`,

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        return data;

    }

    catch (error) {

        console.log("========== SHIPPING LABEL ==========");

        console.log(

            error.response?.data ||

            error.message

        );

        console.log("====================================");

        throw error;

    }

};

/* ==========================================================
   MANIFEST
========================================================== */

export const generateManifest = async (

    shipmentId

) => {

    try {

        const token =

            await getNimbusAccessToken();

        const { data } = await nimbusAPI.get(

            `/v1/shipments/${shipmentId}/manifest`,

            {

                headers: {

                    Authorization:

                        `Bearer ${token}`

                }

            }

        );

        return data;

    }

    catch (error) {

        console.log("========== MANIFEST ==========");

        console.log(

            error.response?.data ||

            error.message

        );

        console.log("==============================");

        throw error;

    }

};