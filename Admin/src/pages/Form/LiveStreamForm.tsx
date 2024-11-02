/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import CustomInput from "./FromComponents/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import Swal from "sweetalert2";

const LiveStreamForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [streamData, setStreamData] = useState({
    streamTitle: "",
    author: "",
    streamUrlCode: "",
    description: "",
    eventDate: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setStreamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function resetFormData() {
    setStreamData({
      streamTitle: "",
      author: "",
      streamUrlCode: "",
      description: "",
      eventDate: "",
    });
  }

  const { id } = useParams();

  const getStreamEventById = async () => {
    const res = await axios.get(`${apiUrl}/stream-events/${id}`);
    const StreamEvent = res.data;
    console.log(StreamEvent);
    setStreamData({
      streamTitle: StreamEvent.streamTitle || "",
      author: StreamEvent.author || "",
      streamUrlCode: StreamEvent.streamUrlCode || "",
      description: StreamEvent.description || "",
      eventDate: StreamEvent.eventDate ? StreamEvent.eventDate.split("T")[0] : "",
    });
  };

  useEffect(() => {
    if (id) {
      getStreamEventById();
    }
  }, [id]);

  function getToken() {
    return localStorage.getItem("token");
  }

  
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const token = getToken();

    const formData2 = new FormData();
    formData2.append("streamTitle", streamData.streamTitle);
    formData2.append("author", streamData.author);
    formData2.append("streamUrlCode", streamData.streamUrlCode);
    formData2.append("description", streamData.description);
    formData2.append("eventDate", streamData.eventDate);
    for (const [key, value] of formData2.entries()) {
      console.log(`${key}: ${value}`);
    }

    const formData = {
    streamTitle: streamData.streamTitle,
    author: streamData.author,
    streamUrlCode: streamData.streamUrlCode,
    description: streamData.description,
    eventDate: streamData.eventDate,
    }

    try {
      if (id) {
        const res = await axios.patch(`${apiUrl}/stream-events/${id}`, formData, {
          headers: {  token : token },
        });
        Swal.fire({
          icon: "success",
          title: `${res.data.streamTitle}<br> \n Updated Successfully!`,
          showConfirmButton: true,
          timer: 2000,
        });
      } else {
        const res = await axios.post(`${apiUrl}/stream-events`, formData, {
          headers: {  token : token },
        });
        Swal.fire({
          icon: "success",
          title: `${res.data.streamTitle}<br> \n Created Successfully!`,
          showConfirmButton: true,
          timer: 2000,
        });
      }
      handleClearBtn(); // Call to reset and navigate
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:  err.response.data.message || "Something went wrong!",
      });
      
    } finally {
      setIsLoading(false);
    }
  
  }

  function handleClearBtn() {
    resetFormData();
    navigate(`/forms/livestream-form`);
  }
  return (
    <section>
      <Breadcrumb pageName="Live Stream Form" />
      <h1 className="font-extrabold text-3xl pb-5">
        {id ? "Update Live Stream" : "Add New Live Stream"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CustomInput
            inputLabel="Stream Title"
            inputName="streamTitle"
            inputPlaceholder="Stream Title"
            inputType="text"
            inputValue={streamData.streamTitle}
            inputOnChangeValue={handleChange}
          />

          <CustomInput
            inputLabel="Author Name"
            inputName="author"
            inputPlaceholder="Author Name"
            inputType="text"
            inputValue={streamData.author}
            inputOnChangeValue={handleChange}
          />

          <CustomInput
            inputLabel="Stream URL Code"
            inputName="streamUrlCode"
            inputPlaceholder="ex : s25jGf58k"
            inputType="text"
            inputValue={streamData.streamUrlCode}
            inputOnChangeValue={handleChange}
          />

          <CustomInput
            inputLabel="Published Date"
            inputName="eventDate"
            inputType="date"
            inputPlaceholder=""
            inputValue={streamData.eventDate?.split("T")[0]}
            inputOnChangeValue={handleChange}
          />

          <div className="relative md:col-span-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Book Description
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <textarea
                  name="description"
                  value={streamData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Book description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {id && (
            <button
              className="btn btn-primary mt-4 px-8 text-xl block"
              onClick={() => handleClearBtn()}
            >
              Clear All Feilds
            </button>
          )}
          <button
            className={
              isLoading
                ? "btn btn-primary ms-auto mt-4 px-8 text-xl block cursor-progress"
                : "btn btn-primary ms-auto mt-4 px-8 text-xl block"
            }
          >
            {isLoading ? (
              <LoadingSpinner color="white" />
            ) : id ? (
              "Update Stream"
            ) : (
              "Create Stream"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LiveStreamForm;
