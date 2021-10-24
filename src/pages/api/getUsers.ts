import { collection, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "services/firebaseAdmin";
import { db } from "services/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionCookie: string = req.cookies.session ?? "";
  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie);
    if (decodedToken) {
      const usersRef = collection(db, "users");
      const usersQuery = await getDocs(usersRef);
      const data = [];
      usersQuery.forEach((doc) => {
        data.push(doc.data());
      });
      res.status(200).json({ data });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid Session to Send Request" });
  }
}
