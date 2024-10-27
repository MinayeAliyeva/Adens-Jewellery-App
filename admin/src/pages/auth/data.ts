import { Rule } from "antd/es/form";
import { TFunction } from "i18next";
import * as yup from "yup";

interface IRule {
  [key: string]: Rule[];
}

export const ruleAuth = (t:TFunction<"translation", string>) => {
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
