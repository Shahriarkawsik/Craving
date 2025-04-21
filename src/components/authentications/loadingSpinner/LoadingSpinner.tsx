// components/LoadingSpinner.tsx
import { SyncLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-10">
      <SyncLoader className="w-full text-white rounded-lg transition duration-300" color="#ffffff" size={10} />
    </div>
  );
};

export default LoadingSpinner;
