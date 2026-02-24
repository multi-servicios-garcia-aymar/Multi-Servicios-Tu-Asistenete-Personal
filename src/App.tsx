import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { FileText, LayoutGrid, Settings, HelpCircle, Bell, User, Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KioskButton } from './components/KioskButton';
import { ResumeCreator } from './components/ResumeCreator';

const Dashboard = () => {
  const navigate = useNavigate();

  const apps = [
    { id: 'resume', label: 'Creador de Curriculum', icon: FileText, color: 'bg-white' },
    { id: 'placeholder1', label: 'Próximamente', icon: Plus, color: 'bg-slate-50 opacity-50' },
    { id: 'placeholder2', label: 'Próximamente', icon: Plus, color: 'bg-slate-50 opacity-50' },
    { id: 'placeholder3', label: 'Próximamente', icon: Plus, color: 'bg-slate-50 opacity-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Multi Servicios <span className="text-indigo-600">Tu Asistente Personal</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Selecciona una herramienta para comenzar. Todas nuestras aplicaciones están diseñadas para la máxima productividad.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {apps.map((app) => (
          <KioskButton
            key={app.id}
            icon={app.icon}
            label={app.label}
            color={app.color}
            onClick={() => app.id === 'resume' && navigate('/resume')}
          />
        ))}
      </div>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">Multi Servicios Tu Asistente Personal</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-100 rounded-full transition-colors border border-transparent hover:border-slate-200">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:inline-block">Admin</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden sticky bottom-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 text-indigo-600">
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Inicio</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Ajustes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <HelpCircle className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Ayuda</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/resume" element={<ResumeCreator />} />
        </Routes>
      </Layout>
    </Router>
  );
}
