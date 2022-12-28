import admin from 'firebase-admin'

import serviceAccount from './../db/fir-backend-48ddf-firebase-adminsdk-rk3wp-be7aa373ee.json' assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://firebase-adminsdk-rk3wp@fir-backend-48ddf.iam.gserviceaccount.com'
    });

const connection = admin.firestore()

export const db = connection