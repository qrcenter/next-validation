import { CheckCircleIcon, XCircleIcon, Info, AlertCircle } from "lucide-react";


type AlertMessageProps = {
  message: string;
  type: 'success' | 'error' | 'info'; // Type of alert
  onClose: () => void;
  isVisible: boolean;
};

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type, onClose, isVisible }) => {
  if (!isVisible || !message) return null; // Don't render if not visible or no message

  // Choose the icon based on the alert type
  let Icon;
  switch (type) {
    case 'success':
      Icon = CheckCircleIcon;
      break;
    case 'error':
      Icon = AlertCircle;
      break;
    case 'info':
      Icon = Info;
      break;
    default:
      Icon = CheckCircleIcon; // Default icon
  }

  const alertStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`${alertStyles[type]} text-white p-4 rounded-md shadow-md flex items-center justify-between space-x-4`}>
      <div className="flex items-center space-x-3">
        {/* Conditionally render the icon */}
        <Icon className="h-6 w-6 text-white" />
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
        <XCircleIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default AlertMessage;
