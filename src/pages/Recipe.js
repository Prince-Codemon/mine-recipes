import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RHelmet from "../components/Helmet";
import BlogSkelton from "../components/BlogSkelton";
import {
  useGetRecipeQuery,
  useLikeRecipeMutation,
  useSaveRecipeMutation,
  useSavedRecipesQuery,
  useUpdateViewsQuery,
} from "../store/services/recipeService";
import formatDate from "../utils/date";
import Editor from "../components/Editor";

import {
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import cookingTime from "../utils/time";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineFieldTime,
  AiOutlineHeart,
} from "react-icons/ai";
import views from "../utils/views";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Recipe = () => {
  window.scrollTo(0, 0);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetRecipeQuery(id);
  const [likeRecipe, result] = useLikeRecipeMutation();
  const [liked, setLiked] = useState(false);
  const [likeLength, setLikeLength] = useState(0);
  

  const {
    title,
    content,
    image,
    createdAt,
    creator,
    desc,
    ingredients,
    category,
    avgCookingTime,
    likes,
    views: recipeViews,
  } = data?.recipe || {};
  if (error) {
    navigate("/404");
  }
  useUpdateViewsQuery(id)
  const {
    data: userSaved,
    error: userSavedError,
  } = useSavedRecipesQuery();
  const [saved, setSaved] = useState(
     false);
  const [saveRecipe, { error: saveError }] = useSaveRecipeMutation();
  useEffect(() => {
    if(userSaved?.recipes?.length>0){
      const index = userSaved?.recipes?.findIndex((recipe)=>recipe._id===id)
      if(index!==-1){
        setSaved(true)
      }
      else{
        setSaved(false)
      }
    }
    else{
      setSaved(false)
      return
    }
  },[userSaved, id]);

  useEffect(() => {
    if(saveError) {
      setSaved(prev=>!prev)
      toast.error("Something went wrong");
      return 
    }
  }, [saveError]);
  
  const handleSaveRecipe = () => {
    
    if (!user) {
      toast.error("You must be logged in to save a recipe.");
      return;
    }
    if (userSavedError) {
      toast.error("Something went wrong");
      return;
    }
    setSaved((prev) => !prev);
    saveRecipe(data.recipe._id);
  };
 

  const handleLikeRecipe = () => {
    if (!user) {
      toast.error("You must be logged in to like a recipe.");
      return;
    }
    likeRecipe(id);
    setLiked((prevLiked) => !prevLiked);
    setLikeLength((prevLength) => (liked ? prevLength - 1 : prevLength + 1));
  };
  useEffect(() => {
    setLikeLength(likes?.length);
    setLiked(likes?.includes(user));
  }, [likes, user]);
  useEffect(() => {
    if (result.error) {
      handleLikeError()
    }
  }, [result.error]);

  const handleLikeError=()=>{
    toast.error("Something went wrong");
      setLiked((prev) => !prev);
      setLikeLength((l) => {
        if (liked) return l - 1;
        return l + 1;
      });}

  return (
    <section className="text-gray-600 body-font">
      {title && (
        <RHelmet
          title={title}
          content={desc}
          image={image}
          creator={creator?.username}
        />
      )}
      {isFetching && !data?.recipe ? (
        <div className=" w-full h-screen flex justify-center items-center">
          <BlogSkelton />
        </div>
      ) : (
        <div className="container mx-auto flex flex-col px-5 py-20 justify-center items-center">
          <div className="flex lg:min-w-[800px] w-full flex-col md:flex-row md:w-2/3 md:min-w-[600px] justify-center items-center  gap-5 border-rose-500 rounded-md shadow-sm  p-2 mb-2">
            <div
              className="  w-full max-w-md md:aspect-square aspect-video flex justify-center items-center
            "
            >
              <img
                className=" w-full object-cover object-center rounded md:aspect-square aspect-video"
                alt={title}
                src={image}
                loading="lazy"
              />
            </div>

            <div className="w-full flex justify-start items-start flex-col">
              <div className=" border-rose-600 border-[1px] rounded-md shadow-sm text-white bg-rose-600 px-3 py-1 text-base md:text-xl mb-2">
                {category}
              </div>
              <h1 className="title-font text-xl md:text-3xl mb-4 font-medium text-gray-900 capitalize">
                {title}
              </h1>
              <div className="flex justify-start items-start gap-2 flex-wrap  w-full text-gray-700">
                {ingredients?.map((ingredient, i) => (
                  <div
                    key={i}
                    className="flex items-center capitalize md:text-base text-sm hover:bg-rose-200 border-rose-500 border-[1px] rounded-md shadow-sm bg-rose-100 px-2"
                  >
                    {ingredient}
                  </div>
                ))}
              </div>

              <div className="flex justify-between my-2 w-full text-gray-700">
                <div className="flex items-center border-rose-500 border-[1px] rounded-md shadow-sm bg-white text-rose-500 px-2">
                  <AiOutlineFieldTime className="w-7 h-7 " />
                  <span className="ml-1 text-sm">
                    {cookingTime(avgCookingTime)}
                  </span>
                </div>
                <div className="flex items-center border-rose-500 border-[1px] rounded-md shadow-sm bg-white text-rose-500 px-2">
                  <AiOutlineEye className="w-7 h-7 " />
                  <span className="ml-1 text-sm">{views(recipeViews)}</span>
                </div>
              </div>
              <div className="flex justify-between mb-4 w-full text-gray-700">
                <div className="flex items-center text-gray-700">
                  {liked ? (
                    <AiFillHeart
                      className="cursor-pointer  text-rose-500"
                      onClick={handleLikeRecipe}
                      size={28}
                    />
                  ) : (
                    <AiOutlineHeart
                      size={28}
                      className=" cursor-pointer hover:text-rose-500"
                      onClick={handleLikeRecipe}
                    />
                  )}
                  <span className="ml-1 text-sm">{likeLength}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  {saved ? (
                    <BsBookmarkFill
                      size={28}
                      className=" cursor-pointer  text-rose-500"
                      onClick={handleSaveRecipe}
                    />
                  ) : (
                    <BsBookmark
                      size={28}
                      className=" cursor-pointer hover:text-rose-500"
                      onClick={handleSaveRecipe}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <WhatsappShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/recipe/${id}`}
                  title={`Make ${title} with me`}
                  separator=" "
                >
                  <WhatsappIcon size={28} />
                </WhatsappShareButton>
                <TwitterShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/recipe/${id}`}
                  title={`Make ${title} with me`}
                >
                  <TwitterIcon size={28} />
                </TwitterShareButton>
                <FacebookShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/recipe/${id}`}
                  title={`Make ${title} with me`}
                >
                  <FacebookIcon size={28} />
                </FacebookShareButton>
                <LinkedinShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/recipe/${id}`}
                  title={`Make ${title} with me`}
                >
                  <LinkedinIcon size={28} />
                </LinkedinShareButton>
                <TelegramShareButton
                  url={`${process.env.REACT_APP_BASE_URL}/recipe/${id}`}
                  title={`Make ${title} with me`}
                >
                  <TelegramIcon size={28} />
                </TelegramShareButton>
              </div>
              <div className="flex justify-between items-end w-full">
                {creator && (
                  <Link to={`/user/${creator?._id}`}>
                    <img
                      className="w-10 h-10 rounded-full shadow-md"
                      src={creator?.profile}
                      alt={creator?.username}
                    />

                    <h2 className="text-sm text-rose-500 tracking-widest font-medium title-font mb-1 capitalize">
                      {creator?.username}
                    </h2>
                  </Link>
                )}
                <h1 className="text-sm text-rose-500 tracking-widest font-medium title-font mb-1">
                  {formatDate(createdAt)}
                </h1>
              </div>
            </div>
          </div>

          <div className="w-full lg:min-w-[800px] md:min-w-[600px] md:w-2/3 flex flex-col mb-16 recipe ">
            <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 capitalize">
              Directions
            </h2>
            <Editor content={content} readOnly={true} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Recipe;
