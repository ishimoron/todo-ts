import React from "react";
import Todo from "./components/Todo";

import "./App.css";
import "./normalize.css";
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Todo />
    </ThemeProvider>
  );
};

export default App;
