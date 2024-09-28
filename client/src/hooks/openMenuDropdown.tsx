import { useState } from "react";

const useDropdown = () => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible((prev) => !prev);
  };

  const closeDropdown = () => {
    setVisible(false);
  };

  return { visible, toggleDropdown, closeDropdown };
};

export default useDropdown;
