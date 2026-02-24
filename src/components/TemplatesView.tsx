import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutTemplate, Sparkles, Crown, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface TemplatesViewProps {
  currentTemplate: string;
  onSelectTemplate: (id: string) => void;
  onBackToEditor: () => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ currentTemplate, onSelectTemplate, onBackToEditor }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>(currentTemplate);

  const categories = [
    { id: 'standard', label: 'Plantillas Estándar', icon: LayoutTemplate, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'premium', label: 'Plantillas Premium', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'super-premium', label: 'Plantillas Super Premium', icon: Crown, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const standardTemplates = [
    { id: 'std-1', name: 'Moderno Minimalista', desc: 'Limpio y directo al grano.' },
    { id: 'std-2', name: 'Clásico Profesional', desc: 'Estructura tradicional y formal.' },
    { id: 'std-3', name: 'Portafolio Creativo', desc: 'Destaca tu lado más innovador.' },
    { id: 'std-4', name: 'Ejecutivo', desc: 'Para perfiles de alto nivel.' },
    { id: 'std-5', name: 'Tech Startup', desc: 'Dinámico y orientado a resultados.' },
    { id: 'std-6', name: 'Elegante Serif', desc: 'Tipografía clásica con un toque moderno.' },
    { id: 'std-7', name: 'Impacto Visual', desc: 'Alto contraste para llamar la atención.' },
    { id: 'std-8', name: 'Corporativo Limpio', desc: 'Ideal para el sector financiero o legal.' },
    { id: 'std-9', name: 'Académico', desc: 'Enfocado en educación y publicaciones.' },
    { id: 'std-10', name: 'Acento Vibrante', desc: 'Un toque de color para destacar.' },
  ];

  const handleConfirmSelection = () => {
    onSelectTemplate(selectedId);
    onBackToEditor();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto p-4 md:p-8"
    >
      <header className="mb-12 text-center relative">
        {activeCategory && (
          <button 
            onClick={() => setActiveCategory(null)}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Volver a Categorías</span>
          </button>
        )}
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Galería de Plantillas</h1>
        <p className="text-lg text-slate-500">Selecciona el estilo perfecto para tu próximo gran paso profesional.</p>
      </header>

      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div 
            key="categories"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all active:scale-95 bg-white group`}
              >
                <div className={`w-16 h-16 rounded-2xl ${category.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{category.label}</h3>
              </button>
            ))}
          </motion.div>
        ) : activeCategory === 'standard' ? (
          <motion.div 
            key="standard-templates"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {standardTemplates.map((template) => (
                <div 
                  key={template.id}
                  onClick={() => setSelectedId(template.id)}
                  className={`cursor-pointer relative p-6 rounded-2xl border-2 transition-all ${
                    selectedId === template.id 
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-md' 
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                  }`}
                >
                  {selectedId === template.id && (
                    <div className="absolute top-4 right-4 text-indigo-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                  <div className="w-12 h-12 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                    <LayoutTemplate className="w-6 h-6 text-slate-400" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{template.name}</h4>
                  <p className="text-sm text-slate-500">{template.desc}</p>
                </div>
              ))}
            </div>

            {selectedId && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky bottom-8 flex justify-center mt-12 z-50"
              >
                <button 
                  onClick={handleConfirmSelection}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 font-bold text-lg"
                >
                  Ir a Creador de Cv
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="coming-soon"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-indigo-50 rounded-3xl p-12 text-center border border-indigo-100"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Estamos Construyendo las Mejores Plantillas para Tí
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Nuestro equipo de diseño está trabajando arduamente para traerte una colección de plantillas profesionales, modernas y altamente efectivas. ¡Vuelve pronto!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
