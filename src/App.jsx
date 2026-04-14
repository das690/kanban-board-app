import React from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="min-h-screen p-8 text-slate-100">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-tight">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;