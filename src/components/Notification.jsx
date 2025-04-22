const notificationStyles = {
  success: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
  error: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
  warning:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
};

export const Notification = ({ type = "default", message = "" }) => {
  const notificationClass =
    notificationStyles[type] || notificationStyles.default;

  return (
    <div
      className={`flex items-center w-full p-4 rounded-lg shadow-sm ${notificationClass}`}
      role="alert"
    >
      <div className="ms-3 text-sm font-normal">{message}</div>
    </div>
  );
};
