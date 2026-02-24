import React from 'react';
import { motion } from 'motion/react';
import { LayoutTemplate, Sparkles, Crown } from 'lucide-react';

export const TemplatesView: React.FC = () => {
  const templates = [
    { id: 'standard', label: 'Plantillas Estándar', icon: LayoutTemplate, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'premium', label: 'Plantillas Premium', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'super-premium', label: 'Plantillas Super Premium', icon: Crown, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto p-4 md:p-8"
    >
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Galería de Plantillas</h1>
        <p className="text-lg text-slate-500">Selecciona el estilo perfecto para tu próximo gran paso profesional.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {templates.map((template) => (
          <button
            key={template.id}
            className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all active:scale-95 bg-white group`}
          >
            <div className={`w-16 h-16 rounded-2xl ${template.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <template.icon className={`w-8 h-8 ${template.color}`} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{template.label}</h3>
          </button>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-3xl p-12 text-center border border-indigo-100">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
          <Sparkles className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Estamos Construyendo las Mejores Plantillas para Tí
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Nuestro equipo de diseño está trabajando arduamente para traerte una colección de plantillas profesionales, modernas y altamente efectivas. ¡Vuelve pronto!
        </p>
      </div>
    </motion.div>
  );
};
