import { signOut, AuthError } from "firebase/auth";
import { firebaseAuth } from "services/firebase";

export async function signUserOut() {
  signOut(firebaseAuth).catch((error: AuthError) => {
    console.log("An error occured", error.code, error.message);
  });
}
