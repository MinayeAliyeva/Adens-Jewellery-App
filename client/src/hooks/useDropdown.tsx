import { useState } from "react";

type TypeUseDropDown = () => {
  visible: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
};

export const useDropdown: TypeUseDropDown = () => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible((prev) => !prev);
  };

  const closeDropdown = () => {
    setVisible(false);
  };

  return { visible, toggleDropdown, closeDropdown };
};
