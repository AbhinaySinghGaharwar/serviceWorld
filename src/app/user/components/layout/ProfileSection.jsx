"use client";

import { useRef, useState } from "react";
import { uploadProfilePicture, deleteProfilePicture } from "@/lib/userActions";
import { FaUserCircle } from "react-icons/fa";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import UserBalance from "./UserBalance";

export default function ProfileSection({ user }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Upload profile pic
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await uploadProfilePicture(formData);

    setUploading(false);
    if (res.success) {
      setOpen(false);
      router.refresh();
    } else {
      alert(res.error || "Upload failed");
    }
  };

  // Delete profile picture
  const handleDelete = async () => {
    setUploading(true);

    const res = await deleteProfilePicture();

    setUploading(false);
    if (res.success) {
      setOpen(false);
      router.refresh();
    } else {
      alert(res.error || "Delete failed");
    }
  };

  return (
    <>
      {/* Container */}
      <div className="flex flex-col items-center text-center px-4 py-6 border-b border-gray-300 dark:border-gray-800 w-full">

        {/* Avatar */}
        <div
          onClick={() => !uploading && setOpen(true)}
          className={clsx(
            "relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer group overflow-hidden mb-3",
            "bg-gray-200 text-gray-700",
            "dark:bg-white/10 dark:text-white",
            uploading && "cursor-not-allowed opacity-60"
          )}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle size={70} className="text-gray-500 dark:text-white" />
          )}

          {/* Hover Overlay */}
          {!uploading && (
            <div
              className="
                absolute inset-0 bg-black/40 text-xs text-white 
                flex items-center justify-center 
                opacity-0 group-hover:opacity-100 
                transition-opacity
              "
            >
              Change Photo
            </div>
          )}

          {/* Uploading Spinner */}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Username */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {user?.username || "Guest"}
        </h2>

        {/* Email */}
        {user?.email && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {user.email}
          </p>
        )}

        {/* Balance */}
        <div className="mt-4 w-full max-w-xs">
          <UserBalance user={user} />
        </div>
      </div>

      {/* Custom Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-xl p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {uploading ? "Processing..." : "Update Profile Photo"}
            </h2>

            <div className="flex flex-col gap-3">
              <button
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className={clsx(
                  "w-full py-2 rounded-lg text-white font-medium",
                  uploading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {uploading ? "Uploading..." : "Change Profile Picture"}
              </button>

              {user?.avatar && (
                <button
                  disabled={uploading}
                  onClick={handleDelete}
                  className={clsx(
                    "w-full py-2 rounded-lg text-white font-medium",
                    uploading
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  )}
                >
                  {uploading ? "Deleting..." : "Remove Profile Picture"}
                </button>
              )}
            </div>

            <button
              disabled={uploading}
              onClick={() => setOpen(false)}
              className={clsx(
                "mt-5 w-full py-2 rounded-lg font-medium",
                uploading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white"
              )}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </>
  );
}
