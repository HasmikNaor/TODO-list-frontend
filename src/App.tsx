import { observer } from 'mobx-react';
import React, { FC } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TasksList from './components/TasksList/TasksList';
import globalStore from './stores/GlobalStore';

const App: FC = observer(() => {
  return (
    <div className="page">
      {globalStore.isAddTaskFormOpen && <Header />}
      <TasksList />
    </div>
  );
})

export default App;
