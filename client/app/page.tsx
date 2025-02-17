"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthDialog from "../components/AuthDialog/AuthDialog";
import Notification from "../components/Notification/Notification";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"login" | "register">("login");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationColor, setNotificationColor] = useState("bg-green-600");
  const router = useRouter();

  const openDialog = (mode: "login" | "register") => {
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (success: boolean, isCancel?: boolean) => {
    if (isCancel) {
      setIsDialogOpen(false);
      return;
    }

    if (success) {
      setIsDialogOpen(false);
      if (dialogMode === "register") {
        setNotificationMessage("User created successfully");
        setNotificationColor("bg-green-600");
      } else if (dialogMode === "login") {
        router.push("/todos");
      }
    } else {
      setNotificationMessage("Operation failed. Please try again.");
      setNotificationColor("bg-red-600");
    }
  };

  const closeNotification = () => {
    setNotificationMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl">To-do List App</h1>
        <div className="flex gap-4">
          <button
            className="bg-white text-black py-2 px-4 rounded h-12 w-32"
            onClick={() => openDialog("login")}
          >
            Login
          </button>
          <button
            className="bg-white text-black py-2 px-4 rounded h-12 w-32"
            onClick={() => openDialog("register")}
          >
            Register
          </button>
        </div>
        {notificationMessage && (
          <div className="z-50">
            <Notification
              message={notificationMessage}
              color={notificationColor}
              onClose={closeNotification}
            />
          </div>
        )}
      </div>

      {isDialogOpen && (
        <AuthDialog onClose={handleDialogClose} mode={dialogMode} />
      )}
    </div>
  );
}
