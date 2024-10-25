import { Rule } from "antd/es/form";
import i18next from "i18next";
import * as yup from "yup";
interface IRule {
  [key: string]: Rule[];
}

export const rule: IRule = {
  passwordRules: [
    { required: true, message: i18next.t("Enter email" )},
    {
      min: 6,
      message: "Parola en az 6 karakter olmalıdır!",
    },
    {
      pattern: /[A-Z]/,
      message: "Parola en az bir büyük harf içermelidir!",
    },
    {
      pattern: /[a-z]/,
      message: "Parola en az bir küçük harf içermelidir!",
    },
    {
      pattern: /\d/,
      message: "Parola en az bir rakam içermelidir!",
    },
    {
      pattern: /[!@#$%^&*(),.?":{}|<>]/,
      message: "Parola en az bir özel karakter içermelidir!",
    },
  ],
  emailRules: [
    {
      required: true,
      message: "Kullanıcı email girin!",
    },
    {
      type: "email",
      message: i18next.t("invalid email address"),
    },
  ],
};

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz!")
    .required("Email zorunludur!"),
  password: yup
    .string()
    .min(6, "Parola en az 6 karakter olmalıdır!")
    .matches(/[A-Z]/, "Parola en az bir büyük harf içermelidir!")
    .matches(/[a-z]/, "Parola en az bir küçük harf içermelidir!")
    .matches(/\d/, "Parola en az bir rakam içermelidir!")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Parola en az bir özel karakter içermelidir!"
    )
    .required("Parola zorunludur!"),
});
