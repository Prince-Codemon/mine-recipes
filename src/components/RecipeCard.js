import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import views from "../utils/views";
import {

  AiFillHeart,
  AiOutlineEye,
  AiOutlineFieldTime,
} from "react-icons/ai";
import cookingTime from "../utils/time";
import { useSelector } from "react-redux";

const RecipeCard = ({ recipe }) => {

  const {
    category,
    title,
    desc,
    views: recipeView,
    likes,
    _id,
    image,
    ingredients,
    avgCookingTime,
  } = recipe;
  const {user} = useSelector(state=>state.user)
  const [isLiked, setIsLiked]= useState(likes?.includes(user) || false)
  useEffect(()=>{
   if(user){ setIsLiked(likes?.includes(user))
 
  
  }
  }
  ,[user,likes])
  return (
    <div
      to={`/recipe/${_id}`}
      className="p-4 w-full min-w-[260px]  md:max-w-sm max-w-[340px] "
    >
     
      <div className="bg-white rounded-md overflow-hidden relative shadow-md flex flex-col justify-between h-full ">
        <div>
          <img className="w-full aspect-video" src={image} alt="Recipe" loading="lazy" />
        </div>
        <div className="p-4">
          <h2 className="text-2xl text-left capitalize text-gray-900">
            {title}
          </h2>

          <div className="flex w-full flex-wrap gap-1 pt-2">
            {ingredients?.slice(0, 4).map((ingredient, i) => (
              <div
                className=" bg-rose-500 p-1 rounded text-white text-sm capitalize"
                key={i}
              >
                {ingredient.length>12 ? ingredient.slice(0, 12) + "..." : ingredient}
              </div>
            ))}
          </div>
          <p className="mb-4 text-gray-500 capitalize text-left">
            {desc?.length > 39 ? desc.slice(0, 39) + "..." : desc}
          </p>
          <div className="flex justify-between mt-4 mb-4 text-gray-500">
            <div className="flex items-center">
              <AiOutlineFieldTime className="h-5 w-5" />
              <span className="ml-1 text-sm">
                {cookingTime(avgCookingTime)}
              </span>
            </div>
            <div className="flex items-center">
             {
                isLiked ? <AiFillHeart className="h-5 w-5 text-rose-500" /> : <AiFillHeart className="h-5 w-5" />
             }
              <span className="ml-1 text-sm">
                {likes?.length ? views(likes.length) : 0}
              </span>
            </div>
            <div className="flex items-center">
              <AiOutlineEye className="h-5 w-5" />
              <span className="ml-1 text-sm">{views(recipeView)}</span>
            </div>
          </div>
          
            <Link
              to={`/recipe/${_id}`}
              className="text-white bg-rose-500 flex justify-center items-center hover:bg-rose-600 p-2 rounded-md !w-full uppercase"
            >
              View Recipe
            </Link>
          
         
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase">
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
