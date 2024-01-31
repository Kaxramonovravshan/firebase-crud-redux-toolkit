import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc
} from "firebase/firestore";
import { firestore } from "../../../firebase.config";

const apiMiddleware = (store) => (next) => (action) => {
  if (action.type === "apiCall") {
    const refCollection = collection(firestore, action.payload.collection);
    // GET
    if (action.payload.method.toUpperCase() === "GET") {
      getDocs(refCollection).then((res) => {
        const todos = res.docs.map((itm) => {
          return { ...itm.data(), id: itm.id };
        });

        store.dispatch(action.payload.onSuccess(todos));
      });
    }
    // POST
    else if (action.payload.method.toUpperCase() === "POST") {
      if (store.getState().todo.currentItem === "") {
        addDoc(refCollection, action.payload.data).then((res) => {
          store.dispatch(action.payload.onSuccess());
        });
      } else {
        const id = store.getState().todo.currentItem;
        const oneDoc = doc(refCollection, id);
        updateDoc(oneDoc, {
          ...action.payload.data,
          status: store.getState().todo.statusItem
        }).then((res) => {
          store.dispatch(action.payload.onSuccess());
        });
      }
    }
    // DELETE
    else if (action.payload.method.toUpperCase() === "DELETE") {
      const oneDoc = doc(refCollection, action.payload.id);
      deleteDoc(oneDoc).then((res) => {
        store.dispatch(action.payload.onSuccess());
      });
    }
  } else {
    next(action);
  }
};

export default apiMiddleware;
