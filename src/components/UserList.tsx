import { useStore } from "../store/useStore";

export function UserList() {
  const { users, currentUser } = useStore();

  return (
    <div className="p-4 border-l border-gray-200 w-64 bg-white">
      <h2 className="text-lg font-semibold mb-4">Active Users</h2>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentUser.color }}
          />
          <span className="text-sm font-medium">{currentUser.name} (You)</span>
        </li>
        {users.map((user) => (
          <li key={user.id} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: user.color }}
            />
            <span className="text-sm font-medium">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
