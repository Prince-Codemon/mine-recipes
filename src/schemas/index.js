import * as Yup from "yup";
export const registerSchema = Yup.object({
  email: Yup.string().email("Invalid email").trim().required("Required"),
  password: Yup.string()
    .min(8, "Password Should be 8 char long")
    .matches(
      /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmpassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").trim().required("Required"),
    password: Yup.string().trim().required("Required"),
    });

export const recipeSchema = Yup.object({
  title:Yup.string().trim().min(12,"Title is too short - should be 12 chars minimum.").max(100,"Title is too long - should be 100 chars maximum").required("Required"),
  desc : Yup.string().trim().min(50,"Description is too short - should be 50 chars minimum.").max(200,"Description is too long - should be 200 chars maximum").required("Required"),
  category: Yup.string().trim().required("Required"),
  ingredients: Yup.array().of(Yup.string().trim().min(3,"Ingredient is too short - should be 3 chars minimum").max(20,"Ingredient is too long - should be 20 chars maximum").required("Required")).min(3,"At least 3 ingredients").max(20,"At most 20 ingredients").required("Required"),
  avgCookingTime:Yup.number().required("Required"),
});

export const forgotSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password Should be 8 char long")
    .matches(
      /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  cpassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

