import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TodoProps } from "../assets/modules/Todo";
import { RxCross1 } from "react-icons/rx";
import { useTheme } from "../context/ThemeContext";

interface Todos {
  todos: {
    id: string | number;
    text: string;
    completed: boolean;
  }[];
  handleTodoToggle: (id: string | number) => void;
  clearTodo: () => void;
  deleteTodo: (id: string | number) => void;
  completedTodo: TodoProps[];
  unCompleteTodo: TodoProps[];
  reorderTodos: (startIndex: number, endIndex: number) => void;
}

const DisplayTodo: React.FC<Todos> = ({
  todos,
  handleTodoToggle,
  completedTodo,
  unCompleteTodo,
  clearTodo,
  deleteTodo,
  reorderTodos,
}) => {
  const [currentTodo, setCurrentTodo] = useState(todos);
  const { theme } = useTheme();
  useEffect(() => {
    setCurrentTodo(todos);
  }, [todos]);
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="currentTodo">
        {(provided) => (
          <div
            className="display-todo"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {currentTodo.length === 0 ? (
              <p
                className={`empty ${
                  theme === "light" ? "light-text" : "dark-text"
                }`}
              >
                Empty
              </p>
            ) : (
              currentTodo.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="relative mainTodo"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <label className="container">
                        <input type="checkbox" />
                        <span
                          className="checkmark"
                          onClick={() => handleTodoToggle(todo.id)}
                        ></span>
                      </label>
                      <div
                        className={`${
                          theme === "light" ? "todos-input" : "todos-input-dark"
                        }`}
                      >
                        {todo.completed ? (
                          <span className="completed-todo">{todo.text}</span>
                        ) : (
                          todo.text
                        )}
                        <RxCross1
                          className={`pointer delete test ${
                            theme === "light" ? null : "dark-text"
                          }`}
                          onClick={() => deleteTodo(todo.id)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
            <div
              className={`space-between ${
                theme === "light"
                  ? "todo-input-bottom"
                  : "todo-input-bottom-dark"
              }`}
            >
              <div className="">{unCompleteTodo.length} items left</div>
              <div className="pointer" onClick={() => clearTodo()}>
                Clear completed
              </div>
            </div>
            <div
              className={`mt-5 ${
                theme === "light"
                  ? "todo-input-bottom"
                  : "todo-input-bottom-dark"
              }`}
            >
              <div className="mobile-hide">
                {unCompleteTodo.length} items left
              </div>
              <div className="d-flex inner-btn">
                <p
                  className="pointer"
                  onClick={() =>
                    setCurrentTodo([...completedTodo, ...unCompleteTodo])
                  }
                >
                  All
                </p>
                <p
                  className="pointer"
                  onClick={() => setCurrentTodo(unCompleteTodo)}
                >
                  Active
                </p>
                <p
                  className="pointer"
                  onClick={() => setCurrentTodo(completedTodo)}
                >
                  Completed
                </p>
              </div>
              <div className="pointer mobile-hide" onClick={() => clearTodo()}>
                Clear completed
              </div>
            </div>
            <span className="drag-text">Drag and drop to reorder list</span>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DisplayTodo;
