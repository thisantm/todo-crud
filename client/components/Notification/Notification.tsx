import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface NotificationProps {
  message: string;
  color: string;
  onClose: () => void;
}

export default function Notification({ message, color, onClose }: NotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 1000); // Allow time for fade-out transition
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 ${color} text-white py-2 px-4 rounded mt-4 flex items-center transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
      <button
        className="ml-4 bg-transparent text-white"
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 1000); // Allow time for fade-out transition
        }}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
