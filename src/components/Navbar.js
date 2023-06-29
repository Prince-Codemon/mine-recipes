import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/userSlice";

const Navbar = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="bg-white shadow-lg fadeInTop">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                {/* <!-- Website Logo --> */}
                <Link
                  to={"/"}
                  className="flex items-center py-4 px-2 font-bold"
                >
                  Mine <span className="text-rose-500">Recipes</span>
                </Link>
              </div>
            </div>
            {/* <!-- Secondary Navbar items --> */}
            <div className="hidden md:flex items-center space-x-5 ">
              <NavLink
                to={"/"}
                className="py-4 px-2 text-base font-regular primary-color"
              >
                Home
              </NavLink>
              {token && (
                <>
                  <NavLink
                    to={"/user/profile"}
                    className="py-4 px-2 text-base font-regular primary-color"
                  >
                    Profile
                  </NavLink>{" "}
                  <NavLink
                    to={"/user/savedrecipes"}
                    className="py-4 px-2 text-base font-regular primary-color"
                  >
                    Saved
                  </NavLink>{" "}
                  <div>
                    <button
                      onClick={() => dispatch(logout())}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-base font-regular py-2 px-4 rounded"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
              {!token && (
                <>
                  <NavLink
                    to={"/auth/login"}
                    className="py-2 px-2 text-base font-regular primary-color"
                  >
                    Log In
                  </NavLink>
                  <NavLink to={"/auth/signup"}>
                    <button className="bg-rose-600 hover:bg-rose-700 text-white text-base font-regular py-2 px-4 rounded">
                      Sign Up
                    </button>
                  </NavLink>{" "}
                </>
              )}
            </div>
            {/* <!-- Mobile menu button --> */}
            <div className="md:hidden flex items-center">
              <button
                className="outline-none mobile-menu-button"
                onClick={toggleOpen}
              >
                <svg
                  className=" w-6 h-6 text-gray-500 hover:text-rose-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* <!-- mobile menu --> */}
        {isOpen && (
          <div className="md:hidden flex justify-end py-2 ">
            <ul className=" flex gap-2 items-center flex-col mr-4">
              <li>
                <NavLink
                  to={"/"}
                  onClick={toggleOpen}
                  className="block text-sm hover:text-rose-500  transition
                duration-300 font-regular"
                >
                  Home
                </NavLink>
              </li>
              {token && (
                <>
                  <li>
                    <NavLink
                      onClick={toggleOpen}
                      to={"/user/profile"}
                      className="block text-sm hover:text-rose-500 transition 
                duration-300 font-regular"
                    >
                      {" "}
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/user/savedrecipes"}
                      className="block text-sm hover:text-rose-500 transition 
                duration-300 font-regular"
                      onClick={toggleOpen}
                    >
                      {" "}
                      Saved
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={() => dispatch(logout())}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-regular py-1 px-2 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

              {!token && (
                <>
                  <li>
                    <NavLink
                      to={"/auth/login"}
                      onClick={toggleOpen}
                      className="block  hover:text-rose-500 transition duration-300 text-sm   font-regular"
                    >
                      Log In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/auth/signup"}
                      onClick={toggleOpen}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-regular py-1 px-2 rounded"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>

   
  );
};

export default Navbar;
