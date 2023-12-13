import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const localStorageData: null | TodoObject[] = JSON.parse(
  localStorage.getItem("todosArray") as string
);

interface TodoObject {
  todoId: number;
  taskName: string;
  isTaskCompleted: boolean;
}

interface TodosState {
  todosList: TodoObject[];
}

const initialState: TodosState = {
  todosList: localStorageData ? localStorageData : [],
};

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoObject>) => {
      state.todosList.push(action.payload);
      console.log(initialState);
    },

    updateTodo: (
      state,
      action: PayloadAction<{ checkboxId: string; isTicked: boolean }>
    ) => {
      const updatedTodoList: TodoObject[] = state.todosList.map(
        (eachTodo: TodoObject) =>
          `checkboxId${eachTodo.todoId}` === action.payload.checkboxId
            ? { ...eachTodo, isTaskCompleted: action.payload.isTicked }
            : eachTodo
      );
      state.todosList = updatedTodoList;
    },

    updateEditedTodo: (
      state,
      action: PayloadAction<{
        editedArray: [boolean, null | number];
        enteredTaskName: string;
      }>
    ) => {
      const updatedTodoList = state.todosList.map((eachTodo: TodoObject) => {
        if (eachTodo.todoId === action.payload.editedArray[1]) {
          // const checkEditedTaskCompleted =
          //   eachTodo.taskName === action.payload.enteredTaskName;
          return {
            ...eachTodo,
            // isTaskCompleted: checkEditedTaskCompleted,
            taskName: action.payload.enteredTaskName,
          };
        }
        return eachTodo;
      });
      state.todosList = updatedTodoList;
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todosList = state.todosList.filter(
        (eachTodo: TodoObject) => eachTodo.todoId !== action.payload
      );
    },
  },
});

export const { addTodo, updateTodo, updateEditedTodo, deleteTodo } =
  TodosSlice.actions;

console.log(TodosSlice.actions);
console.log(TodosSlice.reducer);

export default TodosSlice.reducer;
