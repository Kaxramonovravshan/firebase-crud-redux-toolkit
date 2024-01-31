import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { action } from "./utils/redux/todoReducer/todoReducer";

const App = (props) => {
  useEffect(() => {
    props.loadTodos();
  }, []);

  return (
    <>
      <div className="card p-3 w-25 mx-auto">
        <div className="card-header">Add Todo</div>
        <div className="card-body">
          <input
            value={props.inpVal}
            onChange={(e) => props.getValue(e.target.value)}
            className="form-control mb-2"
            type="text"
          />
          <button
            onClick={() =>
              props.saveTodo({ title: props.inpVal, status: false })
            }
            className="btn btn-dark"
          >
            save
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((itm) => (
            <tr key={itm.id}>
              <td>
                <input type="checkbox" checked={itm.status} />
              </td>
              <td>{itm.title}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => props.delItem(itm.id)}
                >
                  X
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => props.editItem(itm)}
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default connect((state) => ({ ...state.todo }), action)(App);
