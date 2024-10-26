// import { Rule } from "antd/es/form";
// import i18next from "i18next";
// import * as yup from "yup";

// interface IRule {
//   [key: string]: Rule[];
// }

// export const rule: IRule = {
//   passwordRules: [
//     { required: true, message: i18next.t("Enter password") },
//     {
//       min: 6,
//       message: i18next.t("Password must be at least 6 characters!"),
//     },
//     {
//       pattern: /[A-Z]/,
//       message: i18next.t(
//         "Password must contain at least one uppercase letter!"
//       ),
//     },
//     {
//       pattern: /[a-z]/,
//       message: i18next.t("Password must contain at least one lowercase letter!"),
//     },
//     {
//       pattern: /\d/,
//       message:  i18next.t("Password must contain at least one digit!"),
//     },
//     {
//       pattern: /[!@#$%^&*(),.?":{}|<>]/,
//       message: i18next.t("Password must contain at least one special character!"),
//     },
//   ],
//   emailRules: [
//     {
//       required: true,
//       message: i18next.t("Please enter your email!"),
//     },
//     {
//       type: "email",
//       message: i18next.t("Invalid email address"),
//     },
//   ],
// };

// export const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email( i18next.t("Please enter a valid email address!"))
//     .required( i18next.t("Email is required!")),
//   password: yup
//     .string()
//     .min(6,  i18next.t("Password must be at least 6 characters!"))
//     .matches(/[A-Z]/,  i18next.t("Password must contain at least one uppercase letter!"))
//     .matches(/[a-z]/,  i18next.t("Password must contain at least one lowercase letter!"))
//     .matches(/\d/,  i18next.t("Password must contain at least one digit!"))
//     .matches(
//       /[!@#$%^&*(),.?":{}|<>]/,
//        i18next.t("Password must contain at least one special character!")
//     )
//     .required( i18next.t("Password is required!")),
// });
import { Rule } from "antd/es/form";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

interface IRule {
  [key: string]: Rule[];
}

export const useRules = () => {
  const { t } = useTranslation();

  const rule: IRule = {
    passwordRules: [
      { required: true, message: t("Enter password") },
      {
        min: 6,
        message: t("Password must be at least 6 characters!"),
      },
      {
        pattern: /[A-Z]/,
        message: t("Password must contain at least one uppercase letter!"),
      },
      {
        pattern: /[a-z]/,
        message: t("Password must contain at least one lowercase letter!"),
      },
      {
        pattern: /\d/,
        message: t("Password must contain at least one digit!"),
      },
      {
        pattern: /[!@#$%^&*(),.?\":{}|<>]/,
        message: t("Password must contain at least one special character!"),
      },
    ],
    emailRules: [
      {
        required: true,
        message: t("Please enter your email!"),
      },
      {
        type: "email",
        message: t("Invalid email address"),
      },
    ],
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("Please enter a valid email address!"))
      .required(t("Email is required!")),
    password: yup
      .string()
      .min(6, t("Password must be at least 6 characters!"))
      .matches(
        /[A-Z]/,
        t("Password must contain at least one uppercase letter!")
      )
      .matches(
        /[a-z]/,
        t("Password must contain at least one lowercase letter!")
      )
      .matches(/\d/, t("Password must contain at least one digit!"))
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        t("Password must contain at least one special character!")
      )
      .required(t("Password is required!")),
  });

  return { rule, schema };
};
