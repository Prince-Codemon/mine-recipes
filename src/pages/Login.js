import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { useLoginMutation } from "../store/services/userService";
import { toast } from "react-hot-toast";
import Spinner from '../components/Spinner'
import { loginUser } from "../store/slice/userSlice";
import { useDispatch } from "react-redux";
import RHelmet from "../components/Helmet";
const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, result] = useLoginMutation();
  const { data, error, isLoading } = result;
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login({
        email: values.email,
        password: values.password,
      });
    },
    validationSchema: loginSchema,
  });
 
  useEffect(() => {
    if (data) {
      toast.success("Login Successful");
      navigate("/");
      localStorage.setItem("[3{]df23}]", JSON.stringify(data.token));
      dispatch(loginUser(data))
    }
    if (error?.data) {
       toast.error(error.data.msg);
    }
  }, [data, error, navigate, dispatch]);


  return (
    <section className=" bg-rose-100 min-h-screen flex flex-col">
      <RHelmet title="Login : Mine Recipes" />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full "
        >
          <h2 className="mb-8 text-3xl text-center font-medium text-rose-600">
            Login
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
              <div className="text-red-500 text-xs italic">{errors.email}</div>
            ) : null}
          </div>
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
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="on"
            />
            {touched.password && errors.password ? (
              <div className="text-red-500 text-xs italic">
                {errors.password}
              </div>
            ) : null}
          </div>
          <button
            className="w-full text-center py-3 rounded bg-rose-600 text-white hover:bg-rose-700 focus:outline-none my-1 font-regular"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Login"}
          </button>
          <div className="flex justify-between items-center">
            <Link
              to={"/auth/signup"}
              className="text-xs text-gray-500  hover text-grey-dark mt-3 hover:text-rose-600  hover:underline font-regular"
            >
              Don't have an account?
            </Link>
            <Link
              to={"/auth/forgotpassword"}
              className="text-xs  hover:text-rose-600  hover:underline text-gray-500 mt-3"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
