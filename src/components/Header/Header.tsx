import React, { FC, useEffect, useState } from 'react';
import './header.css';
import globalStore from '../../stores/GlobalStore';
import Form from "../shared/Form/Form";

const Header: FC = () => {
  const [task, setTask] = useState<string>("");
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!globalStore.findTodo(task)) {
      globalStore.addTodo({
        task,
        isDone: false
      })
      setTask("");
    }
    else setErrorMessage("this task already exists")

    globalStore.setIsAddTaskFormOpen();

  }
  const handleBtnDisabled = () => {
    if (task) {
      setIsBtnDisabled(false);
    }
    else setIsBtnDisabled(true);
  }

  useEffect(() => {
    handleBtnDisabled();
  }, [task])

  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value)) {
      setTask("");
    }
    else setTask(e.target.value);

    setErrorMessage("");
  }

  return (
    <header className="header">
      <Form
        value={task}
        handleInput={handleTaskInput}
        className="header"
        handleSubmit={addTask}
        buttonText="Add Task"
        isBtnDisabled={isBtnDisabled || !!errorMessage}
      />
      <p className="header__error-msg">{errorMessage}</p>
    </header>
  )
}

export default Header;