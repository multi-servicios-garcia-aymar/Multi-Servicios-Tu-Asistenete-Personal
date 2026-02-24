import React, { useState, useEffect, useRef } from 'react';
import { FileText, Plus, Download, User, Briefcase, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const ResumeCreator: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    identityCard: '',
    email: '',
    phone: '',
    location: '',
    profile: ''
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const targetWidth = 794; // A4 width in pixels at 96 DPI
        const newScale = Math.min(containerWidth / targetWidth, 1);
        setScale(newScale);
      }
    };

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto p-4 md:p-8"
    >
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Creador de CV</h1>
          <p className="text-slate-500">Diseña tu hoja de vida profesional en minutos.</p>
        </div>
        <button onClick={handlePrint} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95">
          <Download className="w-4 h-4" />
          <span className="font-semibold">Exportar PDF / Imprimir</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Información Personal
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                placeholder="Nombre Completo" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" 
              />
              <input 
                name="identityCard"
                value={formData.identityCard}
                onChange={handleChange}
                type="text" 
                placeholder="Cédula de Identidad" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  placeholder="Correo Electrónico" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" 
                />
                <input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel" 
                  placeholder="Teléfono" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" 
                />
              </div>
              <input 
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text" 
                placeholder="Ubicación (Ciudad, País)" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" 
              />
              <textarea 
                name="profile"
                value={formData.profile}
                onChange={handleChange}
                placeholder="Perfil Profesional / Resumen" 
                rows={4}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none" 
              />
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              Experiencia Laboral
            </h2>
            <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 font-medium">
              <Plus className="w-4 h-4" />
              Añadir Experiencia
            </button>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              Educación
            </h2>
            <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 font-medium">
              <Plus className="w-4 h-4" />
              Añadir Educación
            </button>
          </section>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col items-center" ref={containerRef}>
          <div 
            id="a4-resume-page"
            className="bg-white shadow-2xl rounded-sm border border-slate-200 p-12 overflow-hidden origin-top-left"
            style={{ 
              width: '794px', 
              height: '1123px',
              transform: `scale(${scale})`,
              marginBottom: `-${1123 * (1 - scale)}px` // Adjust margin to prevent extra space
            }}
          >
            <div className="border-b-2 border-slate-900 pb-6 mb-8">
              <h3 className="text-3xl font-bold uppercase tracking-widest text-slate-900 break-words">
                {formData.name || 'Tu Nombre Aquí'}
              </h3>
              {formData.identityCard && (
                <p className="text-sm text-slate-500 mt-1 font-medium tracking-wider">
                  C.I: {formData.identityCard}
                </p>
              )}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-[10px] md:text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-indigo-600" /> {formData.email || 'email@ejemplo.com'}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-indigo-600" /> {formData.phone || '+123 456 789'}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-indigo-600" /> {formData.location || 'Ciudad, País'}</span>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 mb-3">Perfil Profesional</h4>
                <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed italic">
                  {formData.profile || 'Escribe un breve resumen sobre tus habilidades y objetivos profesionales en el formulario de la izquierda.'}
                </p>
              </section>

              <section>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 mb-3">Experiencia</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-bold text-xs">
                      <span className="text-slate-900">Cargo / Posición</span>
                      <span className="text-slate-500">2020 - Presente</span>
                    </div>
                    <p className="text-[11px] font-semibold text-indigo-600">Nombre de la Empresa</p>
                    <ul className="list-disc list-inside text-[10px] text-slate-600 mt-2 space-y-1">
                      <li>Responsabilidad principal o logro destacado en este puesto.</li>
                      <li>Otra tarea relevante realizada durante tu estancia.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 mb-3">Educación</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-bold text-xs">
                      <span className="text-slate-900">Título Obtenido</span>
                      <span className="text-slate-500">2016 - 2020</span>
                    </div>
                    <p className="text-[11px] font-semibold text-indigo-600">Nombre de la Institución</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-400 mt-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-medium italic">Vista previa en tiempo real activa</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
