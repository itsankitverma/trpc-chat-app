import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
// import serviceAccount from "../../../db.json";

const serviceAccount = JSON.parse(
  process.env.ADMIN as string
) as ServiceAccount;
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

export default admin;
