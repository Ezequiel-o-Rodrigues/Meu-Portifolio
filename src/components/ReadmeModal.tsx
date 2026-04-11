import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { X, Github, ExternalLink } from 'lucide-react';
import type { Project } from '../lib/github';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export const ReadmeModal: React.FC<Props> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-[#161b22] shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Github size={18} className="text-white/60 shrink-0" />
                <h2 className="text-sm sm:text-lg font-display font-bold text-white uppercase tracking-wider truncate">
                  {project.title}
                </h2>
                {project.stars !== undefined && project.stars > 0 && (
                  <span className="text-xs text-white/40 shrink-0">★ {project.stars}</span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir no GitHub"
                  className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  onClick={onClose}
                  title="Fechar (ESC)"
                  className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* README content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-10 markdown-body">
              {project.readme ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  urlTransform={(url) => {
                    if (!url) return url;
                    if (/^(https?:|mailto:|#)/.test(url)) return url;
                    if (project.readmeBase) return project.readmeBase + url.replace(/^\.?\//, '');
                    return url;
                  }}
                >
                  {project.readme}
                </ReactMarkdown>
              ) : (
                <div className="text-center text-white/40 py-16">
                  <p className="mb-4">Este repositório não tem um README disponível.</p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm font-bold transition-colors"
                  >
                    <Github size={16} /> Ver no GitHub
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
