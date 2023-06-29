import React, { useEffect, useState } from "react";
import BlogSkelton from "../components/BlogSkelton";
import RHelmet from "../components/Helmet";
import { useGetRecipesQuery } from "../store/services/recipeService";
import RecipeCard from "../components/RecipeCard";
import Landing from "../components/Landing";
const Recipes = () => {
  const { data, isLoading } = useGetRecipesQuery();
  const [recipes, setRecipes] = useState([]);
  const sortRecipes = (e) => {
    const value = e.target.value;
    if (value === "popular") {
      const sorted = [...recipes].sort((a, b) => b.views - a.views);
      setRecipes(sorted);
    }
    if (value === "latest") {
      const sorted = [...recipes].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecipes(sorted);
    }
    if (value === "loved") {
      const sorted = [...recipes].sort(
        (a, b) =>
          b.likes.length - a.likes.length
      );
      setRecipes(sorted);
    }
  };
  useEffect(() => {
    if (data?.recipes) {
      setRecipes(data.recipes);
    }
  }, [data]);
  const searchFilter = (e) => {
    const value = e.target.value;
    if (value) {
      const filtered = data?.recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(value.toLowerCase()) ||
          recipe.category.toLowerCase().includes(value.toLowerCase()) ||
          recipe?.ingredients?.some((ingredient) =>
            ingredient.toLowerCase().includes(value.toLowerCase())
          )
      );
      setRecipes(filtered);
    } else {
      setRecipes(data?.recipes);
    }
  };

  return (
    <>
      <RHelmet
        title={"Mine Recipes : Find Recipes"}
        content={
          "Mine Recipes: Find Recipes is a user-friendly website designed to make discovering and exploring new recipes a delightful experience. With an extensive collection of culinary creations from around the world, Mine Recipes offers a one-stop destination for food enthusiasts to explore, experiment, and satisfy their gastronomic cravings."
        }
      />
      <Landing/>

      <section className="text-white-600 body-font">
        <div className="container px-5 py-24 pt-10 mx-auto">
          <div className="flex items-start md:items-center gap-2 md:gap-0 md:mx-5 justify-between py-4 bg-rose-500 shadow-sm p-2  flex-col md:flex-row">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-rose-600"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-white-900 border border-gray-300 rounded-lg w-full md:w-80 bg-rose-50  text-rose-500 focus:outline-none focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-rose-600 focus:border-transparent "
                placeholder="Search by title, ingredients, category"
                onChange={searchFilter}
              />
            </div>

            <div className="relative ml-4 w-3/4 flex items-center justify-start md:justify-end ">
              <label
                htmlFor="category"
                className="leading-7 text-sm text-white mr-2 text-left font-bold"
              >
                Sort By
              </label>
              <select
                type="text"
                id="category"
                name="category"
                className=" bg-white  rounded border border-gray-300 focus:border-white focus:ring-2 focus:ring-white text-base outline-none text-rose-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={sortRecipes}
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="loved">Loved</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -m-4 pt-2 items-stretch justify-center ">
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <BlogSkelton key={i} />)
              : recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe._id} />)}
            {data?.recipes && !recipes.length && (
              <h1 className="text-2xl w-full pt-10 text-center text-white-500 dark:text-white-400">
                No Recipes Found
              </h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Recipes;
