import { observer } from "mobx-react";
import React, { FC, useState } from "react";
import Icon from "../shared/Icon";
import './todo.css';
import { ITodo } from "../../data/interfaces";
import globalStore from "../../stores/GlobalStore";
import Form from "../shared/Form/Form";

const Todo: FC<ITodo> = observer(({ task, isDone }) => {
  const [isEditClicked, setIsEditClicked] = useState<boolean>()
  const [tempTask, setTempTask] = useState<string>(task);
  const [errorMessage, setErrorMessage] = useState("")

  const editTask = () => {
    setIsEditClicked(true);
  }

  const deleteTask = () => {
    globalStore.deleteTodo(task);
  }

  const handleCheck = () => {
    const oldTask = { task, isDone };
    const newTask = { task, isDone: !isDone };

    globalStore.updateTask(oldTask, newTask);
  }

  const changeTempTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value)) {
      setTempTask("");
    }
    else setTempTask(e.target.value);
    setErrorMessage("");
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!globalStore.findTodo(tempTask) && tempTask) {
      globalStore.updateTask({ task, isDone }, { task: tempTask, isDone })
      setErrorMessage("");
      setTempTask("");
    }
    else setErrorMessage("this task already exists")
  }

  return (
    <section className="todo">
      <button className="todo__btn" onClick={handleCheck}>
        <Icon iconKey={`${!isDone ? "checkbox" : "checkbox-selected"}`} className="todo__icon" width="20px" height="20px" />
      </button>

      <div className="todo__form-container">
        {isEditClicked ?
          <Form
            value={tempTask}
            handleInput={changeTempTask}
            className="todo"
            handleSubmit={submitForm}
          /> :
          <p className={`todo__task ${isDone && "todo__done"}`}>{tempTask}</p>
        }
        <p className="todo__msg">{errorMessage}</p>
      </div>

      <div className="todo__btns-container">
        <button className="todo__btn" onClick={editTask}>
          <Icon iconKey="edit" className="todo__icon" width="20px" height="20px" />
        </button>

        <button className="todo__btn" onClick={deleteTask}>
          <Icon iconKey="trash" className="todo__icon" width="20px" height="20px" />
        </button>
      </div>
    </section>
  )
});

export default Todo;
