import styles from "./YouTubePopup.module.scss";

interface YouTubePopupProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function YouTubePopup({
  videoId,
  isOpen,
  onClose,
}: YouTubePopupProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className={`${styles.videoWrapper} bg-white rounded-lg overflow-hidden relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          title="YouTube Video"
          className="w-full h-full"
          src={`https://www.youtube.com/embed/Q1RUUr05urk?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
