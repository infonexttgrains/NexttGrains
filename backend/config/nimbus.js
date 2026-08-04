import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/* ==========================================================
   NIMBUS CONFIG
========================================================== */

export const NIMBUS_BASE_URL =
    process.env.NIMBUS_BASE_URL ||
    "https://api.nimbuspost.com";

/* ==========================================================
   API CREDENTIALS
========================================================== */

export const NIMBUS_API_KEY =
    process.env.NIMBUS_API_KEY;

export const NIMBUS_API_SECRET =
    process.env.NIMBUS_API_SECRET;

export const NIMBUS_EMAIL =
    process.env.NIMBUS_EMAIL;

/* ==========================================================
   VALIDATION
========================================================== */

if (
    !NIMBUS_API_KEY ||
    !NIMBUS_API_SECRET ||
    !NIMBUS_EMAIL
) {

    console.warn(
        "⚠ Nimbus credentials are missing in .env"
    );

}

/* ==========================================================
   AXIOS INSTANCE
========================================================== */

const nimbusAPI = axios.create({

    baseURL: NIMBUS_BASE_URL,

    timeout: 30000,

    headers: {

        "Content-Type": "application/json",

        Accept: "application/json"

    }

});

/* ==========================================================
   REQUEST LOGGER
========================================================== */

nimbusAPI.interceptors.request.use(

    (config) => {

        console.log(
            `📦 Nimbus Request -> ${config.method?.toUpperCase()} ${config.url}`
        );

        return config;

    },

    (error) => Promise.reject(error)

);

/* ==========================================================
   RESPONSE LOGGER
========================================================== */

nimbusAPI.interceptors.response.use(

    (response) => {

        console.log(
            `✅ Nimbus Response -> ${response.status}`
        );

        return response;

    },

    (error) => {

        console.log("========== NIMBUS ERROR ==========");

        if (error.response) {

            console.log(error.response.status);

            console.log(error.response.data);

        }

        else {

            console.log(error.message);

        }

        console.log("=================================");

        return Promise.reject(error);

    }

);

/* ==========================================================
   EXPORT
========================================================== */

export default nimbusAPI;