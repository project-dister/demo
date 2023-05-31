import { doc, getDoc } from "firebase/firestore";
import { db } from "./initFirebase";

export default async function getOffer(category: string, offerId: string) {
  // Sanitize the category before using it as a part of the path
  const sanitizedCategory = category.toLowerCase().replace(/\s/g, "-");

  const offerRef = doc(db, "offers", sanitizedCategory, "offers", offerId);

  try {
    const offerSnapshot = await getDoc(offerRef);

    if (!offerSnapshot.exists()) {
      throw new Error("Offer not found");
    }

    return {
      offerId: offerSnapshot.id,
      userId: offerSnapshot.data().userId,
      title: offerSnapshot.data().title,
      description: offerSnapshot.data().description,
      images: offerSnapshot.data().images || [],
      price: offerSnapshot.data().price,
      deliveryDate: offerSnapshot.data().deliveryDate,
      category: offerSnapshot.data().category,
      tags: offerSnapshot.data().tags || [],
      createdAt: offerSnapshot.data().createdAt,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
