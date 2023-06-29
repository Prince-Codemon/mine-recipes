import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../store/services/userService";
import ProfileSkelton from "../components/ProfileSkelton";
import {  useGetUserRecipesQuery } from "../store/services/recipeService";
import RHelmet from "../components/Helmet";
import { HiOutlineMail } from "react-icons/hi";
import { MdPermContactCalendar } from "react-icons/md";
import RecipeCard from "../components/RecipeCard";
const UserProfile = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useGetUserQuery(id);
  const {
    data: recipes,
    isLoading,
  } = useGetUserRecipesQuery(id);

  if (error) {
    navigate("/404");
  }

  return (
    <div className="flex flex-col items-center h-fit justify-center  py-10 gap-9 px-4 md:px-14 text-center min-h-[70vh] ">
      <RHelmet title={data?.user?.username} image={data?.user?.profile} content={data?.user?.bio} creator={data?.user?.username} />
      <div className="container mx-auto my-5  p-3 md:p-5">
        {data?.user?.profile ? (
          <div className="md:flex no-wrap flex flex-col  justify-center items-center">
            {/* <!-- Left Side --> */}
            <div className="w-full max-w-[300px] mb-4 md:mb-0 border-b-2 md:border-b-0 border-rose-500 pb-3">
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
                  className="text-sm text-gray-500 hover:text-gray-600 leading-6 font-regular"
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
              </div>
            </div>

            <div className="w-full  mx-2 ">
              {/* <!-- Post tab --> */}
              <div className="bg-white  pt-0 shadow-sm rounded-sm">
                <div className="flex items-center justify-center">
                  <div>
                    <div className="flex items-center justify-center font-semibold w-full text-gray-900 leading-8 mb-3">
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
                        My Recipes
                      </span>
                    </div>
                    {!isLoading && recipes?.length < 0 && (
                      <p className="text-center my-4 text-sm font-medium text-gray-400">
                        No Recipes yet !
                      </p>
                    )}
                    <div className="w-full flex flex-wrap  justify-center gap-2 items-stretch">
                      {recipes?.recipes?.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe._id} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* <!-- End of Experience and education grid --> */}
              </div>
              {/* <!-- End of post tab --> */}
            </div>
          </div>
        ) : (
          <div className=" w-full h-full flex justify-center items-center">
            <ProfileSkelton />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
