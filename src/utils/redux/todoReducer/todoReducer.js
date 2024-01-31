import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    inpVal: "",
    currentItem: "",
    statusItem: ""
  },
  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
    getValue: (state, action) => {
      state.inpVal = action.payload;
    },
    editItem: (state, action) => {
      state.currentItem = action.payload.id;
      state.inpVal = action.payload.title;
      state.statusItem = action.payload.status;
    }
  }
});
const model = slice.actions;

function loadTodos() {
  return {
    type: "apiCall",
    payload: {
      collection: "todos",
      method: "GET",
      onSuccess: model.getTodos
    }
  };
}

function saveTodo(data) {
  return {
    type: "apiCall",
    payload: {
      collection: "todos",
      method: "POST",
      onSuccess: loadTodos,
      data
    }
  };
}

function delItem(id) {
  return {
    type: "apiCall",
    payload: {
      collection: "todos",
      method: "delete",
      onSuccess: loadTodos,
      id
    }
  };
}

export default slice;
export const action = { ...slice.actions, loadTodos, saveTodo, delItem };
