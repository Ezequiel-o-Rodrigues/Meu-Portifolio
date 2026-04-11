import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Code2, 
  Database, 
  Globe, 
  Server, 
  Cpu, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  Download,
  Menu,
  X,
  Terminal,
  Layers,
  Smartphone,
  Bot,
  Zap,
  Cpu as AiIcon,
  Workflow,
  MessageSquare,
  Instagram
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { Section, FloatingItem } from './components/Layout';
import { cn } from './lib/utils';
import { IMAGES, SOCIAL_LINKS, GITHUB_USERNAME, GITHUB_PORTFOLIO_TOPIC } from './constants';
import { Scene3D } from './components/Scene3D';
import Tilt from 'react-parallax-tilt';
import { fetchPortfolioRepos, type Project } from './lib/github';

// Fallback enquanto o fetch do GitHub carrega (ou se nenhum repo tiver o tópico "portfolio")
const fallbackProjects: Project[] = [
  {
    title: "ChefCost",
    description: "Sistema inteligente de precificação para profissionais da gastronomia. Calcula custos, simula lucros e gerencia receitas com precisão usando IA.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Gemini AI"],
    github: "https://github.com/Ezequiel-o-Rodrigues/ChefCost",
    type: "SaaS / AI"
  },
  {
    title: "StudyMap",
    description: "Plataforma de estudos orientada por IA que organiza conteúdos em trilhas e mapas inteligentes para otimizar o aprendizado.",
    tech: ["React", "TypeScript", "Gemini AI"],
    github: "https://github.com/Ezequiel-o-Rodrigues/StudyMap",
    demo: "https://studymap-6yrq.onrender.com",
    type: "EdTech / AI"
  },
  {
    title: "Servidor Node.js Modular",
    description: "Arquitetura backend modular e escalável com autenticação JWT, módulos auto-descobertos, métricas Prometheus e logging estruturado.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/Ezequiel-o-Rodrigues/Servidor-Node.Js",
    type: "Backend / Infra"
  },
  {
    title: "GestaoInteli JNR",
    description: "Sistema completo para restaurantes com PDV, controle de estoque, gestão de garçons e relatórios analíticos em uma única plataforma.",
    tech: ["PHP", "MySQL", "Bootstrap", "Chart.js"],
    github: "https://github.com/Ezequiel-o-Rodrigues/gestaointeli-jnr",
    type: "Full Stack"
  }
];

const skillCategories = [
  {
    id: 'habilidades',
    label: 'Habilidades',
    skills: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'n8n', icon: 'https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png' },
      { name: 'Typebot', icon: 'https://typebot.io/favicon.png' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    ]
  },
  {
    id: 'qualificacoes',
    label: 'Qualificações',
    skills: [
      { name: 'Agentes de IA', icon: null, lucide: <AiIcon className="w-8 h-8 text-purple-400" /> },
      { name: 'APIs REST', icon: null, lucide: <Zap className="w-8 h-8 text-yellow-400" /> },
      { name: 'SaaS Architecture', icon: null, lucide: <Layers className="w-8 h-8 text-blue-400" /> },
      { name: 'Cyber Security', icon: null, lucide: <ShieldCheck className="w-8 h-8 text-green-400" /> },
    ]
  }
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('informacao');
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [projectsSource, setProjectsSource] = useState<'fallback' | 'github'>('fallback');

  useEffect(() => {
    fetchPortfolioRepos(GITHUB_USERNAME, GITHUB_PORTFOLIO_TOPIC)
      .then((fetched) => {
        if (fetched.length > 0) {
          setProjects(fetched);
          setProjectsSource('github');
        }
      })
      .catch((err) => console.warn('[github] fetch falhou:', err));
  }, []);

  // Scroll-linked morphing avatar: começa grande no hero, encolhe até virar o avatar da nav
  const { scrollY } = useScroll();
  const avatarTop = useTransform(scrollY, [0, 400], [120, 14]);
  const avatarLeft = useTransform(scrollY, [0, 400], [40, 20]);
  const avatarSize = useTransform(scrollY, [0, 400], [240, 56]);
  const avatarHaloOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <div className="min-h-screen selection:bg-primary/30 overflow-x-hidden">
      <Scene3D />

      {/* Morphing Avatar — começa grande no hero, encolhe pra nav conforme o scroll */}
      <motion.div
        style={{
          position: 'fixed',
          top: avatarTop,
          left: avatarLeft,
          width: avatarSize,
          height: avatarSize,
          zIndex: 60,
        }}
        className="pointer-events-none"
      >
        {/* Halo borrado no fundo (some conforme encolhe) */}
        <motion.div
          style={{ opacity: avatarHaloOpacity }}
          className="absolute -inset-10 rounded-full bg-gradient-to-br from-primary/50 via-secondary/40 to-pink-500/30 blur-3xl"
        />

        {/* Anel cônico rotativo — o "frame" animado */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #6366f1, #a855f7, #6366f1)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Anel secundário rotativo em direção contrária (sutil) */}
        <motion.div
          className="absolute inset-[2px] rounded-full opacity-60"
          style={{
            background: 'conic-gradient(from 180deg, transparent, #a855f7, transparent, #6366f1, transparent)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Imagem interna com recuo pra revelar o anel */}
        <div className="absolute inset-[5px] rounded-full overflow-hidden bg-bg-dark shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <img
            src={IMAGES.HERO_FLOATING_HEAD}
            alt="Ezequiel Rodrigues"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "bg-bg-dark/80 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-black tracking-tighter flex items-center gap-2 pl-20"
          >
            <span className="hidden sm:block uppercase tracking-widest">ezze<span className="text-primary">dev</span></span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-display font-bold uppercase tracking-widest text-white/70 hover:text-primary transition-all hover:tracking-[0.2em]"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={SOCIAL_LINKS.EMAIL}
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary hover:brightness-125 text-white rounded-full text-xs font-display font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
            >
              Conectar
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-2xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-display font-black text-white/80 hover:text-primary uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        
        {/* Floating Code Icons */}
        <FloatingItem className="top-[25%] right-[10%] text-primary/20" delay={1}>
          <Workflow size={120} strokeWidth={0.5} />
        </FloatingItem>
        
        <FloatingItem className="bottom-[25%] left-[10%] text-secondary/20" delay={3}>
          <Bot size={100} strokeWidth={0.5} />
        </FloatingItem>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs font-display font-bold uppercase tracking-[0.3em]"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            SaaS & AI Specialist
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.9]"
          >
            EZEQUIEL <br />
            <span className="text-gradient">RODRIGUES</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl font-medium text-white/60 mb-12 h-8 font-display uppercase tracking-widest"
          >
            <Typewriter
              words={['SaaS Systems Developer', 'AI Agent Architect', 'Automation Specialist', 'IT Technician']}
              loop={0}
              cursor
              cursorStyle='|'
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a 
              href="#projects"
              className="px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-display font-black uppercase tracking-widest transition-all hover:scale-105 hover:brightness-110 shadow-2xl shadow-primary/40 flex items-center gap-3 group"
            >
              Projetos
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </a>
            <a 
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-display font-black uppercase tracking-widest transition-all flex items-center gap-3 backdrop-blur-md"
            >
              <Github size={20} />
              GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section - Redesigned with Tabs for Skills */}
      <Section id="about" className="py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass border-white/20">
              <img
                src={IMAGES.ABOUT_PHOTO}
                alt="Ezequiel Rodrigues"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'grayscale(100%) contrast(1.1) brightness(1.05)' }}
                referrerPolicy="no-referrer"
              />
              {/* Duotone overlay — tinge a foto em índigo→roxo (paleta do site) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-bg-dark pointer-events-none"
                style={{ mixBlendMode: 'color', opacity: 0.85 }}
              />
              {/* Realce luminoso — recupera um pouco de brilho por cima do duotone */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-primary/20 pointer-events-none"
                style={{ mixBlendMode: 'screen' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass p-6 rounded-2xl border-white/10">
                  <div className="text-xs font-display font-bold text-primary uppercase tracking-widest mb-1">Status Atual</div>
                  <div className="text-lg font-bold">Desenvolvedor SaaS & IA</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-8 uppercase tracking-tighter">SOBRE <span className="text-primary">MIM</span></h2>
            
            {/* Tabs Header */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-2xl border border-white/10 mb-10 w-fit">
              {['informacao', 'qualificacoes', 'habilidades'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-xs font-display font-bold uppercase tracking-widest transition-all",
                    activeTab === tab ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white/80"
                  )}
                >
                  {tab === 'informacao' ? 'Informação Pessoal' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === 'informacao' && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <p className="text-white/70 text-lg leading-relaxed">
                      Desenvolvedor apaixonado por transformar problemas reais em software. Minha jornada começou na <span className="text-white font-bold">manutenção de hardware</span> e evoluiu naturalmente para o desenvolvimento — hoje atuo 100% focado em construir sistemas <span className="text-white font-bold">SaaS</span> escaláveis e inteligentes.
                    </p>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Especialista em automações com <span className="text-primary font-bold">n8n</span>, interfaces conversacionais com <span className="text-secondary font-bold">Typebot</span> e integração de <span className="text-accent font-bold">Agentes de IA</span> para otimizar processos de negócio de ponta a ponta.
                    </p>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Trabalho do backend à experiência final, acreditando em <span className="text-white font-bold">código limpo</span>, arquitetura modular e em entregar <span className="text-primary font-bold">valor</span> antes de entregar complexidade.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                      <div>
                        <div className="text-[10px] font-display font-bold text-white/30 uppercase tracking-widest mb-2">Experiência</div>
                        <div className="text-base font-bold">Desde 2023</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-display font-bold text-white/30 uppercase tracking-widest mb-2">Localização</div>
                        <div className="text-base font-bold">Brasil</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-display font-bold text-white/30 uppercase tracking-widest mb-2">Status</div>
                        <div className="text-base font-bold text-green-400 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          Disponível
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-display font-bold text-white/30 uppercase tracking-widest mb-2">Foco Atual</div>
                        <div className="text-base font-bold">SaaS & AI</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-8">
                      <a
                        href="#contact"
                        className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl text-xs font-display font-bold uppercase tracking-widest transition-all hover:scale-105 hover:brightness-110 shadow-lg shadow-primary/30 flex items-center gap-2"
                      >
                        Vamos conversar
                        <ChevronRight size={16} />
                      </a>
                      <a
                        href={SOCIAL_LINKS.LINKEDIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-display font-bold uppercase tracking-widest transition-all flex items-center gap-2 backdrop-blur-md"
                      >
                        <Linkedin size={16} />
                        LinkedIn
                      </a>
                    </div>
                  </motion.div>
                )}

                {(activeTab === 'habilidades' || activeTab === 'qualificacoes') && (
                  <motion.div
                    key="skills-grid"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-display font-bold mb-8 uppercase tracking-widest">Meu Conjunto de Habilidades</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
                      {skillCategories.find(c => c.id === activeTab)?.skills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          className="flex flex-col items-center gap-3 group"
                        >
                          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center p-3 group-hover:border-primary/50 transition-all">
                            {skill.icon ? (
                              <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                            ) : (
                              skill.lucide
                            )}
                          </div>
                          <span className="text-[10px] font-display font-bold text-white/40 uppercase tracking-tighter text-center">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section - Futuristic Cards */}
      <Section id="projects" className="py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-6 uppercase tracking-tighter">PROJETOS <span className="text-primary">SaaS</span></h2>
          <p className="text-white/40 max-w-2xl mx-auto font-display uppercase tracking-[0.2em] text-sm">
            Explorando as fronteiras do desenvolvimento de software e inteligência artificial.
          </p>
          {projectsSource === 'github' && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-400/30 bg-green-400/5 text-green-400 text-[10px] font-display font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Sincronizado com GitHub
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <Tilt key={project.title} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={1000}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative glass rounded-[2rem] overflow-hidden border-white/5 h-full"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={IMAGES.PROJECT_THUMBNAIL(project.title)} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent" />
                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 glass rounded-full text-[10px] font-display font-bold text-primary uppercase tracking-widest">
                      {project.type}
                    </div>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-display font-black mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-display font-bold px-3 py-1 bg-white/5 text-white/60 rounded-lg border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 bg-white/5 hover:bg-primary rounded-2xl text-xs font-display font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Github size={16} /> Source
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Demo ao vivo"
                        className="w-14 h-14 glass hover:bg-secondary text-white rounded-2xl flex items-center justify-center transition-all"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </Section>

      {/* Experience Section - Futuristic Timeline */}
      <Section id="experience" className="py-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary via-secondary to-transparent opacity-20 hidden md:block" />
        
        <h2 className="text-4xl md:text-6xl font-display font-black mb-24 text-center uppercase tracking-tighter">CARREIRA <span className="text-secondary">TECH</span></h2>
        
        <div className="space-y-24 max-w-5xl mx-auto">
          {/* New Experience */}
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div className="md:text-right">
              <div className="text-primary font-display font-black text-xl mb-2 uppercase tracking-widest">2025 - ATUAL</div>
              <h3 className="text-3xl font-display font-black uppercase mb-2">Desenvolvedor SaaS</h3>
              <p className="text-white/40 font-display font-bold uppercase tracking-widest text-sm">Empresa de Tecnologia & Software</p>
            </div>
            <div className="glass p-8 rounded-3xl border-primary/30 relative">
              <div className="absolute -left-[49px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary glow-primary hidden md:block" />
              <ul className="space-y-4 text-white/70">
                <li className="flex gap-3 items-start">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Desenvolvimento de arquiteturas SaaS robustas e escaláveis.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Workflow className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Automação de fluxos complexos utilizando n8n e Typebot.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <AiIcon className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Treinamento e construção de Agentes de IA para produtividade.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Previous Experience */}
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div className="md:order-2">
              <div className="text-secondary font-display font-black text-xl mb-2 uppercase tracking-widest">2023 - 2025</div>
              <h3 className="text-3xl font-display font-black uppercase mb-2">Técnico em Eletrônicos</h3>
              <p className="text-white/40 font-display font-bold uppercase tracking-widest text-sm">Suporte & Manutenção</p>
            </div>
            <div className="glass p-8 rounded-3xl border-secondary/30 relative md:order-1">
              <div className="absolute -right-[49px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary hidden md:block" />
              <ul className="space-y-4 text-white/70">
                <li className="flex gap-3 items-start">
                  <Zap className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span>Manutenção avançada de hardware e sistemas eletrônicos.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <MessageSquare className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span>Atendimento técnico especializado e resolução de problemas.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section - Futuristic Form */}
      <Section id="contact" className="py-32">
        <div className="relative glass rounded-[4rem] overflow-hidden border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="relative grid lg:grid-cols-2">
            <div className="p-16 lg:p-24">
              <h2 className="text-5xl md:text-7xl font-display font-black mb-8 uppercase tracking-tighter leading-none">VAMOS <br /><span className="text-primary">CONECTAR?</span></h2>
              <p className="text-white/40 text-lg mb-16 font-display uppercase tracking-widest">
                Pronto para construir o próximo grande SaaS ou integrar IA ao seu negócio.
              </p>
              
              <div className="space-y-10">
                <a href={SOCIAL_LINKS.EMAIL} className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all glow-primary">
                    <Mail size={28} />
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-white/30 uppercase tracking-[0.3em] mb-1">E-mail</div>
                    <div className="text-xl font-display font-bold uppercase tracking-tight">ezequielrod2020@gmail.com</div>
                  </div>
                </a>
                <a href={SOCIAL_LINKS.WHATSAPP} className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <Phone size={28} />
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-white/30 uppercase tracking-[0.3em] mb-1">WhatsApp</div>
                    <div className="text-xl font-display font-bold uppercase tracking-tight">+55 (64) 99207-0004</div>
                  </div>
                </a>
              </div>

              <div className="flex gap-6 mt-20">
                <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-primary transition-all">
                  <Linkedin size={24} />
                </a>
                <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-pink-600 transition-all">
                  <Instagram size={24} />
                </a>
                <a href={SOCIAL_LINKS.GITHUB} target="_blank" className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-secondary transition-all">
                  <Github size={24} />
                </a>
              </div>
            </div>

            <div className="p-16 lg:p-24 bg-white/[0.02] backdrop-blur-md">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-display font-bold text-white/40 uppercase tracking-widest">Nome</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all font-display uppercase text-sm tracking-widest" placeholder="Identificação" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-display font-bold text-white/40 uppercase tracking-widest">E-mail</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all font-display uppercase text-sm tracking-widest" placeholder="Contato" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-display font-bold text-white/40 uppercase tracking-widest">Mensagem</label>
                  <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all resize-none font-display uppercase text-sm tracking-widest" placeholder="Descreva sua visão..."></textarea>
                </div>
                <button className="w-full py-6 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-display font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] hover:brightness-110 shadow-2xl shadow-primary/30">
                  Transmitir
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-3xl font-display font-black mb-6 uppercase tracking-tighter">ezze<span className="text-primary">dev</span></div>
          <p className="text-white/20 text-[10px] font-display font-bold uppercase tracking-[0.5em] mb-12">
            &copy; {new Date().getFullYear()} Ezequiel Oliveira Rodrigues // Protocolo de Portfolio Ativo
          </p>
          <div className="flex justify-center flex-wrap gap-10 mb-8">
            <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" className="text-white/40 hover:text-primary transition-all"><Linkedin size={20} /></a>
            <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" className="text-white/40 hover:text-pink-500 transition-all"><Instagram size={20} /></a>
            <a href={SOCIAL_LINKS.GITHUB} target="_blank" className="text-white/40 hover:text-white transition-all"><Github size={20} /></a>
          </div>
          <div className="flex justify-center flex-wrap gap-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-[10px] text-white/30 hover:text-primary transition-all uppercase tracking-[0.3em] font-display font-bold">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
