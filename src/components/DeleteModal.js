import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";

import { BiErrorCircle } from "react-icons/bi";
import { useDeleteRecipeMutation } from "../store/services/recipeService";
import { toast } from "react-hot-toast";

export default function DeleteModal({ id }) {
  const [deleteRecipe,result] = useDeleteRecipeMutation()
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Recipe Deleted Successfully");
    return
    }
    if (result.isError) {
      toast.error("Something went wrong");
      return
    }
  }, [result]);

  return (
    <>
      <button
        type="button"
        className="text-white bg-rose-500 hover:bg-rose-600 p-1 px-2 rounded-md flex gap-1"
        onClick={() => setShowModal(true)}
      >
        <AiFillDelete className="font-bold text-sm md:text-xl" />{" "}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <AiOutlineCloseCircle />
                </button>

                <div className="relative p-6 flex flex-col items-center justify-center gap-2">
                  <div className="flex flex-col items-center justify-center">
                    <BiErrorCircle className="text-5xl text-rose-500" />
                  </div>
                  <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                    Delete Recipe
                  </h3>
                  <div className="my-4 text-slate-500 text-lg leading-relaxed">
                    Are you sure you want to delete this Recipe?
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid">
                  <button
                    className="text-rose-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    data-modal-target="editUserModal"
                    data-modal-show="editUserModal"
                    className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-3 py-1 md:px-5 md:py-2.5  text-center inline-flex items-center mr-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 gap-2
                    "
                    onClick={() => {
                      deleteRecipe(id);
                      setShowModal(false);
                    }}
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
