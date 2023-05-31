"use client";

import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { useEffect } from "react";

import styles from "./ProfileBox.module.scss";
import ProfilePicture from "./ProfilePicture";
import Socials from "./Socials";
import Name from "./Name";
import Occupation from "./Occupation";
import Description from "./Description";
import Timezone from "./Timezone";
import { useState } from "react";
import { db } from "@/lib/initFirebase";
import useFirebaseUser from "@/lib/useFirebaseUser";
import { toast } from "react-hot-toast";

export default function ProfileBox() {
  const [profilePictureURL, setProfilePictureURL] = useState(
    "/images/profile-pic.png"
  );
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const [imageUpdated, setImageUpdated] = useState(false);
  const [name, setName] = useState("Your Name");
  const [occupation, setOccupation] = useState("Your Occupation");
  const [description, setDescription] = useState("Write something about you");
  const [timezone, setTimezone] = useState("UTC+5:30");

  const storage = getStorage();
  const { user } = useFirebaseUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setProfilePictureURL(userData?.profilePicture || profilePictureURL);
            setName(userData?.name || name);
            setOccupation(userData?.occupation || occupation);
            setDescription(userData?.description || description);
            setTimezone(userData?.timezone || timezone);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    if (user && imageUpdated) {
      let uploadedProfilePicture = profilePictureURL;

      if (profilePictureFile) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, profilePictureFile);
        uploadedProfilePicture = await getDownloadURL(storageRef);
      }

      const usersRef = doc(db, "users", user.uid);
      await setDoc(
        usersRef,
        {
          profilePicture: uploadedProfilePicture,
          name,
          occupation,
          description,
          timezone,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      toast.success("saved");
    }
  };

  return (
    <div className={`${styles.profileBox} p-4 cardBg lightWhiteText`}>
      <ProfilePicture
        profilePicture={profilePictureURL}
        setProfilePictureURL={setProfilePictureURL}
        setProfilePictureFile={setProfilePictureFile}
        setImageUpdated={setImageUpdated}
      />
      <Name name={name} setName={setName} />

      <Occupation occupation={occupation} setOccupation={setOccupation} />

      <Socials user={user ? user.uid : "sdf"} />

      <Description description={description} setDescription={setDescription} />

      <Timezone timezone={timezone} setTimezone={setTimezone} />

      <button className={styles.save} onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}
