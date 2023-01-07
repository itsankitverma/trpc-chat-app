import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../../db.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

export default admin;
