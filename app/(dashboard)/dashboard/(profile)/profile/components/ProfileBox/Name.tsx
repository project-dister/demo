import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import styles from "./ProfileBox.module.scss";

export default function Name({
  name,
  setName,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const onNameClick = () => {
    setIsNameEditable(true);
  };

  const handleNameBlur = () => {
    setIsNameEditable(false);
  };
  return (
    <>
      <h3 className="text-md font-light text-gray-400 mb-1 flex items-center">
        Name{" "}
        <BiPencil
          className="ml-2 text-md cursor-pointer"
          onClick={onNameClick}
        />
      </h3>
      {isNameEditable ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.replace(/[^\w\s]/gi, ""))}
          onBlur={handleNameBlur}
          className={`${styles.name} ${styles.inputField} mb-4`}
          maxLength={25}
        />
      ) : (
        <p className="mb-4" onClick={onNameClick}>
          {name}
        </p>
      )}
    </>
  );
}
