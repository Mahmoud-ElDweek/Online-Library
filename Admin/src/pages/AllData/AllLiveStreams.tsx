import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../../utils/apiUrl";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { MdDeleteForever, MdOutlineEditOff } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import MoreDetailsModal from "../../components/MoreDetailsModal";

const AllLiveStreams = () => {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStreamId, setSelectedStreamId] = useState<string | null>(null);
  const [streamsData, setStreamsData] = useState([]);

  const limit = 10;
  const fetchData = async () => {
    const res = await axios.get(
      `${apiUrl}/stream-events?page=${page}&limit=${limit}`
    );
    const eventsData = res.data.data;

    setNumberOfPages(res.data.metaData.numberOfPages);
    setStreamsData(eventsData);
  };
  useEffect(() => {
    fetchData();
  }, [page, streamsData.length]);
  console.log(streamsData);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  const navigate = useNavigate();
  const handleEdit = (streamId: string) => {
    navigate(`/forms/livestream-form/${streamId}`);
  };

  function getToken() {
    return localStorage.getItem("token");
  }
  const handleDelete = async (streamId: string) => {
    try {
      const token = getToken();
      await axios.delete(`${apiUrl}/stream-events/${streamId}`, {
        headers: { token: token },
      });
      setStreamsData(streamsData.filter((stream) => stream._id !== streamId));
    } catch (error) {
      console.error("Error deleting Stream:", error);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedStreamId) {
      handleDelete(selectedStreamId);
      setIsDeleteModalOpen(false);
    }
  };

  const dialog = useRef(null);
  function handleMoreDetails(streamId: string) {
    const selectedStream = streamsData.filter((x) => x._id === streamId)[0];
    setSelectedStreamId(selectedStream);

    dialog.current.open();
    console.log(selectedStream);
  }

  const openDeleteModal = (streamId: string) => {
    setSelectedStreamId(streamId);
    setIsDeleteModalOpen(true);
  };
  return (
    <>
      <section>
        <div className="grid grid-cols-10 border-stroke py-3 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 table">
          <div className="col-span-3 sm:col-span-2 flex items-center ">
            <p className="text-sm text-black dark:text-white truncate px-1">
              Stream Title
            </p>
          </div>

          <div className="col-span-3 sm:col-span-2 flex items-center ">
            <p className="text-sm text-black dark:text-white truncate px-1">
              Stream Author
            </p>
          </div>

          <div className="col-span-2 xl:col-span-1 hidden sm:flex items-center">
            <p className="text-sm text-black dark:text-white">Youtube Code</p>
          </div>

          <div className="col-span-2 xl:col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">Date</p>
          </div>

          <div className="col-span-3 hidden xl:flex items-center">
            <p className="text-sm text-black dark:text-white line-clamp-3">
              Stream Description
            </p>
          </div>

          <div className="col-span-1 flex items-center ">Actions</div>
        </div>
      </section>
      <section>
        {streamsData &&
          streamsData.map((stream, index) => (
            <div
              className={
                index % 2 === 0
                  ? "bg-white dark:bg-form-input"
                  : "bg-[#f9f9f9] dark:bg-strokedark"
              }
              key={stream._id}
            >
              <div className="grid grid-cols-10 border-stroke py-3 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 table">
                <div className="col-span-3 sm:col-span-2 flex items-center ">
                  <p className="text-sm text-black dark:text-white truncate px-1">
                    {stream.streamTitle ? stream.streamTitle : "N/A"}
                  </p>
                </div>

                <div className="col-span-3 sm:col-span-2 flex items-center ">
                  <p className="text-sm text-black dark:text-white truncate px-1">
                    {stream.author ? stream.author.name : "N/A"}
                  </p>
                </div>

                <div className="col-span-2 xl:col-span-1 hidden sm:flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {stream.streamUrlCode ? stream.streamUrlCode : "N/A"}
                  </p>
                </div>

                <div className="col-span-2 xl:col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white truncate px-1">
                    {stream.eventDate
                      ? stream.eventDate
                      : stream.createdAt.split("T")[0]}
                  </p>
                </div>

                <div className="col-span-3 hidden xl:flex items-center">
                  <p className="text-sm text-black dark:text-white line-clamp-3">
                    {stream.description ? stream.description : "N/A"}
                  </p>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-1">
                  <span
                    className="hover:cursor-pointer hover:text-meta-5 p-1"
                    onClick={() => handleMoreDetails(stream._id)}
                  >
                    <FaEye size={20} />
                  </span>
                  <span
                    className="hover:cursor-pointer hover:text-meta-8"
                    onClick={() => handleEdit(stream._id)}
                  >
                    <MdOutlineEditOff size={20} />
                  </span>
                  <span
                    className="hover:cursor-pointer hover:text-danger"
                    onClick={() => openDeleteModal(stream._id)}
                  >
                    <MdDeleteForever size={20} />
                  </span>
                </div>
                <MoreDetailsModal ref={dialog}>
                  <div className="text-center mb-4 px-4">
                    <img
                      src={`https://img.youtube.com/vi/${stream.streamUrlCode}/maxresdefault.jpg`}
                      alt={stream.streamTitle}
                      className="w-5/6 mx-auto"
                    />
                  </div>
                  <div className="px-4">
                    <div className="flex items-baseline pb-2">
                      <span className="text-lg font-semibold  mx-2">Title:</span>
                      <h3>{stream.streamTitle}</h3>
                    </div>
                    <div className="flex items-baseline pb-2 ">
                      <span className="text-lg font-semibold  mx-2">Author:</span>
                      <h4>{stream.author ? stream.author : "N / A"}</h4>
                    </div>
                    <div className="flex items-baseline pb-2 ">
                      <span className="text-lg font-semibold  mx-2">Date:</span>
                      <p>{stream.eventDate
                        ? stream.eventDate.split("T")[0]
                        : stream.createdAt.split("T")[0]}</p>
                    </div>
                    <div className="flex items-baseline pb-2 ">
                      <span className="text-lg font-semibold  mx-2">About:</span>
                      <p>{stream.description}</p>
                    </div>
                
                  </div>
                </MoreDetailsModal>
              </div>

              <ConfirmationModal
                isOpen={isDeleteModalOpen}
                message="Are you sure you want to delete this book?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
              />
            </div>
          ))}
      </section>
      {numberOfPages > 1 && (
        <div className="py-3 flex justify-center">
          <Pagination
            totalPages={numberOfPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default AllLiveStreams;
