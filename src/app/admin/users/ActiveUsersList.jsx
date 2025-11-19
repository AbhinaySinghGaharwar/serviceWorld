"use client";
import { Users } from "lucide-react";
import UserCard from "./UserCard";

export default function ActiveUsersList({ users }) {
  return (
    <section className="mb-12 relative z-10">
      
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <Users size={18} className="text-gray-700 dark:text-gray-300" /> 
        Active Users ({users.length})
      </h2>

      {/* Empty State */}
      {users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No active users found.</p>
      ) : (
        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 
          gap-6
        ">
          {users.map((u) => (
            <UserCard key={u._id} user={u} type="active" />
          ))}
        </div>
      )}
    </section>
  );
}
