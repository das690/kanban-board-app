import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// 1. Create the Context
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // 2. Initialize state from localStorage, or use default empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    // If there are tasks in storage, load them
    if (savedTasks && savedTasks !== "[]") {
      return JSON.parse(savedTasks);
    }
    // Otherwise, start with a completely empty board!
    return []; 
  });

  // 3. Persist to localStorage whenever the 'tasks' state changes
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 4. CRUD Operations
  const addTask = (title, description, status = 'todo') => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedFields } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // We provide 'setTasks' so the dnd-kit logic can directly reorder the array later
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};