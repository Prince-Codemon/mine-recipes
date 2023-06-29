import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    

    <footer className=" rounded-lg shadow m-4 bg-rose-600">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm  sm:text-center text-white">
          © 2023{" "}
          <Link to={"/"} className="hover:underline">
            MineRecipe™
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium  text-white sm:mt-0">
          <li>
            <Link to={"/auth/login"} className="mr-4 hover:underline md:mr-6 ">
              Login
            </Link>
          </li>
          <li>
            <Link to={"/user/profile"} className="mr-4 hover:underline md:mr-6">
              Profile
            </Link>
          </li>
          <li>
            <Link to={"/faq"} className="mr-4 hover:underline md:mr-6">
              FAQ
            </Link>
          </li>
          <li>
            <a
              className="mr-4 hover:underline md:mr-6"
              href="https://www.princecodemon.live"
              target={"_blank"}
              rel="noreferrer"
            >
              Founder
            </a>
          </li>
          <li>
            <a
              className="mr-4 hover:underline md:mr-6"
              href="https://github.com/Prince-Codemon"
              target={"_blank"}
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
