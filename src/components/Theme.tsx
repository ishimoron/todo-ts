import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

const Theme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (theme === "dark") {
    document.body.classList.add("body-dark");
  } else {
    document.body.classList.remove("body-dark");
  }

  return (
    <div className="d-flex pointer">
      {theme === "light" ? (
        <MdDarkMode
          style={{ color: "white", fontSize: "25px" }}
          onClick={() => toggleTheme()}
        />
      ) : (
        <BsFillSunFill
          style={{ color: "white", fontSize: "25px" }}
          onClick={() => toggleTheme()}
        />
      )}
    </div>
  );
};

export default Theme;
