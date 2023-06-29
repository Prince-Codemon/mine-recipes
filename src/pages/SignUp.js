import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik ,} from "formik";
import { registerSchema } from "../schemas";
import { useRegisterMutation } from "../store/services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";
import RHelmet from "../components/Helmet";
const SignUp = () => {
  const navigate = useNavigate();
  const [register, result] = useRegisterMutation();
  const { data, error, isLoading } = result;
  const { values, handleChange, handleSubmit, errors, touched, handleBlur , setFieldError} =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmpassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: (values) => {
        if(values.password !== values.confirmpassword){
          setFieldError('confirmpassword','Password does not match')
          return;
        }
        register({
          email: values.email,
          password: values.password,
        });
      },
    });
  useEffect(() => {
    if (data) {
      toast.success("Registration Successful");
      navigate("/auth/login");
    }
    if (error?.data) {
      toast.error(error.data.msg);
    }
  }, [data, error, navigate]);

  return (
    <section className="bg-rose-100 min-h-screen flex flex-col">
      <RHelmet title="Sign Up : Mine Recipes" content={"Mine Recipes Sign Up page "} />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full "
        >
          <h2 className="mb-8 text-3xl text-center font-medium text-rose-600">
            SignUp
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
              placeholder="john@example"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
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
              required
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              autoComplete="on"
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <div className="text-red-500 text-xs italic">
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
              name="confirmpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="********"
              value={values.confirmpassword}
              onChange={handleChange}
              autoComplete="on"
              onBlur={handleBlur}
              required
            />
            {errors.confirmpassword && touched.confirmpassword ? (
              <div className="text-red-500 text-xs italic">
                {errors.confirmpassword}
              </div>
            ) : null}
          </div>
          <button
            className="w-full text-center py-3 rounded bg-rose-600 text-white hover:bg-rose-700 focus:outline-none my-1 font-regular"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Sign Up"}
          </button>
          <div className="flex justify-center">
            <Link
              to={"/auth/login"}
              className="text-xs  hover:text-rose-600  hover:underline text-gray-500 mt-3"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
