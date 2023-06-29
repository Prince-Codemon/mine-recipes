import React, { useEffect } from "react";
import { useSavedRecipesQuery } from "../store/services/recipeService";
import RecipeCard from "../components/RecipeCard";
import { toast } from "react-hot-toast";
import RHelmet from "../components/Helmet";

const SavedRecipes = () => {
  const { data, error } = useSavedRecipesQuery();
  useEffect(() => {
    if (error) {
      toast.error(error.message || "something went wrong");
      return;
    }
  }, [error]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-rose-100 py-4 ">
        <RHelmet title="Saved Recipes : Mine Recipes" />
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold">Saved Recipes</h1>
      </div>

      <div className="flex flex-wrap justify-center items-stretch gap-2">
        {data?.recipes?.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id} />
        ))}
        {data?.recipes?.length === 0 && (
          <div className="text-center">
            <h1>No Saved Recipes</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
