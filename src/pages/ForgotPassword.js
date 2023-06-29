import React, { useEffect  } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForgotMutation } from "../store/services/userService";
import Spinner from '../components/Spinner'
import RHelmet from "../components/Helmet";
const ForgotPassword = () => {
  const [forgotPassword, result] = useForgotMutation();
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      forgotPassword({email:values.email});
    },
  })
  
  const { data, error, isLoading } = result;
  useEffect(() => {
    if (data) {
      toast.success(data?.msg);
    }
    if (error) {
      toast.error(error.data.msg);
    }
  }, [data, error]);



  return (
    <section className="bg-rose-100 min-h-screen flex flex-col">
      <RHelmet title="Forgot Password : Mine Recipes" />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full "
        >
          <h2 className="mb-8 text-xl text-center font-medium text-rose-600">
            Enter your registered email address
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="john@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <div className="text-red-500 italic text-xs">{errors.email}</div>
            ) : null}
          </div>

          <button
            className="w-full text-center py-3 rounded bg-rose-600 text-white hover:bg-rose-700 focus:outline-none my-1 font-regular"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Send"}
          </button>
          <div className="flex justify-center">
            <Link
              to={"/auth/login"}
              className="text-xs  hover:text-rose-600  hover:underline text-gray-500 mt-3"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
