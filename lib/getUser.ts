import { doc, getDoc } from "firebase/firestore";
import { db } from "./initFirebase";

export default async function getUser(address: string) {
  const userRef = doc(db, "users", address);

  try {
    const userSnapshot = await getDoc(userRef);
    return {
      address: userSnapshot.id,
      name: userSnapshot.data()?.name || undefined,
      description: userSnapshot.data()?.description || undefined,
      occupation: userSnapshot.data()?.occupation || undefined,
      profilePicture: userSnapshot.data()?.profilePicture || undefined,
      timeZone: userSnapshot.data()?.timezone || undefined,
      offers: userSnapshot.data()?.offers || undefined,
      createdAt: userSnapshot.data()?.createdAt.toDate(),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
