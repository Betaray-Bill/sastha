// import admin from "firebase-admin"
// import serviceAccount from "./SashthaPowerServices.json"

import admin from "firebase-admin";


function formatPrivateKey(key) {
    return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp() {
    const params = {
        projectId: "silver-white",
        clientEmail: "firebase-adminsdk-fs9kj@silver-white.iam.gserviceaccount.com",
        // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC73lQ2hnbIJ/fE\n19yOCY0AdQBBTT1UZgmqQuGrGx1bSCuPsjE9+73EucU3MQC9o5BiD769NFp7gmD0\n2v3v9UASIrBAkMBlX2a2LFUD1YjwbH/stlF4Ynawaco6hNGrvErgfZC9IU7dHF1H\naNmFwLvd63rdwW3CLQtpVxY3H/CnXaoiweWLXZLuT4KkgylO6+ctQriff2bVmoVg\nEAvHQQHBrLO1DUsvxjsc1oWcx5/+necoQPqJMT0Y0nifs5A7T/MESKeyZ5XFLS8X\nOOgeQFEKI4/QLzUxI+096CSKxluC4qLLIXM+8n6qYK0slTw4c9q3SFdD6LnQj2L8\nFgu5jCVrAgMBAAECggEAC8h9kq/rWlF7blq1qCj8MYelHPNpwdXmjEnGmrNIK5YC\nuXANO5yDAgg+0N/fcoWEREpFhdt3Q2DhkOn9XGQPATQwxtPtZU5PBGUSbfuiK6Y6\nfc/Pm1PdquHvv6zd874LGjp17g7dQewKA7UVU5jLj7c5zRfZOQEXQqOmLo3vy6du\nKbmZmAVep9P4m2ijPPEPFgzQZaoefqHTwg/A9hBcJ4o7TYgQou1GadVac/sgpP/5\ncVokC8ZAgLemaLMvRr0u2ERFs9ESPxphwRpkCMEg+Mz/3eVtXid1EM4r+/xExaBv\nPWPOGiif6I23cNMPilCedbkX0OdGGu3gqGvHRRz+KQKBgQDv+Fna6kv8XFD0WyDS\n+cblV+vhthsUdbIqvuuCJPQRmQCxwBKKvnIU+3cn9oXPPcBJ9aEjWlYATdaN8Z9O\n6AZKn3jWAeOWCECz2JwyvDJi50XPu+OZ5W7v63EmokbqoXLd3C3eYvoFbCI3wkGh\nfNI+jCN/auC1zw92zx6sqWjvCQKBgQDIawFKpR6ACz6lPoBI2BmTv1xawj+JKjvY\nuKcK//rnApBdhcmiRM3qVdOPw34ILJoTUlnAVOv5ML1BcdlXGMdVKQwbjCiRlfW9\nIyNJOb/ZRuWOUw4G4OiTDpC585FchY+6G5JtCKRcZYjaFm+bhOinY4Drxwbk4nRV\nSO8LjY1Z0wKBgGWITfR7J7VaFgKdwBCkEEyfW7V/iIuqlLzTVPAW1JHRi+KpYu8D\nT1+jWjI1cz5RYVeprwk3QqYUSRB7yCzprSfLu6PI3tNvIHk30DcDO8pvEjGnzNAj\nrEGk+5YeGSVTNDe83kd211SOARhYf85k8sv2HVrfDL7AIknhrpfdggGJAoGAVtvh\nRGuJa270KIOM74UQmLLfoMn85UJzi3qDksXcBJBc5ttbxsLRB1VJCk5sabiC0grn\nsO5dErNn4lwoGJI5mZPflnTJBEecp+r5mPu5RL5wMJ2YP6zrvwgZ+y0ve4y6/KqE\nbFLJgO3UQMhmeF1Cw4DhV837E+l9B5VDXJttflcCgYA+Liw2bsU2M/U2UK/9pcCl\nwBT+l3NILeTfRdhbDMvL2OqWSRNjujU8HwoKju6IWx+efgkY3Z6K9hMhT/tXIaYq\nXr303NLrM3Vokic9c9sDAwYFN4YxFeHCepoG3+zeRU9ItK5KOOoOd+PehHK1t9zA\nne2axGlryxU72xeKMojS1Q==\n-----END PRIVATE KEY-----\n",
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
        projectId: "silver-white",
        clientEmail: "firebase-adminsdk-fs9kj@silver-white.iam.gserviceaccount.com",
        // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC73lQ2hnbIJ/fE\n19yOCY0AdQBBTT1UZgmqQuGrGx1bSCuPsjE9+73EucU3MQC9o5BiD769NFp7gmD0\n2v3v9UASIrBAkMBlX2a2LFUD1YjwbH/stlF4Ynawaco6hNGrvErgfZC9IU7dHF1H\naNmFwLvd63rdwW3CLQtpVxY3H/CnXaoiweWLXZLuT4KkgylO6+ctQriff2bVmoVg\nEAvHQQHBrLO1DUsvxjsc1oWcx5/+necoQPqJMT0Y0nifs5A7T/MESKeyZ5XFLS8X\nOOgeQFEKI4/QLzUxI+096CSKxluC4qLLIXM+8n6qYK0slTw4c9q3SFdD6LnQj2L8\nFgu5jCVrAgMBAAECggEAC8h9kq/rWlF7blq1qCj8MYelHPNpwdXmjEnGmrNIK5YC\nuXANO5yDAgg+0N/fcoWEREpFhdt3Q2DhkOn9XGQPATQwxtPtZU5PBGUSbfuiK6Y6\nfc/Pm1PdquHvv6zd874LGjp17g7dQewKA7UVU5jLj7c5zRfZOQEXQqOmLo3vy6du\nKbmZmAVep9P4m2ijPPEPFgzQZaoefqHTwg/A9hBcJ4o7TYgQou1GadVac/sgpP/5\ncVokC8ZAgLemaLMvRr0u2ERFs9ESPxphwRpkCMEg+Mz/3eVtXid1EM4r+/xExaBv\nPWPOGiif6I23cNMPilCedbkX0OdGGu3gqGvHRRz+KQKBgQDv+Fna6kv8XFD0WyDS\n+cblV+vhthsUdbIqvuuCJPQRmQCxwBKKvnIU+3cn9oXPPcBJ9aEjWlYATdaN8Z9O\n6AZKn3jWAeOWCECz2JwyvDJi50XPu+OZ5W7v63EmokbqoXLd3C3eYvoFbCI3wkGh\nfNI+jCN/auC1zw92zx6sqWjvCQKBgQDIawFKpR6ACz6lPoBI2BmTv1xawj+JKjvY\nuKcK//rnApBdhcmiRM3qVdOPw34ILJoTUlnAVOv5ML1BcdlXGMdVKQwbjCiRlfW9\nIyNJOb/ZRuWOUw4G4OiTDpC585FchY+6G5JtCKRcZYjaFm+bhOinY4Drxwbk4nRV\nSO8LjY1Z0wKBgGWITfR7J7VaFgKdwBCkEEyfW7V/iIuqlLzTVPAW1JHRi+KpYu8D\nT1+jWjI1cz5RYVeprwk3QqYUSRB7yCzprSfLu6PI3tNvIHk30DcDO8pvEjGnzNAj\nrEGk+5YeGSVTNDe83kd211SOARhYf85k8sv2HVrfDL7AIknhrpfdggGJAoGAVtvh\nRGuJa270KIOM74UQmLLfoMn85UJzi3qDksXcBJBc5ttbxsLRB1VJCk5sabiC0grn\nsO5dErNn4lwoGJI5mZPflnTJBEecp+r5mPu5RL5wMJ2YP6zrvwgZ+y0ve4y6/KqE\nbFLJgO3UQMhmeF1Cw4DhV837E+l9B5VDXJttflcCgYA+Liw2bsU2M/U2UK/9pcCl\nwBT+l3NILeTfRdhbDMvL2OqWSRNjujU8HwoKju6IWx+efgkY3Z6K9hMhT/tXIaYq\nXr303NLrM3Vokic9c9sDAwYFN4YxFeHCepoG3+zeRU9ItK5KOOoOd+PehHK1t9zA\nne2axGlryxU72xeKMojS1Q==\n-----END PRIVATE KEY-----\n",
    };
    // console.log("hey", params)

    return createFirebaseAdminApp(params);
}

// Initialize Firebase Admin SDK
export const firebaseAdmin = createFirebaseAdminApp();
export const db = admin.firestore();
export const auth = admin.auth();