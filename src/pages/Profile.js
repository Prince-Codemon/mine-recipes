import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../store/services/userService";
import RHelmet from "../components/Helmet";
import { HiOutlineMail, HiPlusCircle } from "react-icons/hi";
import { MdPermContactCalendar } from "react-icons/md";
import ProfileSkelton from "../components/ProfileSkelton";
import { useEffect } from "react";
import EditProfile from "./EditProfile";
import { toast } from "react-hot-toast";
import { useGetUserRecipesQuery } from "../store/services/recipeService";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import DeleteModal from "../components/DeleteModal";

const Profile = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.user);
  if (!token || !user) {
    navigate("/auth/login");
  }
  const [show, setShow] = useState(false);
 
  const { data, error } = useGetUserQuery(user);
  const {
    data: recipes,
    error: recipeError,
    isLoading,
  } = useGetUserRecipesQuery(user);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.msg);
      navigate("/auth/login");
    }
  });

  if (recipeError) {
    toast.error(recipeError?.data?.msg || "Something went wrong");
    return;
  }

  return (
    <div className="flex flex-col items-center h-fit justify-center  py-10 gap-9 px-4 md:px-14 text-center min-h-[70vh] ">
      <RHelmet title="Profile" />
      {data?.user?.profile ? (
        <div className="container mx-auto my-5  p-3 md:p-5">
          <div className="md:flex no-wrap flex flex-col md:flex-row justify-center md:items-start items-center">
            {/* <!-- Left Side --> */}
            <div className="w-full max-w-[300px] mb-4 md:mb-0 border-b-2 md:border-b-0 border-rose-500 pb-3">
              {/* <!-- Profile Card --> */}
              <div className="bg-white md:p-3  p-0 border-t-4 border-rose-600">
                <div className="image overflow-hidden">
                  <img
                    id="self-profile-image"
                    className="h-auto w-full mx-auto"
                    src={
                      data?.user?.profile ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt=""
                  />
                </div>
                <h1
                  id="self-name"
                  className="text-gray-900 font-medium text-xl leading-8 my-1"
                >
                  {data?.user?.username}
                </h1>
                <p
                  id="self-caption"
                  className="text-sm text-gray-700 hover:text-gray-600 leading-6 font-regular"
                >
                  {data?.user?.bio}
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3 font-regular">
                    <HiOutlineMail size={20} className="text-rose-500" />
                    <span className="ml-auto break-words">
                      {data?.user?.email.length > 20
                        ? data?.user?.email.slice(0, 20) + "..."
                        : data?.user?.email}
                    </span>
                  </li>
                  <li className="flex items-center py-3 font-regular">
                    <MdPermContactCalendar
                      size={20}
                      className="text-rose-500"
                    />
                    <span className="ml-auto">
                      {data?.user?.createdAt.split("T")[0]}
                    </span>
                  </li>
                </ul>
                <div className="flex mx-auto justify-center flex-wrap gap-6 mt-2">
                  <button
                    onClick={() => {
                      setShow(true);
                    }}
                    type="button"
                    className="bg-rose-600 hover:bg-rose-700 text-white text-sm md:text-base font-regular md:py-2 md:px-4 py-1 px-2  rounded"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              {/* <!-- End of profile card --> */}
            </div>

            <div className="w-full md:w-9/12 mx-2 ">
              {/* <!-- Post tab --> */}
              <div className="bg-rose-100  pt-0 shadow-sm rounded-sm">
                {/* <div className="flex items-center">
                  <div>
                    
                    {!isLoading && recipes?.length < 0 && (
                      <p className="text-center my-4 text-sm font-medium text-gray-400">
                        No Recipes yet !
                      </p>
                    )}
                    <div className="w-full flex flex-wrap  justify-center gap-2 items-stretch">
                      {recipes?.recipes?.map((recipe) => (
                        <RecipeCard
                          recipe={recipe}
                          key={recipe._id}
                          controls={true}
                        />
                      ))}
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="relative overflow-x-auto bg-rose-100 w-full shadow-md sm:rounded-lg ">
                <div className="flex items-center font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <svg
                      className="h-5 stroke-current text-rose-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide text-rose-600 ml-2 font-bold">
                    Recipes
                  </span>
                  <Link
                    to={"/user/createrecipe"}
                    type="button"
                    className="post-modal-open flex flex-row items-center bg-rose-600 hover:bg-rose-700 text-white text-sm md:text-base font-regular md:py-2 md:px-4 py-1 px-2 rounded ml-auto"
                  >
                    <HiPlusCircle
                      size={20}
                      className="text-white mr-1 md:mr-2"
                    />
                    Create Recipe
                  </Link>
                </div>
                <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 bg-rose-100">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                      <th scope="col" className=" px-3 md:px-6 py-1.5 md:py-3">
                        Title
                      </th>
                      <th scope="col" className=" px-3 md:px-6 py-1.5 md:py-3">
                        Category
                      </th>
                      <th scope="col" className=" px-3 md:px-6 py-1.5 md:py-3">
                        Views
                      </th>
                      <th scope="col" className=" px-3 md:px-6 py-1.5 md:py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading && recipes?.recipes?.length > 0 ? (
                      recipes?.recipes?.map((recipe) => (
                        <tr
                          className="bg-rose-100  hover:bg-rose-200 text-gray-700 "
                          key={recipe._id}
                        >
                          <th
                            scope="row"
                            className="flex items-center  px-3 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            <img
                              className="w-10 h-10 rounded-full"
                              src={recipe.image}
                              alt="Avatar"
                            />
                            <div className="pl-3">
                              <div className="md:text-base text-xs font-semibold">
                                {recipe.title.length > 10
                                  ? recipe.title.slice(0, 10) + "..."
                                  : recipe.title}
                              </div>
                              <div className="font-normal text-xs md:text-base text-gray-700">
                                {recipe.desc.length > 10
                                  ? recipe.desc.slice(0, 10) + "..."
                                  : recipe.desc}
                              </div>
                            </div>
                          </th>
                          <td className=" px-3 py-2 md:px-6 md:py-4 text-xs md:text-base">
                            {recipe.category}
                          </td>
                          <td className=" px-3 py-2 md:px-6 md:py-4">
                            <div className="flex items-center">
                              {recipe.views}
                            </div>
                          </td>
                          <td className="px-2 py-4 ">
                            {/* <!-- Modal toggle --> */}
                            <div className="flex justify-between max-w-fit gap-2">
                              <Link
                                to={`/user/editrecipe/${recipe?._id}`}
                                className="text-white bg-rose-500 hover:bg-rose-600 p-1 px-2 rounded-md flex gap-1"
                              >
                                <AiFillEdit className="font-bold text-sm md:text-xl" />{" "}
                              </Link>
                              <Link
                                to={`/recipe/${recipe?._id}`}
                                className="text-white bg-rose-500 hover:bg-rose-600 p-1 px-2 rounded-md flex gap-1"
                              >
                                <AiFillEye className="font-bold text-sm md:text-xl" />{" "}
                              </Link>

                              <DeleteModal id={recipe?._id} />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center my-4 text-sm font-medium text-gray-700"
                        >
                          No Recipes yet !
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* <!-- Edit user modal --> */}\
              </div>

              {/* <!-- End of post tab --> */}
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full h-full flex justify-center items-center">
          <ProfileSkelton />
        </div>
      )}

      {show && <EditProfile setShow={setShow} />}
    </div>
  );
};

export default Profile;
