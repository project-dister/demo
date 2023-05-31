import { collection, getDocs } from "firebase/firestore";
import {db} from "./initFirebase";

export default async function getOfferIdsByCategory(category: string) {


  const sanitizedCategory = category.toLowerCase().replace(/\s/g, "-");

  const categoryOffersCol = collection(
    db,
    "offers",
    sanitizedCategory,
    "offers"
  );

  try {
    const offersSnapshot = await getDocs(categoryOffersCol);
    if (offersSnapshot.empty) {
      // The collection does not exist or it's empty.
      return;
    }
    return offersSnapshot.docs.map((doc) => ({
      id: doc.id,
      category: sanitizedCategory,
    }));
  } catch (error: any) {
    throw new Error(error.message);
  }
}
