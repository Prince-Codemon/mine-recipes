import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const recipeApi = createApi({
  reducerPath: "recipeApi",
  tagTypes: ["Recipe","likes", "saved"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_HOST}/api`,
    prepareHeaders: (headers, { getState }) => {
     
      const token = getState().user.token;
      headers.set("API-KEY", process.env.REACT_APP_API_KEY);
      
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => ({
        url: "/recipes",
        method: "GET",
      }),
      providesTags: ["Recipe", "likes"],
    }),
    getRecipe: builder.query({
      query: (id) => ({
        url: `/recipe/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Recipe", "likes", "saved"],
      
    }),
    getUserRecipes: builder.query({
      query: (id) => ({
        url: `/userrecipes/${id}`,
        method: "GET",
      }),
      providesTags: ["Recipe"],
    }),
    createRecipe: builder.mutation({
      query: (body) => ({
        url: "/user/createrecipe",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Recipe"],
    }),
    updateRecipe: builder.mutation({
      query: (body) => ({
        url: `/user/updateRecipe`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Recipe"],
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `/user/deleterecipe/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),
    likeRecipe: builder.mutation({
      query: (id) => ({
        url: `/user/likerecipe/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["likes"],
    }),
    saveRecipe: builder.mutation({
      query: (id) => ({
        url: `/user/saverecipe/${id}`,
        method: "PUT",

      }),
      invalidatesTags: ["saved"],
    }),
    savedRecipes: builder.query({
      query: () => ({
        url: `/user/saved/recipes`,
        method: "GET",
      }),
      providesTags: ["saved"],
    }),
    updateViews: builder.query({
      query: (id) => ({
        url: `/updateview/${id}`,
        method: "GET",
      }),
       
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeQuery,
  useGetUserRecipesQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useLikeRecipeMutation,
  useSaveRecipeMutation,
  useLazySavedRecipesQuery,
  useSavedRecipesQuery,
  useUpdateViewsQuery
  
} = recipeApi;

export default recipeApi;
