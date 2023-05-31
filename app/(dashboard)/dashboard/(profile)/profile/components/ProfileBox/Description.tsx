import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import styles from "./ProfileBox.module.scss";

export default function Description({
  description,
  setDescription,
}: {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);

  const onDescriptionClick = () => {
    setIsDescriptionEditable(true);
  };

  const handleDescriptionBlur = () => {
    setIsDescriptionEditable(false);
  };

  return (
    <>
      <h3 className="text-md font-light text-gray-400 mb-1 flex items-center">
        Description{" "}
        <BiPencil
          className="ml-2 text-md cursor-pointer"
          onClick={onDescriptionClick}
        />
      </h3>
      {isDescriptionEditable ? (
        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value.replace(/[^a-zA-Z0-9\s-.'!?:,]/g, ""))
          }
          onBlur={handleDescriptionBlur}
          className={`${styles.description} ${styles.inputField} mb-4 h-40`}
          maxLength={300}
        />
      ) : (
        <p className="mb-4" onClick={onDescriptionClick}>
          {description}
        </p>
      )}
    </>
  );
}
