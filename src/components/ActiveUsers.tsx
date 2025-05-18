import { useOthers, useSelf } from "@liveblocks/react";
import React from "react";

/**
 * Displays the list of active users and the live user count.
 * Uses Liveblocks presence for real-time updates.
 */
export const ActiveUsers: React.FC = () => {
  const others = useOthers();
  const self = useSelf();
  // Loading state: if self is null, Liveblocks is still fetching presence
  if (self === null) {
    return (
      <div
        className="bg-white/40 rounded-2xl shadow-lg border border-white/50 p-5 flex flex-col items-center gap-4 min-w-[120px] min-h-[80px] justify-center"
        aria-label="Active users loading"
      >
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 border-solid mb-2"></div>
        <span className="text-xs text-gray-500">Loading users...</span>
      </div>
    );
  }

  // Compose the user list: self first, then others
  const userList = [
    ...(self
      ? [
          {
            name: self.info?.name || "You",
            color:
              typeof self.info?.color === "string"
                ? self.info.color
                : "#4ade80",
            isSelf: true,
          },
        ]
      : []),
    ...others.map((user) => ({
      name: user.info?.name || "Anonymous",
      color: typeof user.info?.color === "string" ? user.info.color : "#60a5fa",
      isSelf: false,
      connectionId: user.connectionId,
    })),
  ];

  const maxVisible = 5;
  const visibleUsers = userList.slice(0, maxVisible);
  const overflowCount = userList.length - maxVisible;

  return (
    <div
      className="bg-white/40 rounded-2xl shadow-lg border border-white/50 p-5 flex flex-col items-center gap-4 min-w-[120px]"
      aria-label="Active users"
    >
      <span className="text-base font-semibold text-gray-700 mb-1">
        Active Users
      </span>
      <div className="flex flex-col gap-3 w-full items-center">
        {visibleUsers.map((user, idx) => (
          <span
            key={
              user.isSelf
                ? "self"
                : "connectionId" in user
                ? user.connectionId
                : idx
            }
            className={`flex items-center gap-1 border border-gray-200 rounded-full px-2 py-0.5 text-xs font-medium ${
              user.isSelf
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
            title={user.name}
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block mr-1"
              style={{ backgroundColor: user.color }}
              aria-label={user.isSelf ? "Your color" : "User color"}
            />
            {user.name}
            {user.isSelf && <span className="ml-1">(You)</span>}
          </span>
        ))}
        {overflowCount > 0 && (
          <span
            className="flex items-center gap-1 border border-gray-200 rounded-full px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium"
            title={`${overflowCount} more users`}
          >
            +{overflowCount} more
          </span>
        )}
        {userList.length === 0 && (
          <span className="text-gray-500 italic">No other users online</span>
        )}
      </div>
      <div className="mt-1 text-gray-500 text-[11px]">
        {userList.length} user{userList.length !== 1 ? "s" : ""} online
      </div>
    </div>
  );
};
