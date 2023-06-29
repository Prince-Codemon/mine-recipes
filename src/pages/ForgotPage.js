import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../store/services/userService";

import jwtDecode from "jwt-decode";
import { forgotSchema } from "../schemas";
import Spinner from "../components/Spinner";
import RHelmet from "../components/Helmet";
const ForgortPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    toast.error("Link Expired");
    navigate("/auth/login");
  }
  const [resetPassword, result] = useResetPasswordMutation();
  const { data, error, isLoading } = result;

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        cpassword: "",
      },
      validationSchema: forgotSchema,
      onSubmit: (values) => {
        resetPassword({ password: values.password, id: decoded.id });
      },
    });
  useEffect(() => {
    if (data) {
      toast.success(data?.msg);
      navigate("/auth/login");
    }
    if (error) {
      toast.error(error.data.msg);
    }
  }, [data, error, navigate]);

  return (
    <section className="bg-rose-100 min-h-screen flex flex-col">
      <RHelmet title="Reset Password : Mine Recipes" />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full "
        >
          {" "}
          <h2 className="mb-8 text-3xl text-center font-medium text-rose-600">
            Reset Password
          </h2>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
              placeholder="***********"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? (
              <div className="text-red-500 italic text-xs">
                {errors.password}
              </div>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
              placeholder="***********"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.cpassword && errors.cpassword ? (
              <div className="text-red-500 italic text-xs">
                {errors.cpassword}
              </div>
            ) : null}
          </div>
          <button
            className="w-full text-center py-3 rounded bg-rose-600 text-white hover:bg-rose-700 focus:outline-none my-1 font-regular"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgortPage;
