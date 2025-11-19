"use client";
import { Trash2 } from "lucide-react";
import UserCard from "./UserCard";

export default function DeletedUsersList({ dusers }) {
  return (
    <section className="relative z-10 mt-10">
      
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <Trash2 size={18} className="text-gray-700 dark:text-gray-300" />
        Deleted Users ({dusers.length})
      </h2>

      {/* Empty Message */}
      {dusers.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No deleted users found.
        </p>
      ) : (
        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 
          gap-6
        ">
          {dusers.map((u) => (
            <UserCard key={u._id} user={u} type="deleted" />
          ))}
        </div>
      )}
    </section>
  );
}
