import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../store/services/userService";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import RHelmet from "../components/Helmet";
import ProfileSkelton from "../components/ProfileSkelton";
import {RiCloseCircleFill} from 'react-icons/ri'
const EditProfile = ({setShow}) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()
  if(!user){
    navigate('/auth/login')
  }
  const [userInfo, setUserInfo] = useState({});
  const [profile, setProfile] = useState();
  const [preImg, setPreImg] = useState("");
  const {data,error:err} = useGetUserQuery(user);
  const [update, updateResult] = useUpdateUserMutation();
  const { error, isSuccess, isLoading } = updateResult;
  const fileReader = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreImg(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setUserInfo(data?.user);
    setPreImg(
      data?.user?.profile
    );
  }, [data?.user]);
  if(err){
    toast.error(err?.data?.msg)
    navigate('/auth/login')
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userInfo.username  || !userInfo.bio){
      return toast.error('Please fill all the fields')
    }
    if(userInfo.username.length < 4){
      return toast.error('Username should be atleast 4 characters long')
    }
    if(userInfo.bio.length < 10){
      return toast.error('Bio should be atleast 10 characters long')
    }
    if(userInfo.bio.length > 100){
      return toast.error('Bio should be less than 100 characters long')
    }
    const formData = new FormData();
    profile ? formData.append("profile", profile) : formData.append("profile", "");
    formData.append("username", JSON.stringify(userInfo.username));
    formData.append("email", JSON.stringify(userInfo.email));
    formData.append("bio", JSON.stringify(userInfo.bio));
    update(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.msg)
    }
    if (isSuccess) {
      toast.success("Profile Updated Successfully")
      setShow(false)

    }

  }, [error, isSuccess, navigate]);


  
  

  return (
    <dialog className="flex flex-col  bg-gray-600 bg-opacity-40 items-center justify-center text-center fixed w-full top-0 left-0 max-w-screen  min-h-screen overflow-x-hidden">
      <RHelmet title="Edit Profile" />
      <div className="w-full max-w-sm bg-white border border-gray-600 rounded-lg shadow-md relative ">
        <div
          className="absolute top-0 right-0  "
          onClick={() => setShow(false)}
        >
          <RiCloseCircleFill
            size={30}
            className="text-rose-400 rounded-lg cursor-pointer hover:text-rose-500"
          />
        </div>
        {userInfo ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center pb-10 mt-10 "
          >
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg bg-gray-300"
              src={preImg}
              alt={userInfo.username}
              loading="lazy"
            />
            <div className="relative mb-4 ">
              <label
                htmlFor="profile"
                className="leading-7 text-sm text-gray-900 text-left cursor-pointer hover:text-rose-500"
              >
                Edit Profile Picture
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                className="w-full border border-gray-500  hidden  text-sm outline-none leading-8 transition-colors duration-200 ease-in-out placeholder-gray-400 text-gray-400 "
                onChange={(e) => {
                  setProfile(e.target.files[0]);
                  fileReader(e.target.files[0]);
                }}
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <div className="relative mb-4 w-3/4">
              <label
                htmlFor="username"
                className="leading-7 text-sm text-gray-900 text-left"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full bg-white rounded border border-gray-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out capitalize"
                placeholder="Username"
                required
                value={userInfo.username}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4 w-3/4">
              <label
                htmlFor="bio"
                className="leading-7 text-sm text-gray-900 text-left"
              >
                Bio
              </label>
              <textarea
                type="text"
                id="bio"
                name="bio"
                className="w-full bg-white rounded border border-gray-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out "
                placeholder="Bio"
                required
                value={userInfo.bio}
                onChange={handleChange}
              />
            </div>

            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setShow(false);
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-rose-700 bg-white border-2 border-rose-600 rounded-lg disabled:border-transparent  hover:bg-rose-600 hover:text-white focus:ring-4 focus:outline-none  "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !userInfo.username || !userInfo.bio || !userInfo.email || (data?.user?.bio === userInfo.bio && data?.user?.username === userInfo.username && data?.user?.profile === preImg)} 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none  bg-rose-600  hover:bg-rose-700 focus:ring-rose-800"
              >
                {isLoading ? <Spinner /> : "Update"}
              </button>
            </div>
          </form>
        ) : (
          <ProfileSkelton />
        )}
      </div>
    </dialog>
  );
};

export default EditProfile;
