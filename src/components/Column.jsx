import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Column = ({ id, title, tasks, onEditTask }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col flex-1 rounded-xl p-4 shadow-sm border-2 transition-colors min-h-[500px] 
        ${isOver ? 'bg-slate-800 border-indigo-500' : 'bg-slate-900/50 border-slate-800'}
      `}
    >
      <h2 className="text-xl font-bold text-slate-200 mb-4 pb-2 border-b-2 border-slate-700">
        {title} <span className="text-sm font-normal text-slate-500 ml-2">({tasks.length})</span>
      </h2>
      
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}
      </div>
    </div>
  );
};

export default Column;