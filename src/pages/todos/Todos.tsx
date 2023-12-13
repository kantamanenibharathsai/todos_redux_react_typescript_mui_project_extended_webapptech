import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import todoStyles from "./Todos.Styles";
import TodoItem from "../../components/todo_item/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { addTodo, updateEditedTodo } from "../../redux/TodoSlice";

interface TodoObject {
  todoId: number;
  taskName: string;
  isTaskCompleted: boolean;
}

interface IState {
  enteredTaskName: string;
  todosList: TodoObject[];
  errorMsg: string;
  todosCount: number;
  editedArray: [boolean, null | number];
}

const Todo = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos);

  const [enteredTaskName, setEnteredTaskName] =
    useState<IState["enteredTaskName"]>("");
  const [errorMsg, setErrorMsg] = useState<IState["errorMsg"]>("");
  const [editedArray, setEditedArray] = useState<IState["editedArray"]>([
    false,
    null,
  ]);

  const checkIsTaskAlreadyPresentOrNot = () => {
    let istaskPresent: boolean = false;
    todos.todosList.forEach((eachTodo: TodoObject) => {
      if (eachTodo.taskName.toLowerCase() === enteredTaskName.toLowerCase()) {
        istaskPresent = true;
      }
    });
    return istaskPresent;
  };

  const errorHandlingFunction = (errorMessage: string) => {
    setErrorMsg(`*${errorMessage}`);
  };

  const addTodoHandler = () => {
    switch (true) {
      case todos.todosList.length === 0 && enteredTaskName.trim().length === 0:
        errorHandlingFunction("Please Enter Valid Task Name");
        break;

      case todos.todosList.length !== 0 && enteredTaskName.trim().length === 0:
        errorHandlingFunction("Please Enter Valid Task Name");
        break;

      case todos.todosList.length === 0 && enteredTaskName.trim().length !== 0:
        setErrorMsg("");
        setEnteredTaskName("");
        const newTodoObj: TodoObject = {
          todoId: todos.todosList.length + 1,
          taskName: enteredTaskName,
          isTaskCompleted: false,
        };
        dispatch(addTodo(newTodoObj));
        break;

      case todos.todosList.length !== 0 && enteredTaskName.trim().length !== 0:
        if (checkIsTaskAlreadyPresentOrNot() === false) {
          const newTodoObj = {
            todoId: todos.todosList.length + 1,
            taskName: enteredTaskName,
            isTaskCompleted: false,
          };
          dispatch(addTodo(newTodoObj));
        } else {
          errorHandlingFunction("Task Already Exists");
        }
        break;
      default:
        break;
    }
  };

  const saveEditedTodoEventHandler = (
    todoId: number,
    editedTodoTaskName: string
  ) => {
    setEnteredTaskName(editedTodoTaskName);
    setEditedArray([true, todoId]);
    setErrorMsg("");
  };

  const updateEditedTodoHandler = () => {
    if (enteredTaskName === "") {
      errorHandlingFunction("Please Enter Valid Task Name");
    } else {
      console.log(editedArray);
      dispatch(updateEditedTodo({ editedArray, enteredTaskName }));
      setEditedArray([false, null]);
      setEnteredTaskName("");
      setErrorMsg("");
    }
  };

  return (
    <Box sx={todoStyles.todosMainContainer}>
      <Box sx={todoStyles.todosChildContainer}>
        <Typography component="h1" sx={todoStyles.todosHeading}>
          Todos
        </Typography>
        <Box sx={todoStyles.createTaskContainer}>
          <Typography component="h2" sx={todoStyles.createTaskHeading}>
            Create{" "}
            <Box component="span" sx={todoStyles.createTaskHeadingSubpart}>
              Task
            </Box>
          </Typography>
          <TextField
            type="text"
            label="What needs to be done?"
            placeholder="What needs to be done?"
            sx={todoStyles.todoUserInput}
            onChange={(e) => setEnteredTaskName(e.target.value)}
            value={enteredTaskName}
          />
          {errorMsg && (
            <Typography component="p" sx={todoStyles.errorMsg}>
              {errorMsg}
            </Typography>
          )}
          {!editedArray[0] ? (
            <Button
              onClick={addTodoHandler}
              sx={todoStyles.todoButton}
              type="button"
            >
              Add
            </Button>
          ) : (
            <Button
              onClick={updateEditedTodoHandler}
              sx={{
                ...todoStyles.todoButton,
                backgroundColor: "#51e40d !important",
              }}
            >
              Update
            </Button>
          )}
        </Box>

        <Box sx={todoStyles.createTaskContainer}>
          <Typography component="h2" sx={todoStyles.createTaskHeading}>
            My{" "}
            <Box component="span" sx={todoStyles.createTaskHeadingSubpart}>
              Tasks
            </Box>
          </Typography>
        </Box>
        <Box component="ul" sx={todoStyles.unorderedList}>
          {todos.todosList.map((eachTodo: TodoObject) => (
            <TodoItem
              key={eachTodo.todoId}
              eachTodo={eachTodo}
              saveEditedTodoEventHandler={saveEditedTodoEventHandler}
            />
          ))}
        </Box>
        <Button
          type="button"
          sx={{ ...todoStyles.todoButton, marginTop: "30px" }}
          disabled={!todos.todosList.length}
          onClick={() => {
            localStorage.setItem("todosArray", JSON.stringify(todos.todosList));
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Todo;
