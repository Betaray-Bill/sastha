// import admin from "firebase-admin"
// import serviceAccount from "./SashthaPowerServices.json"

import admin from "firebase-admin";


function formatPrivateKey(key) {
    return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp() {
    const params = {
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
    };
    const privateKey = formatPrivateKey(params.privateKey);

    if (admin.apps.length > 0) {
        return admin.app();
    }

    const cert = admin.credential.cert({
        projectId: params.projectId,
        clientEmail: params.clientEmail,
        privateKey,
    });

    return admin.initializeApp({
        credential: cert,
        projectId: params.projectId,
        storageBucket: params.storageBucket,
    });
}

export async function initAdmin() {
    const params = {
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
    };
    // console.log("hey", params)

    return createFirebaseAdminApp(params);
}

// Initialize Firebase Admin SDK
export const firebaseAdmin = createFirebaseAdminApp();
export const db = admin.firestore();
export const auth = admin.auth();