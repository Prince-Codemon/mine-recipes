import React from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import {BsFillEmojiHeartEyesFill, BsPencil, BsSearch} from 'react-icons/bs';
import { GiCookingPot } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import './landing.css'
const Landing = () => {
    const scrollToBottom = ()=>{
        window.scrollTo(0,document.body.scrollHeight, 'smooth');
    }
  return (
    <div className="space-y-40 mb-20">
      <div className="relative" id="home">
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 ">
          <div className="blur-[106px] h-56 bg-gradient-to-br  to-purple-400 from-rose-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400  to-pink-600"></div>
        </div>
        <div class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40">
          <div class="blur h-56 bg-gradient"></div>
          <div class="blur h-32 bg-gradient"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="relative pt-36 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-gray-900  font-bold text-5xl md:text-6xl xl:text-7xl">
                Unleash Your Culinary{" "}
                <span className="text-rose-500">Creativity</span>
              </h1>
              <p className="mt-8 text-gray-700 ">
                Join a vibrant community of passionate food enthusiasts, where
                recipe sharing becomes a delightful ritual, sparking creativity
                and igniting a culinary renaissance. Explore new flavors,
                exchange ideas, and celebrate the joy of cooking together.
              </p>
              <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                <div className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-rose-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max cursor-pointer">
                  <span
                    onClick={scrollToBottom}
                    className=" relative flex gap-2 justify-center items-center text-base font-semibold text-white"
                  >
                    <BsSearch className=" text-white" />
                    Find Recipes
                  </span>
                </div>
                <Link
                  to={"/user/createrecipe"}
                  className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-white/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 before:border-gray-700 before:bg-gray-800 sm:w-max"
                >
                  <div className="relative flex gap-2 justify-center items-center text-base font-semibold text-white ">
                    <BsPencil className=" text-white" />
                    Create Recipe
                  </div>
                </Link>
              </div>
              <div className="hidden py-8 mt-16 border-y  border-gray-800 sm:flex justify-between">
                <div className="flex gap-2 flex-col justify-center items-center">
                  <h6 className="text-lg font-semibold text-gray-700 ">
                    The best recipes
                  </h6>

                  <GiCookingPot className=" text-3xl text-rose-600" />
                </div>
                <div className="flex gap-2 flex-col justify-center items-center">
                  <h6 className="text-lg font-semibold text-gray-700 ">
                    The most loved
                  </h6>
                  <BsFillEmojiHeartEyesFill className=" text-3xl text-rose-600" />
                </div>
                <div className="flex gap-2 flex-col justify-center items-center">
                  <h6 className="text-lg font-semibold text-gray-700 ">
                    The most searched
                  </h6>
                  <BiSearchAlt className=" text-3xl text-rose-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing