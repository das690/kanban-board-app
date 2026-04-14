import React, { useContext } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Edit } from 'lucide-react';
import { TaskContext } from '../context/TaskContext';

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask } = useContext(TaskContext);
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700 cursor-grab active:cursor-grabbing hover:border-slate-500 transition-all relative group touch-none"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-md font-semibold text-slate-100 break-words w-3/4">
          {task.title}
        </h3>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
               e.stopPropagation(); 
               onEdit(task); 
            }} 
            className="text-slate-400 hover:text-indigo-400 cursor-pointer pointer-events-auto"
            data-no-dnd="true" 
          >
            <Edit size={16} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }} 
            className="text-slate-400 hover:text-red-400 cursor-pointer pointer-events-auto"
            data-no-dnd="true"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-slate-400 text-sm line-clamp-2">{task.description}</p>
    </div>
  );
};

export default TaskCard;