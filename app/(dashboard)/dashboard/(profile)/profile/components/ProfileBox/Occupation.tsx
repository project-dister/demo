import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import styles from "./ProfileBox.module.scss";

export default function Occupation({
  occupation,
  setOccupation,
}: {
  occupation: string;
  setOccupation: Function;
}) {
  const [isOccupationEditable, setIsOccupationEditable] = useState(false);
  const onOccupationClick = () => {
    setIsOccupationEditable(true);
  };

  const handleOccupationBlur = () => {
    setIsOccupationEditable(false);
  };
  return (
    <>
      <h3 className="text-md font-light text-gray-400 mb-1 flex items-center">
        Occupation{" "}
        <BiPencil
          className="ml-2 text-md cursor-pointer"
          onClick={onOccupationClick}
        />
      </h3>
      {isOccupationEditable ? (
        <input
          type="text"
          value={occupation}
          onChange={(e) =>
            setOccupation(e.target.value.replace(/[^\w\s]/gi, ""))
          }
          onBlur={handleOccupationBlur}
          className={`${styles.occupation} ${styles.inputField} mb-4`}
          maxLength={25}
        />
      ) : (
        <p className="mb-4" onClick={onOccupationClick}>
          {occupation}
        </p>
      )}
    </>
  );
}
