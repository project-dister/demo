import Link from "next/link";
import styles from "./DownloadBtn.module.scss";
import { FiDownload } from "react-icons/fi";

export default function DownloadBtn({
  offerDownloadUrl,
}: {
  offerDownloadUrl: string;
}) {
  return (
    <Link
      href={offerDownloadUrl}
      target="_blank"
      className={`flex items-center justify-center py-2 px-4 my-4 w-full ${styles.downloadButton}`}
    >
      <FiDownload className="mr-2" /> Download (3 minutes left)
    </Link>
  );
}
