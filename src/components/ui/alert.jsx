/* eslint-disable react/prop-types */
import {
  IoIosInformationCircle,
  IoMdCheckmarkCircle,
  IoIosCloseCircle,
} from "react-icons/io";

export default function Alert({ status, data }) {
  const { alert } = data;
  if (!status) return null;

  return (
    <div className="w-full h-max flex justify-center items-center fixed top-0 left-0 z-[1000]">
      <div
        className={`flex max-w-[90%] min-h-max text-white lg:w-max items-center p-2 lg:p-4 mt-4 text-sm   border  rounded-lg  ${
          alert.type == "success"
            ? "bg-gray-700  border-green-800"
            : alert.type == "info"
            ? "bg-gray-700  border-blue-800"
            : "bg-gray-700  border-red-800"
        }`}
        role="alert"
      >
        {alert.type == "success" ? (
          <IoMdCheckmarkCircle size={20} className="text-green-600  me-1" />
        ) : alert.type == "info" ? (
          <IoIosInformationCircle size={20} className="text-blue-600  me-1" />
        ) : (
          <IoIosCloseCircle size={20} className="text-red-600  me-1" />
        )}
        <span className="sr-only">Info</span>
        <div>
          <p>{alert.message}</p>
        </div>
      </div>
    </div>
  );
}
