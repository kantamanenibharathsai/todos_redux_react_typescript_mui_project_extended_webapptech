import React from "react";
import { Box } from "@mui/material";
import todoItemStyles from "./TodoItem.Styles";
import EditOffIcon from "@mui/icons-material/EditOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { updateTodo, deleteTodo } from "../../redux/TodoSlice";

interface TodoObject {
  todoId: number;
  taskName: string;
  isTaskCompleted: boolean;
}

interface IProps {
  eachTodo: TodoObject;
  // updateTodoHandler: (checkBoxId: string, isTicked: boolean) => void;
  saveEditedTodoEventHandler: (
    todoId: number,
    editedTodoTaskName: string
  ) => void;
}

const TodoItem: React.FC<IProps> = ({
  eachTodo,
  // updateTodoHandler,
  saveEditedTodoEventHandler,
}) => {
  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos);

  const updateTodoHandler = (checkboxId: string, isTicked: boolean) => {
    dispatch(updateTodo({ checkboxId, isTicked }));
  };

  const editTodoEventHandler = (
    todoId: number,
    editingTodoTaskName: string
  ) => {
    saveEditedTodoEventHandler(todoId, editingTodoTaskName);
  };

  const deleteTodoHandler = (todoId: number) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <Box sx={todoItemStyles.todoItemContainer}>
      <Box
        type="checkbox"
        component="input"
        sx={todoItemStyles.checkBox}
        id={`checkboxId${eachTodo.todoId}`}
        checked={eachTodo.isTaskCompleted}
        onChange={(e) => updateTodoHandler(e.target.id, e.target.checked)}
      />
      <Box sx={todoItemStyles.labelContainer}>
        <Box
          component="label"
          sx={{
            ...todoItemStyles.checkboxLabel,
            textDecoration: eachTodo.isTaskCompleted ? "line-through" : "none",
          }}
          htmlFor={`checkboxId${eachTodo.todoId}`}
        >
          {eachTodo.taskName}
        </Box>
        <Box sx={todoItemStyles.deleteIconContainer}>
          <EditOffIcon
            sx={todoItemStyles.icon}
            onClick={() =>
              editTodoEventHandler(eachTodo.todoId, eachTodo.taskName)
            }
          />
          <DeleteIcon
            sx={todoItemStyles.icon}
            onClick={() => deleteTodoHandler(eachTodo.todoId)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TodoItem;
