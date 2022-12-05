import React, { FC, useEffect, useState } from 'react';
import Todo from '../Todo/Todo';
import globalStore from '../../stores/GlobalStore';
import './tasks-list.css';
import { ITodo } from '../../data/interfaces';
import { observer } from 'mobx-react';
import Icon from '../shared/Icon';

const TasksList: FC = observer(() => {
  const [src, setSrc] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    setSrc(event.currentTarget.innerText.split('\n')[0])
  }

  const onDropHandler = (event: React.DragEvent<HTMLLIElement>) => {
    setDestination(event.currentTarget.innerText.split('\n')[0])
  }

  useEffect(() => {
    if (src && destination) {
      globalStore.switch(src, destination)
    }
  }, [src, destination])

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => { //enables dropping
    event.preventDefault();
  }

  const openAddTaskForm = () => {
    globalStore.setIsAddTaskFormOpen();
  }

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(globalStore.todos));
    globalStore.setIsMainBtnsDisabled(true);
  }

  const discardChanges = () => {
    globalStore.setTodos(JSON.parse(localStorage.getItem('tasks') || ""));
    globalStore.setIsMainBtnsDisabled(true);
  }

  return (
    <main className='tasks-list'>
      <div className='tasks-list__btns'>
        <button className="tasks-list__btn tasks-list__btn_add" onClick={openAddTaskForm}>
          <Icon iconKey='plus' className="tasks-list__icon" />
        </button>
        <h1 className='tasks-list__title'>My Tasks</h1>
        <div>
          <button type="button" className="tasks-list__btn tasks-list__btn_save" onClick={saveTasks} disabled={globalStore.isMainBtnsDisabled}>Save</button>
          <button type="button" className="tasks-list__btn tasks-list__btn_cancel" onClick={discardChanges} disabled={globalStore.isMainBtnsDisabled}>Discard</button>
        </div>
      </div>
      <ol className='tasks-list__list'>
        {globalStore.todos.map((todo: ITodo) => (
          <li key={Math.random()} draggable="true" onDragStart={handleDragStart} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => onDropHandler(e)}>
            <Todo isDone={todo.isDone} task={todo.task} />
          </li>
        )
        )}
      </ol>
      {!globalStore.todos.length && <p className='tasks-list__subtitle'>there are no tasks to show</p>}
    </main >
  )
})

export default TasksList;