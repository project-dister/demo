"use client";

import React, { useState, useRef } from "react";
import styles from "./FileUpload.module.scss";
import { IoClose } from "react-icons/io5";
import { FaParachuteBox } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import JSZip from "jszip";
import { db } from "@/lib/initFirebase";

import { useMarketplace } from "@/context/MarketplaceContext";
import { toast } from "react-hot-toast";

interface Props {
  order: Order;
  orderId: string;
}

const FileUpload = ({ order, orderId }: Props) => {
  const storage = getStorage();
  const [files, setFiles] = useState<File[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const marketplace = useMarketplace(); // Use Marketplace context

  const deliverOrder = async () => {
    const deliverOrderPromise = new Promise(async (resolve, reject) => {
      try {
        const tx = await (marketplace as any).deliverOrder(
          order.smartContractOrderId
        );
        await tx.wait();

        // Update the order in Firebase
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status: "delivered" });

        resolve("Order delivered successfully");
      } catch (err) {
        console.error(err);
        reject("Error delivering order");
      }
    });

    toast.promise(deliverOrderPromise, {
      loading: "Delivering order...",
      success: "Success",
      error: "Failed to deliver",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  };

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  const handleDeleteFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const setOrderFilesUrl = async (downloadUrl: string) => {
    if (!order || !order.sellerAddress || !order.buyerAddress) {
      console.error("Order or necessary order data is not provided");
      return;
    }

    // Directly accessing the order document using the orderId
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status: "delivered",
      offerDownloadUrl: downloadUrl,
    });
  };

  const uploadFiles = async () => {
    if (!order || !orderId) {
      console.error("Order or order ID is not provided");
      return;
    }

    if (files.length > 0) {
      const uploadFilesPromise = new Promise(async (resolve, reject) => {
        try {
          const zip = new JSZip();
          for (let i = 0; i < files.length; i++) {
            zip.file(files[i].name, files[i]);
          }

          const blob = await zip.generateAsync({ type: "blob" });
          const storageRef = ref(storage, `orders/${orderId}/${orderId}.zip`);
          const uploadTask = uploadBytesResumable(storageRef, blob);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              reject("Error during file upload");
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setOrderFilesUrl(downloadURL);
                deliverOrder();
                resolve("Files uploaded successfully");
              });
            }
          );
        } catch (err) {
          console.error(err);
          reject("Error during file upload");
        }
      });

      toast.promise(uploadFilesPromise, {
        loading: "Uploading files...",
        success: "Files Uploaded",
        error: "Failed to upload files",
      });
    } else {

    }
  };

  return (
    <div className={styles.fileUpload}>
      <div
        className={`${styles.dropZone}`}
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleClick}
      >
        Drag and drop files here or
        <p>
          <span className={styles.selectFromComputer}>
            select from computer
          </span>
        </p>
        <input
          ref={inputFileRef}
          type="file"
          className="hidden"
          multiple
          onChange={handleFileUpload}
        />
      </div>
      <div className={`${styles.fileList} mt-4 overflow-y-auto h-32`}>
        {files.map((file, index) => (
          <div key={index} className={`${styles.fileCard} `}>
            <span className={styles.fileName}>
              {file.name.length > 20
                ? file.name.substring(0, 20) + "..."
                : file.name}
            </span>
            <div className={styles.fileInfo}>
              <span className={styles.fileSize}>
                {formatFileSize(file.size)}
              </span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteFile(index)}
              >
                <IoClose />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`${styles.deliverUpload} flex justify-center mt-4`}
        onClick={uploadFiles}
      >
        Upload and Deliver
        <FaParachuteBox className={styles.deliverUploadIcon} />
      </div>
    </div>
  );
};

export default FileUpload;
