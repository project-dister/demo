"use client";
import React, { useState, KeyboardEvent, useCallback, useEffect } from "react";
import styles from "./EditOffer.module.scss";
import ImageUpload from "./ImageUpload";
import { BiSave, BiTrash } from "react-icons/bi";
import Title from "./Title";
import Description from "./Description";
import Price from "./Price";
import Delivery from "./Delivery";
import Category from "./Category";
import SearchTags from "./SearchTags";

import { db } from "@/lib/initFirebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import useFirebaseUser from "@/lib/useFirebaseUser";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

import { AiOutlinePlus } from "react-icons/ai";

const initialOfferState: Offer = {
  title: "",
  description: "",
  images: [],
  price: 0,
  deliveryDate: 1,
  category: "",
  tags: [],
  offerId: "",
  userId: "",
  createdAt: "",
};

type Props = {
  onNewOfferCreated: () => void;
  selectedOffer: Offer | null;
  setSelectedOffer: (offer: Offer | null) => void;
};

export default function EditOffer({
  onNewOfferCreated,
  selectedOffer,
  setSelectedOffer,
}: Props) {
  const storage = getStorage();
  const { user } = useFirebaseUser();
  const [offerData, setOfferData] = useState<Offer>(initialOfferState);

  const [images, setImages] = useState<File[]>([]);

  const handleOfferInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.currentTarget;
    setOfferData({
      ...offerData,
      [id]: value,
    });
  };

  const handleOfferImagesChange = useCallback((newImages: File[]) => {
    setOfferData((prevOfferData) => ({
      ...prevOfferData,
      images: newImages,
    }));
  }, []);

  const toastOptions = {
    icon: "❌",
    style: {
      padding: "10px",
      color: "white",
      background: "#282727",
    },
  };

  const toastOptionsLoading = {
    style: {
      padding: "10px",
      color: "white",
      background: "#282727",
    },
  };

  const validateFields = (): boolean => {
    let isValid = true;

    if (offerData.title.length < 15 || offerData.title.length > 50) {
      toast("Title should be between 15 and 50 characters.", toastOptions);
      isValid = false;
    }

    if (
      offerData.description.length < 50 ||
      offerData.description.length > 300
    ) {
      toast(
        "Description should be between 50 and 300 characters.",
        toastOptions
      );
      isValid = false;
    }

    if (offerData.price < 5 || offerData.price > 5000) {
      toast("Price should be between $5 and $5000.", toastOptions);
      isValid = false;
    }

    if (offerData.deliveryDate < 1 || offerData.deliveryDate > 30) {
      toast("Delivery date should be between 1 and 30 minutes.", toastOptions);
      isValid = false;
    }

    if (offerData.category === "") {
      toast("Please select a category.", toastOptions);
      isValid = false;
    }

    if (offerData.tags.length < 1 || offerData.tags.length > 5) {
      toast("Please select between 1 and 5 tags.", toastOptions);
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    if (selectedOffer) {
      setOfferData({
        ...selectedOffer,
        deliveryDate: selectedOffer.deliveryDate || 1,
      });
      setImages([]);
    } else {
      setOfferData(initialOfferState);
    }
  }, [selectedOffer]);

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const offerSubmitPromise = new Promise(async (resolve, reject) => {
      try {
        if (user) {
          const userId = user.uid;
          const userRef = doc(db, "users", userId); // Get the user doc
          const offersRef = collection(db, "offers");
          const q = query(offersRef, where("userId", "==", userId));

          const querySnapshot = await getDocs(q);
          const offersCount = querySnapshot.size;

          if (selectedOffer || offersCount < 4) {
            const imagesDownloadURLs: string[] = [];

            const sanitizedCategory = offerData.category
              .toLowerCase()
              .replace(/\s/g, "-");
            const categoryOffersRef = collection(
              db,
              "offers",
              sanitizedCategory,
              "offers"
            );

            const offerRef = selectedOffer
              ? doc(categoryOffersRef, selectedOffer.offerId)
              : doc(categoryOffersRef);

            const offerUid = offerRef.id;

            // Update user's offers array
            const userDoc = await getDoc(userRef);
            let userOffers = userDoc.data()?.offers || [];
            userOffers.push({ category: sanitizedCategory, offerId: offerUid });
            await updateDoc(userRef, { offers: arrayUnion(...userOffers) });
            // ---

            if (!selectedOffer) {
              for (let index = 0; index < offerData.images.length; index++) {
                const image = offerData.images[index];
                const storageRef = ref(
                  storage,
                  `offers/${user.uid}/${offerUid}/${index}`
                );
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on(
                  "state_changed",
                  () => {},
                  (error) => {
                    console.error("Upload error:", error);
                  }
                );
                await uploadTask;
                const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
                imagesDownloadURLs.push(imageURL);
              }
            }

            const updatedOffer = {
              ...offerData,
              images: selectedOffer ? selectedOffer.images : imagesDownloadURLs,
              userId: user.uid,
              createdAt: selectedOffer
                ? selectedOffer.createdAt
                : serverTimestamp(),
            };

            await setDoc(offerRef, updatedOffer);
            setOfferData(initialOfferState);
            setImages([]);

            onNewOfferCreated();
          } else {
            console.error(
              "You have reached the maximum limit of 4 offers per user."
            );
            throw new Error(
              "You have reached the maximum limit of 4 offers per user."
            );
          }
        }
        resolve("Offer created successfully!");
      } catch (error) {
        console.error("Error in handleOfferSubmit:", error);
        reject("Could not create offer.");
      }
    });

    toast.promise(
      offerSubmitPromise,
      {
        loading: "Creating offer...",
        success: " Offer created successfully!",
        error: " Could not create offer.",
      },
      toastOptionsLoading
    );
  };

  const handleOfferDelete = (e: React.MouseEvent) => {
    e.preventDefault();

    const offerDeletePromise = new Promise(async (resolve, reject) => {
      try {
        if (user) {
          if (selectedOffer) {
            const offerRef = doc(db, "offers", selectedOffer.offerId);
            await deleteDoc(offerRef);

            // Update the user's offers
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            const userData = userDoc.data() as User;

            // Remove the category and offerId from the user's offers array
            if (userData.offer) {
              const sanitizedCategory = offerData.category
                .toLowerCase()
                .replace(/\s/g, "-");
              await setDoc(userRef, {
                ...userData,
                offer: arrayRemove(
                  `${sanitizedCategory}/${selectedOffer.offerId}`
                ),
              });
            }

            const offerImagesRef = ref(
              storage,
              `offers/${user.uid}/${selectedOffer.offerId}`
            );
            const images = await listAll(offerImagesRef);
            images.items.forEach((imageRef) => {
              deleteObject(imageRef);
            });

            setSelectedOffer(null);
            onNewOfferCreated();
          }
        }
        resolve("Offer deleted successfully!");
      } catch (error) {
        console.error("Error in handleOfferDelete:", error);
        reject("Could not delete offer.");
      }
    });

    toast.promise(
      offerDeletePromise,
      {
        loading: "Deleting offer...",
        success: " Offer deleted successfully!",
        error: " Could not delete offer.",
      },
      toastOptionsLoading
    );
  };

  const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.value.length > 0 && offerData.tags.length < 5) {
        setOfferData({
          ...offerData,
          tags: [...offerData.tags, e.currentTarget.value],
        });
        e.currentTarget.value = "";
      }
    }
  };

  const removeTag = (index: number) => {
    setOfferData({
      ...offerData,
      tags: offerData.tags.filter((_, i) => i !== index),
    });
  };

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoOpen = () => {
    setIsVideoOpen(true);
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleOfferSubmit}
        className={`${styles.editOffer} cardBg relative`}
      >
        {selectedOffer ? (
          <div className="flex items-center  mb-8">
            <h2 className="text-2xl">Edit Offer</h2>
            <button
              className={`${styles.newOfferBtn} flex items-center`}
              onClick={() => {
                setSelectedOffer(null);
              }}
            >
              New Offer <AiOutlinePlus />
            </button>
          </div>
        ) : (
          <h2 className="text-2xl mb-8">Create Offer</h2>
        )}

        <Title
          title={offerData.title}
          handleOfferInputChange={handleOfferInputChange}
        />

        <div className="flex flex-wrap mt-8">
          <Description
            description={offerData.description}
            handleOfferInputChange={handleOfferInputChange}
          />

          {selectedOffer ? (
            <div className="w-full sm:w-1/2 p-2 flex justify-center items-center">
              <p className="font-light text-gray-300">
                Image editing is not available yet.
              </p>
            </div>
          ) : (
            <ImageUpload
              onImagesChange={handleOfferImagesChange}
              images={images}
              setImages={setImages}
            />
          )}
        </div>

        <div className="flex flex-wrap mt-8">
          <Price
            price={offerData.price}
            handleOfferInputChange={handleOfferInputChange}
          />

          <Delivery
            deliveryDate={offerData.deliveryDate}
            handleOfferInputChange={handleOfferInputChange}
          />

          <Category
            category={offerData.category}
            handleOfferInputChange={handleOfferInputChange}
          />
        </div>

        <SearchTags
          tags={offerData.tags}
          removeTag={removeTag}
          handleTagKeyPress={handleTagKeyPress}
        />

        <div className={styles.buttonContainer}>
          <button className={styles.saveButton}>
            <BiSave className={styles.icon} /> Save
          </button>
          {selectedOffer && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleOfferDelete}
            >
              <BiTrash className={styles.icon} /> Delete
            </button>
          )}
        </div>
      </form>
    </>
  );
}
