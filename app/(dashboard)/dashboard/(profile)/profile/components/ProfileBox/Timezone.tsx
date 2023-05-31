import { IoTimeOutline } from "react-icons/io5";
import styles from "./ProfileBox.module.scss";
import moment from "moment-timezone";

export default function Timezone({
  timezone,
  setTimezone,
}: {
  timezone: string;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
}) {
  const timezones = moment.tz.names();

  const handleTimezoneChange = (e: any) => {
    setTimezone(e.target.value);
  };

  return (
    <>
      {" "}
      <h3 className="text-md font-light text-gray-400 mb-1 flex items-center">
        Timezone <IoTimeOutline className="ml-2 text-md cursor-pointer" />
      </h3>
      <div className="flex items-center mb-4">
        <select
          className={styles.timezone}
          value={timezone}
          onChange={handleTimezoneChange}
        >
          <option value="" disabled>
            Select Timezone
          </option>
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
