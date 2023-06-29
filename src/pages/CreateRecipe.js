import React, { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import { recipeSchema } from "../schemas";
import { useCreateRecipeMutation } from "../store/services/recipeService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";
import RHelmet from "../components/Helmet";
import Editor from "../components/Editor";
import { HiPlus, HiX } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import cookingTime from "../utils/time";
import {
  AiOutlineEye,
  AiOutlineFieldTime,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
const CreateRecipe = () => {
  const [content, setContent] = useState("");
  const [preImg, setPreImg] = useState("");
  const [image, setImage] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [create, result] = useCreateRecipeMutation();
  const { data, error, isLoading } = result;
  const categories = [
    "American",
    "Indian",
    "French",
    "Chinese",
    "Japanese",
    "Italian",
    "Spanish",
    "Greek",
    "Mediterranean",
    "Lebanese",
    "Moroccan",
    "Turkish",
    "Thai",
    "Cajun",
    "Mexican",
    "Caribbean",
    "German",
    "Russian",
    "Hungarian",
    "Vegetarian/Vegan",
    "Gluten-Free",
    "Paleo",
    "Low-Carb/Keto",
    "Dairy-Free",
    "Quick and Easy",
    "Desserts and Sweets",
    "Beverages",
    "International",
    "Seasonal or Holiday Recipes",
  ];
  const createRecipe = async () => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("desc", values.desc);
    formData.append("category", values.category);
    formData.append("content", content);
    formData.append("ingredients", JSON.stringify(values.ingredients));
    formData.append("avgCookingTime", values.avgCookingTime);
    formData.append("image", image);
    create(formData);
  };
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      desc: "",
      ingredients: [],
      category: "",
      avgCookingTime: 0,
    },
    validationSchema: recipeSchema,
    onSubmit: (values) => {
      if (!content) {
        return toast.error("Directions is Required");
      }
      if (!image) {
        return toast.error("Image is Required");
      }
      if (!values.ingredients.length) {
        return toast.error("Ingredients is Required");
      }
      if (!values.title) {
        return toast.error("Title is Required");
      }
      if (content.length < 200) {
        return toast.error("Directions is too short, min 200 char");
      }

      createRecipe();
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      toast.success("Recipe Created Successfully");
      navigate("/user/profile");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.msg);
    }
  }, [error]);

  useEffect(() => {
    const fileReader = async () => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setPreImg(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    };
    image && fileReader();
  }, [image]);

  const addIngredients = () => {
    const finded = values.ingredients.find(
      (ingredientT) => ingredientT === ingredient
    );
    if (finded) {
      toast.error("Ingredient Already Added");
      setIngredient("");
      return;
    }
    if (!ingredient) {
      toast.error("Ingredient is Required");
      return;
    }
    if (ingredient.length < 3) {
      toast.error("Ingredient is too short, min 3 char");
      return;
    }
    if (ingredient.length > 20) {
      toast.error("Ingredient is too long, max 20 char");
      return;
    }

    setFieldValue("ingredients", [...values.ingredients, ingredient]);
    setIngredient("");
  };
  const deleteIngredient = (name) => {
    setFieldValue(
      "ingredients",
      values.ingredients.filter((ingredient) => ingredient !== name)
    );
    return;
  };

  return (
    <section className="flex  items-center justify-center bg-rose-100 py-10 px-2 ">
      <RHelmet title="Create Recipe" />
      <div className="flex max-w-3xl  w-full  flex-col items-center justify-center md:mx-24  ">
        <h1 className="text-base bg-rose-500 p-2 w-full rounded text-white text-center mb-2">
          Write your recipe
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-center w-full"
        >
          <div className="relative mb-4  w-full">
            <label htmlFor="photo" className="leading-7 text-sm text-gray-600">
              Upload photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="w-full border border-gray-300 bg-white   text-sm outline-none leading-8 transition-colors duration-200 ease-in-out placeholder-gray-400 text-gray-400 py-2 px-3 rounded-md"
              accept=".png, .jpg, .jpeg"
              required
              onChange={(e) => {
                const type = e.target.files[0].type;
                if (
                  type !== "image/png" &&
                  type !== "image/jpg" &&
                  type !== "image/jpeg"
                ) {
                  toast.error("Only .png, .jpg, .jpeg files are allowed");
                  return;
                } else if (e.target.files[0].size > 1024 * 1024 * 5) {
                  toast.error("Image size should be less than 5MB");
                  return;
                } else {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="relative mb-4  w-full">
            <label htmlFor="title" className="leading-7 text-sm text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="My Recipe Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title && (
              <p className="text-red-500 text-xs">{errors.title}</p>
            )}
          </div>
          <div className="relative mb-4  w-full">
            <label
              htmlFor="avgCookingTime"
              className="leading-7 text-sm text-gray-600"
            >
              Avg Cooking Time{" "}
              <span className="text-sm text-rose-500">(in minutes)</span>
            </label>
            <input
              type="number"
              id="avgCookingTime"
              name="avgCookingTime"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none"
              placeholder="Avg Cooking Time"
              value={values.avgCookingTime}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.avgCookingTime && touched.avgCookingTime && (
              <p className="text-red-500 text-xs">{errors.avgCookingTime}</p>
            )}
          </div>
          <div className="relative mb-4  w-full">
            <label htmlFor="desc" className="leading-7 text-sm text-gray-600">
              Description
            </label>
            <textarea
              type="text"
              id="desc"
              name="desc"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none"
              placeholder="Meta Description"
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.desc && touched.desc && (
              <p className="text-red-500 text-xs">{errors.desc}</p>
            )}
          </div>
          <div className="relative mb-4  w-full">
            <label
              htmlFor="ingredients"
              className="leading-7 text-sm text-gray-600"
            >
              Ingredients
            </label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 !pr-10 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="My Recipe ingredients"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onBlur={handleBlur}
            />
            <button
              onClick={addIngredients}
              type="button"
              className="grid place-items-center absolute  rounded-lg p-2 text-white top-[2.1rem] right-2 bg-rose-500 hover:bg-rose-600 aspect-square"
            >
              <HiPlus />
            </button>

            {errors.ingredients && touched.ingredients && (
              <p className="text-red-500 text-xs">{errors.ingredients}</p>
            )}
          </div>
          <div className="mb-1 w-full flex flex-wrap justify-start items-center gap-2">
            {values.ingredients?.map((item, i) => (
              <div
                key={i}
                className="p-1 px-2 rounded-md bg-rose-500 text-white flex gap-1 justify-center items-center"
              >
                {item}

                <button
                  onClick={() => deleteIngredient(item)}
                  type="button"
                  className="flex justify-center items-center font-bold text-lg "
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
          <div className="relative mb-4  w-full">
            <label
              htmlFor="category"
              className="leading-7 text-sm text-gray-600"
            >
              Category
            </label>
            <select
              type="text"
              id="category"
              name="category"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Select Category"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories?.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && touched.category && (
              <p className="text-red-500 text-xs">{errors.category}</p>
            )}
          </div>
          <div className="relative mb-4  w-full">
            <label
              htmlFor="content"
              className="leading-7 text-sm text-gray-600"
            >
              Directions
            </label>
            <Editor
              content={content}
              setContent={setContent}
              readOnly={false}
            />
            {errors.content && touched.content && (
              <p className="text-red-500 text-xs">{errors.content}</p>
            )}
          </div>
          <div className="flex w-full flex-row-reverse justify-between items-center">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                setShowPreview(true);
              }}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-rose-700 bg-white border-2 border-rose-600 rounded disabled:border-transparent  hover:bg-rose-600 hover:text-white focus:ring-4 focus:outline-none  "
            >
              Preview
            </button>
            <button
              type="submit"
              className="text-white bg-rose-500 border-0 py-2 px-6 focus:outline-none hover:bg-rose-600 rounded text-base"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {showPreview && (
        <dialog className=" absolute top-0 left-0 min-h-screen w-full h-full bg-gray-700 bg-opacity-40 container mx-auto flex flex-col  py-10 justify-center items-center">
          <div className="flex lg:min-w-[800px] w-full flex-col md:flex-row md:w-2/3 bg-white md:min-w-[600px] justify-center items-center  gap-5  rounded-md shadow-sm  p-2 mb-2">
            <button
              onClick={() => setShowPreview(false)}
              type="button"
              className="grid place-items-center absolute top-5 rounded-lg p-2 text-white  right-5 bg-rose-500 hover:bg-rose-600 aspect-square"
            >
              <HiX />
            </button>

            <div
              className="relative  w-full max-w-md md:aspect-square aspect-video flex justify-center items-center
            "
            >
              <button
                onClick={() => setShowPreview(false)}
                type="button"
                className="grid place-items-center absolute top-[20px] left-0  rounded-sm px-2 text-white   bg-rose-500 hover:bg-rose-600 "
              >
                Close
              </button>
              <img
                className=" w-full object-cover object-center rounded md:aspect-square aspect-video"
                alt={values.title}
                src={preImg || "/logo.png"}
                loading="lazy"
              />
            </div>

            <div className="w-full flex justify-start items-start flex-col">
              <div className=" border-rose-600 border-[1px] rounded-md shadow-sm text-white bg-rose-600 px-3 py-1 text-base md:text-xl mb-2">
                {values.category || "Selected Category"}
              </div>
              <h1 className="title-font text-xl md:text-3xl mb-4 font-medium text-gray-900 capitalize">
                {values.title || "Title"}
              </h1>
              <div className="flex justify-start items-start gap-2 flex-wrap  w-full text-gray-700">
                {values.ingredients?.map((ingredient, i) => (
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
                    {cookingTime(values.avgCookingTime) || "0"}
                  </span>
                </div>
                <div className="flex items-center border-rose-500 border-[1px] rounded-md shadow-sm bg-white text-rose-500 px-2">
                  <AiOutlineEye className="w-7 h-7 " />
                  <span className="ml-1 text-sm">0</span>
                </div>
              </div>
              <div className="flex justify-between mb-4 w-full text-gray-700">
                <div className="flex items-center text-gray-700">
                  <AiOutlineHeart
                    size={28}
                    className=" cursor-pointer hover:text-rose-500"
                  />

                  <span className="ml-1 text-sm">0</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <BsBookmark
                    size={28}
                    className=" cursor-pointer hover:text-rose-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <WhatsappIcon size={28} />
                <TwitterIcon size={28} />
                <FacebookIcon size={28} />
                <LinkedinIcon size={28} />
                <TelegramIcon size={28} />
              </div>
              <div className="flex justify-between items-end w-full">
                {/* {creator && (
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
                )} */}
                {/* <h1 className="text-sm text-rose-500 tracking-widest font-medium title-font mb-1">
                  {formatDate(createdAt)}
                </h1> */}
              </div>
            </div>
          </div>

          <div className="w-full lg:min-w-[800px] bg-white md:min-w-[600px] p-2 rounded-md md:w-2/3 flex flex-col mb-16 recipe ">
            <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 capitalize">
              Directions
            </h2>
            <Editor content={content} readOnly={true} />
          </div>
        </dialog>
      )}
    </section>
  );
};

export default CreateRecipe;
