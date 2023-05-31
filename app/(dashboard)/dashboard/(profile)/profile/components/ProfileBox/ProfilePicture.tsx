import React from "react";
import Image from "next/image";
import styles from "./ProfileBox.module.scss";
import { SlCamera } from "react-icons/sl";
import { toast } from "react-hot-toast";

interface ProfilePictureProps {
  profilePicture: string;
  setProfilePictureURL: React.Dispatch<React.SetStateAction<string>>;
  setProfilePictureFile: React.Dispatch<React.SetStateAction<File | null>>;
  setImageUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

export default function ProfilePicture({
  profilePicture,
  setProfilePictureURL,
  setProfilePictureFile,
  setImageUpdated,
}: ProfilePictureProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error("File size must be less than 1 MB.", {
          style: {
            border: "1px solid black",
            padding: "16px",
            color: "white",
            background: "#000",
          },
        });
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        setProfilePictureURL(e.target?.result as string);
        setProfilePictureFile(selectedFile);
        setImageUpdated(true);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="flex ">
      <div className="relative mb-4">
        <Image
          src={profilePicture}
          alt="Profile Picture"
          width={200}
          height={200}
          className={`${styles.profilePic}  `}
        />
        <label
          className={`${styles.imageSelector} absolute bottom-0 left-0 w-full h-1/3 flex items-center justify-center cursor-pointer`}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <SlCamera className={styles.cameraIcon} />
        </label>
      </div>
    </div>
  );
}
