import { configureStore } from "@reduxjs/toolkit";
import slice from "./todoReducer/todoReducer";
import apiMiddleware from "./apiMiddleware/apiMiddleware";

const store = configureStore({
  reducer: {
    todo: slice.reducer
  },
  middleware: () => [apiMiddleware]
});

export default store;
