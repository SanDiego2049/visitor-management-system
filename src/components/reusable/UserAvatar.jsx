const UserAvatar = ({ user, isCollapsed }) => {
  if (!user || !user.avatarUrl) return null;

  // Collapsed view (avatar only)
  if (isCollapsed) {
    return (
      <div className="flex justify-center mt-3.5">
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
          />
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-gray-800 dark:border-gray-950"></span>
        </div>
      </div>
    );
  }

  // Expanded view (avatar with user info)
  return (
    <div className="flex items-center space-x-3 mt-8">
      <div className="relative">
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800 dark:border-gray-950"></span>
      </div>
      <div>
        <p className="text-sm font-semibold">{user.fullName}</p>
        <p className="text-xs dark:text-gray-300">{user.role}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
