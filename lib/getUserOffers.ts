import getOffer from "./getOffer";
import getUser from "./getUser";

export default async function getUserOffers(userId: string) {
  const user = await getUser(userId);

  try {
    // Get all offers sequentially
    const offers = [];
    for (let offer of user.offers) {
      const offerData = await getOffer(offer.category, offer.offerId);
      offers.push(offerData);
    }

    return offers;
  } catch (error: any) {
    return [];
  }
}
