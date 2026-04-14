import React, { useContext, useState } from 'react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { TaskContext } from '../context/TaskContext';
import Column from './Column';
import TaskModal from './TaskModal';

const KanbanBoard = () => {
  const { tasks, updateTask } = useContext(TaskContext);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, 
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id;
    const overId = over.id;
    const activeTask = tasks.find((t) => t.id === activeTaskId);
    const isColumn = ['todo', 'in-progress', 'done'].includes(overId);
    
    if (isColumn && activeTask.status !== overId) {
      updateTask(activeTaskId, { status: overId });
    }
  };

  // Helper functions for the modal
  const openNewTaskModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mb-6 flex justify-end">
        <button 
          onClick={openNewTaskModal}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners} 
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto w-full">
          <Column 
            id="todo" 
            title="To Do" 
            tasks={tasks.filter((t) => t.status === 'todo')} 
            onEditTask={openEditModal}
          />
          <Column 
            id="in-progress" 
            title="In Progress" 
            tasks={tasks.filter((t) => t.status === 'in-progress')} 
            onEditTask={openEditModal}
          />
          <Column 
            id="done" 
            title="Done" 
            tasks={tasks.filter((t) => t.status === 'done')} 
            onEditTask={openEditModal}
          />
        </div>
      </DndContext>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        taskToEdit={taskToEdit}
      />
    </>
  );
};

export default KanbanBoard;