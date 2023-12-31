import React, { useState } from "react";
import { url } from "../../helper/url";
import ErrorComponent from "../Common/ErrorComponent";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getSpecificUser from "../../api/specificUser";
import editSubAdmin from "../../api/updateSubadmin";
import { useEffect } from "react";
function AdminProfile() {
  const [data, setData] = useState(JSON?.parse(localStorage?.getItem("data")));
  const [image, setImage] = useState(data?.image ? data.image : "");
  const [user, setUser] = useState(localStorage.getItem("data"));

  const [name, setName] = useState(data?.name);
  const [email, setEmail] = useState(data?.email);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(data?.phone);
  const [error, setError] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setImageSrc(reader.result);
      // };
      // reader.readAsDataURL(file);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", JSON.parse(user)._id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("image", image);
    try {
      const response = await editSubAdmin(formData);
      getUser();
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  const getUser = async () => {
    try {
      const response = await getSpecificUser(JSON.parse(user)._id);
      setName(response.data.data?.name);
      setEmail(response.data.data?.email);
      setPhone(response.data.data?.phone);

      setImage(
        url +
          "\\" +
          response.data.data?.image
            .replace("uploads\\", "")
            .replace("uploads/", "")
      );
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      style={{
        background: "black",
        position: "relative",
        // left: "10%",
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      <div className=" ml-4 mt-20 ">
        <div>
          <div
            className="w-[80vw] edit-con bg-[#1C1C1E]  mx-auto rounded p-5"
            style={{ position: "absolute", left: "17%" }}
          >
            {error && <ErrorComponent message={error} />}
            <form class="max-w-sm">
              <div class="mb-5 input-feild w-[72vw] flex  ">
                <div
                  for="text"
                  class="block main-profile-img bg-white border w-[200px] h-[220px] flex justify-between items-center  mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : image instanceof File
                        ? URL.createObjectURL(image)
                        : null
                    }
                    alt="Uploaded Image"
                    className="w-[170px] h-[170px] rounded-full  mx-auto my-auto "
                  />
                </div>
              </div>
              <div class="mb-5 input-feild w-[72vw] flex">
                <label
                  for="email"
                  class="block input-feild-label  mb-2 text-sm font-medium w-[17vw] text-gray-900 text-white"
                >
                  Image
                </label>
                <input
                  class="block w-full text-sm text-white border border-0 rounded cursor-pointer bg-white-600 dark:text-white focus:outline-none bg-[#48484A] "
                  id="file_input"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div class="mb-5 input-feild w-[72vw] flex">
                <label
                  for="text"
                  class="block input-feild-label  mb-2 text-sm font-medium w-[17vw] text-gray-900 text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="text"
                  class=" border-0 text-gray-900 text-sm rounded focus:ring-0 block w-full p-2.5 text-white font-bold bg-[#48484A]"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div class="mb-5 input-feild w-[72vw] flex">
                <label
                  for="email"
                  class="block input-feild-label  mb-2 text-sm font-medium w-[17vw] text-gray-900 text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  class=" border-0 text-gray-900 text-sm rounded focus:ring-0 block w-full p-2.5 text-white font-bold bg-[#48484A]"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div class="mb-5 input-feild w-[72vw] flex">
                <label
                  for="text"
                  class="block input-feild-label  mb-2 text-sm font-medium w-[17vw] text-gray-900 text-white"
                >
                  Phone
                </label>
                <input
                  type="number"
                  class=" border-0 text-gray-900 text-sm rounded focus:ring-0 block w-full p-2.5 text-white font-bold bg-[#48484A]"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div class="mb-5 input-feild w-[72vw] flex">
                <label
                  for="password"
                  class="block input-feild-label  mb-2 text-sm font-medium w-[17vw] text-gray-900 text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  class=" border-0 text-gray-900 text-sm rounded focus:ring-0 block w-full p-2.5 text-white font-bold bg-[#48484A]"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div class="mb-5 input-feild w-[72vw] flex ">
                <label
                  for="countries"
                  class="block mb-2  text-sm font-medium text-gray-900 dark:text-white w-[15.5vw] "
                ></label>
                <button
                  type="submit"
                  class="text-white  bg-[#FF0015] text-sm font-bold rounded-md text-sm w-[70px]  sm:w-auto px-3 py-1.5 text-center "
                  onClick={(e) => {
                    handleSave(e);
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
