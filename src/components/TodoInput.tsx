import React, { useState } from "react";
import { TodoProps } from "../modules/Todo";
import { useTheme } from "../context/ThemeContext";

interface TodoInputProps {
  addTodo: (todo: TodoProps) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const { theme } = useTheme();
  const id = "id" + Math.random().toString(16).slice(2);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo({
        id: id,
        text: newTodo,
        completed: false,
      });
      setNewTodo("");
    }
  };

  return (
    <div
      className={`d-flex f-column relative ${
        theme === "light" ? "todo-input" : "todo-input-dark"
      }`}
    >
      <input
        type="text"
        placeholder="Create new todo..."
        value={newTodo}
        onChange={changeValue}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default TodoInput;
