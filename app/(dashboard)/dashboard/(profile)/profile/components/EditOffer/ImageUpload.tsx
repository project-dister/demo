"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import styles from "./ImageUpload.module.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  onImagesChange: (images: File[]) => void;
  images: File[];
  setImages: (images: File[]) => void;
}

// export default function ImageUpload({ onImagesChange }: Props) {
export default function ImageUpload({
  onImagesChange,
  images,
  setImages,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(
        (file) =>
          file.size <= 1048576 &&
          [
            "image/gif",
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/jpg",
          ].includes(file.type)
      );
      setImages([...images, ...newFiles].slice(0, 3));
    }
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    setImages(reorderedImages);
  };

  return (
    <>
      <div className="w-full md:w-1/2 md:pl-2">
        <label>
          <p className="mb-2 font-light text-gray-100">
            Image upload (3 images required)
          </p>
          <div
            className={styles.imageUpload}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onDragLeave={(e) => e.preventDefault()}
          >
            <p className="text-center">
              Drag and drop or{" "}
              <label htmlFor="fileInput" className={styles.selectFiles}>
                select files from computer
              </label>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              id="fileInput"
              className={styles.fileInput}
              multiple
              accept="image/gif, image/png, image/jpeg, image/webp, image/jpg"
              onChange={onFileInputChange}
            />
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.imagesContainer}
                >
                  {images.map((image, index) => (
                    <Draggable
                      key={index}
                      draggableId={`draggable-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles.imageWrapper}
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded preview"
                          />
                          <span
                            className={styles.removeImage}
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </span>
                          <span className={styles.imageIndex}>
                            #{index + 1}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </label>
      </div>
    </>
  );
}
