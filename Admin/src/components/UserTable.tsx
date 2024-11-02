import { MdDeleteForever } from "react-icons/md";
import { MdOutlineEditOff } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

type UserTableProps = {
  image?: string;
  fName?: string;
  colTwo?: string;
  lName?: string;
  email?: string;
  role?: string;
  phone?: string;

  moreDetails?: () => void;
  Edit?: () => void;
  Delete?: () => void;
};

const UserTable: React.FC<UserTableProps> = ({
  image,
  fName,
  lName,
  email,
  role,
  phone,

  moreDetails,
  Edit,
  Delete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    if (Delete) {
      Delete();
    }
    console.log("Confirmed");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // Handle the cancel action here
    console.log("Cancelled");
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-2 sm:col-span-3 flex items-center">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 h-17 w-17 rounded-md hidden md:block">
              <img src={image} alt={fName} className="h-full w-full" loading='lazy'/>
            </div>
            <p className="col-span-3 md:col-span-2 line-clamp-2 text-sm text-black dark:text-white self-center sm:ps-2 pe-2">
              {fName + " " + lName}
            </p>
          </div>
        </div>

        <div className="col-span-1 items-center flex">
          <p className="text-sm text-black dark:text-white truncate overflow-hidden">
            {role}
          </p>
        </div>

        <div className="col-span-3 hidden items-center sm:flex">
          <p className="text-sm text-black dark:text-white truncate overflow-hidden">
            {email}
          </p>
        </div>

        <div className="col-span-2 flex items-center">
          <p className="text-sm text-black dark:text-white truncate overflow-hidden">
            {phone}
          </p>
        </div>

        <div className="col-span-1 flex items-center justify-between">
          <span
            className="hover:cursor-pointer hover:bg-sky-600"
            onClick={moreDetails}
          >
            <FaEye size={20} className="hover:!text-blue-500" />
          </span>

          <span
            className="hover:cursor-pointer hover:bg-sky-600"
            onClick={Edit}
          >
            <MdOutlineEditOff size={20} />
          </span>

          <span
            className="hover:cursor-pointer hover:bg-sky-600"
            onClick={() => setIsModalOpen(true)}
          >
            <MdDeleteForever size={20} />
          </span>
        </div>

        <ConfirmationModal
          isOpen={isModalOpen}
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default UserTable;
