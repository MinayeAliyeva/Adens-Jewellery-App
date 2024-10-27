import { TFunction } from "i18next";

export const columns = ({t}: {t: TFunction<"translation", string>}) => ([
  { title: t("First Name"), dataIndex: "firstName", key: "firstName" },
  { title: t("Last Name"), dataIndex: "lastName", key: "lastName" },
  { title: t("Phone"), dataIndex: "phone", key: "phone" },
  { title: t("Email"), dataIndex: "email", key: "email" },
]);