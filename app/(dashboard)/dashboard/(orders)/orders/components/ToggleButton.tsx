import styles from "./ToggleButton.module.scss";

export default function ToggleButton({
  isChecked,
  handleToggle,
}: {
  isChecked: boolean;
  handleToggle: () => void;
}) {
  return (
    <div className={`${styles.switchesContainer} cardBg mb-3`}>
       <input
        className="absolute top-0"
        type="radio"
        id="switchBuy"
        name="switchPlan"
        value="Buy"
        checked={!isChecked}
        onClick={handleToggle} // Keep onClick for the handleToggle function
        onChange={() => {}} // Dummy onChange to silence warning
      />
      <input
        className="absolute top-0"
        type="radio"
        id="switchSell"
        name="switchPlan"
        value="Sell"
        checked={isChecked}
        onClick={handleToggle} // Keep onClick for the handleToggle function
        onChange={() => {}} // Dummy onChange to silence warning
      />
      <label
        className="w-1/2 m-0 text-center cursor-pointer "
        htmlFor="switchBuy"
      >
        Buy
      </label>
      <label
        className="w-1/2 m-0 text-center cursor-pointer "
        htmlFor="switchSell"
      >
        Sell
      </label>
      <div
        className={`${
          styles.switchWrapper
        } absolute top-0 bottom-0 w-1/2 p-1 z-10 transform ${
          isChecked ? "translate-x-full" : ""
        }`}
      >
        <div className={`${styles.switch}  h-full`}>
          <div
            style={{
              color: !isChecked ? "#161616" : "#FAFAFA",
              opacity: !isChecked ? 1 : 0,
            }}
            className={`w-full text-center block absolute top-0 left-0`}
          >
            Buy
          </div>
          <div
            style={{
              color: isChecked ? "#161616" : "#FAFAFA",
              opacity: isChecked ? 1 : 0,
            }}
            className={`w-full text-center block absolute top-0 left-0`}
          >
            Sell
          </div>
        </div>
      </div>
    </div>
  );
}
