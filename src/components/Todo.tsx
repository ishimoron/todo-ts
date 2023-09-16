import React, { useState, useEffect } from "react";

import Theme from "./Theme";
import TodoInput from "./TodoInput";
import dayImg from "../assets/img/bg-desktop-light.jpg";
import nightImg from "../assets/img/bg-desktop-dark.jpg";
import dayMobileImg from "../assets/img/bg-mobile-light.jpg";
import nightMobileImg from "../assets/img/bg-mobile-dark.jpg";
import DisplayTodo from "./DisplayTodo";
import { TodoProps } from "../assets/modules/Todo";
import { useTheme } from "../context/ThemeContext";

interface Todo {
  addTodo: (todo: string) => void;
}

const Todo: React.FC<Todo> = () => {
  const [todos, setTodos] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);
  const [completedTodo, setCompletedTodo] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);
  const [unCompleteTodo, setUnCompleteTodo] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);

  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const addTodo = (todo: TodoProps) => {
    if (todo.text.trim() !== "") {
      setTodos((prevTodos) => [...prevTodos, todo]);
    }
  };

  const handleTodoToggle = (id: number | string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearTodo = () => {
    setTodos(unCompleteTodo);
  };

  const deleteTodo = (todoId: number | string) => {
    setTodos((prev) => prev.filter(({ id }) => id !== todoId));
  };

  const reorderTodos = (startIndex: number, endIndex: number) => {
    const updatedTodos = [...todos];
    const [movedTodo] = updatedTodos.splice(startIndex, 1);
    updatedTodos.splice(endIndex, 0, movedTodo);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed);
    setCompletedTodo(completedTodos);
    const unCompleteTodo = todos.filter((todo) => todo.completed === false);
    setUnCompleteTodo(unCompleteTodo);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [todos]);

  const backgroundImageSrc =
    windowWidth <= 540
      ? theme === "light"
        ? dayMobileImg
        : nightMobileImg
      : theme === "light"
      ? dayImg
      : nightImg;

  return (
    <div className="relative">
      <div>
        <img
          src={backgroundImageSrc}
          alt="header"
          className="w-100 inner-img"
        />
        <div className="todo-position">
          <div className="todo-mobile">
            <div className="w-100">
              <div className="theme">
                <h1>TODO</h1>
                <Theme />
              </div>
              <div>
                <TodoInput addTodo={addTodo} />
              </div>
              <div>
                <DisplayTodo
                  todos={todos}
                  handleTodoToggle={handleTodoToggle}
                  unCompleteTodo={unCompleteTodo}
                  completedTodo={completedTodo}
                  clearTodo={clearTodo}
                  deleteTodo={deleteTodo}
                  reorderTodos={reorderTodos}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
