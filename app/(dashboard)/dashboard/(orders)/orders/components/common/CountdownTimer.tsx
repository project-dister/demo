import styles from "./CountdownTimer.module.scss";

interface CountdownTimerProps {
  minutes: number;
  hours: number;
  days: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  minutes,
  hours,
  days,
}) => {
  return (
    <div className={`${styles.timerContainer} flex text-center space-x-4`}>
      <div className="flex flex-col">
        <span className={`${styles.timeValue} text-2xl font-bold`}>
          {minutes.toString().padStart(2, "0")}
        </span>
        <span className={`${styles.timeLabel} text-sm uppercase`}>minutes</span>
      </div>
      <div className="flex flex-col">
        <span className={`${styles.timeValue} text-2xl font-bold`}>
          {hours.toString().padStart(2, "0")}
        </span>
        <span className={`${styles.timeLabel} text-sm uppercase`}>Hours</span>
      </div>
      <div className="flex flex-col">
        <span className={`${styles.timeValue} text-2xl font-bold`}>
          {minutes.toString().padStart(2, "0")}
        </span>
        <span className={`${styles.timeLabel} text-sm uppercase`}>Minutes</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
