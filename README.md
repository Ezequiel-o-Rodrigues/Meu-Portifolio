<div align="center">

# 🚀 Portfólio — Ezequiel Rodrigues

### Desenvolvedor SaaS & Especialista em IA

*Portfólio interativo com background 3D, glassmorphism e animações fluidas*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R183-000000?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

</div>

---

## 📸 Screenshots

<div align="center">

<!-- Adicione suas screenshots aqui -->
<!-- <img src="docs/screenshots/hero.png" alt="Hero Section" width="800"/> -->
<!-- <img src="docs/screenshots/projetos.png" alt="Projetos" width="800"/> -->
<!-- <img src="docs/screenshots/sobre.png" alt="Sobre Mim" width="800"/> -->

*Screenshots em breve*

</div>

---

## ✨ Destaques

### 🌐 Background 3D Interativo
Uma **rede neural de partículas** renderizada em tempo real com **Three.js + React Three Fiber**:
- **160 partículas** com posições e velocidades aleatórias no espaço 3D
- Conexões dinâmicas entre partículas próximas (raio de 3.5 unidades)
- **Reação ao mouse** — partículas são repelidas pelo cursor, criando um efeito de "onda"
- Iluminação ambiente com pontos de luz em tons de roxo
- Auto-rotação suave da câmera
- Material com neon cyan (`#00f2ff`) e blending aditivo para efeito glow

### 🪟 Design Glassmorphism
Sistema visual consistente com:
- `backdrop-blur-xl` + backgrounds semi-transparentes com gradientes
- Bordas sutis e overlays em todos os cards e containers
- Paleta escura futurista: Navy (`#020617`), Indigo (`#6366f1`), Roxo (`#a855f7`)

### 🎭 Animações por Toda Parte
- **Scroll-triggered fade-in** em todas as seções (Framer Motion)
- **Typewriter effect** ciclando roles no hero
- **Parallax tilt** nos cards de projetos e foto de perfil
- **Elementos flutuantes** decorativos com animação contínua
- **Menu mobile** com AnimatePresence (slide animado)

---

## 📑 Seções

### 🏠 Hero
- Badge "SaaS & AI Specialist" com indicador pulsante
- Nome em gradiente (azul → roxo → slate)
- Typewriter com roles: *SaaS Systems Developer*, *AI Agent Architect*, *Automation Specialist*, *IT Technician*
- CTAs para Projetos e GitHub

### 👤 Sobre Mim
Layout em duas colunas com **interface de tabs**:

| Tab | Conteúdo |
|-----|----------|
| **Informação Pessoal** | Bio com foco em SaaS, n8n, Typebot e AI Agents |
| **Habilidades** | Grid de 12 ícones: HTML5, CSS3, JS, TS, Node.js, React, PHP, MySQL, n8n, Typebot, Git, Docker |
| **Qualificações** | 4 cards: AI Agents, REST APIs, Arquitetura SaaS, Cyber Security |

### 💼 Projetos
Cards com **parallax tilt** exibindo:
- **Sistemas SaaS & Automações** — n8n, Typebot, Node.js, REST APIs
- **GestaoInteli JNR** — PHP, MySQL, JavaScript, Bootstrap
- **SIGA** — PHP, MySQL, JavaScript (controle de horas)

### 📅 Carreira
Timeline alternada com linha central gradiente:
- **2025–Atual**: Desenvolvedor SaaS (arquitetura SaaS, automação n8n/Typebot, agentes IA)
- **2023–2025**: Técnico em Eletrônicos (manutenção e suporte técnico)

### 📬 Contato
Card glassmorphism com informações de contato (email, WhatsApp) + formulário + links sociais (LinkedIn, Instagram, GitHub)

---

## 🛠️ Stack Tecnológica

| Tecnologia | Finalidade |
|-----------|------------|
| **React 19** | Framework de UI |
| **TypeScript 5.8** | Tipagem estática |
| **Vite 6.2** | Build e dev server |
| **Tailwind CSS 4** | Estilização utility-first |
| **Three.js** | Renderização 3D |
| **React Three Fiber** | Three.js declarativo em React |
| **@react-three/drei** | Helpers e controles 3D |
| **Framer Motion 12** | Animações e transições |
| **React Router 7** | Navegação SPA |
| **Lucide React** | Ícones |
| **react-parallax-tilt** | Efeito tilt nos cards |
| **react-simple-typewriter** | Efeito máquina de escrever |
| **clsx + tailwind-merge** | Composição de classes CSS |

---

## 📦 Estrutura do Projeto

```
Meu-Portifolio/
├── index.html                # Entry point SPA
├── vite.config.ts            # Vite + Tailwind + React
├── tsconfig.json             # TypeScript ES2022
├── package.json              # Dependências
│
├── public/
│   └── .htaccess             # Roteamento SPA (Apache)
│
└── src/
    ├── main.tsx              # Entry point React
    ├── App.tsx               # App principal (todas as seções + dados)
    ├── constants.ts          # URLs de imagens e links sociais
    ├── index.css             # Tailwind v4 + tema custom + glassmorphism
    │
    ├── components/
    │   ├── Scene3D.tsx       # Background 3D (rede neural de partículas)
    │   ├── Layout.tsx        # Wrapper de seção com animação de scroll
    │   └── AssetsGallery.tsx # Galeria de assets (rota /assets)
    │
    └── lib/
        └── utils.ts          # Utilitário cn() (clsx + tailwind-merge)
```

---

## ⚡ Como Executar

```bash
# Clone o repositório
git clone https://github.com/Ezequiel-o-Rodrigues/Meu-Portifolio.git
cd Meu-Portifolio

# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## 🎨 Personalização

### Alterar Dados Pessoais
Todos os dados (projetos, skills, experiências) estão definidos diretamente em [`src/App.tsx`](src/App.tsx).

### Alterar Imagens e Links
Edite [`src/constants.ts`](src/constants.ts) — centraliza todas as URLs de imagens e links sociais.

### Alterar Tema
Edite as variáveis CSS em [`src/index.css`](src/index.css) — cores, fontes, classes de glassmorphism.

### Visualizar Assets
Acesse a rota `/assets` para ver e copiar URLs de todas as imagens usadas no site.

---

## 🤝 Autor

**Ezequiel Rodrigues** — Desenvolvedor SaaS & Especialista em IA

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?logo=github&logoColor=white)](https://github.com/Ezequiel-o-Rodrigues)

---

<div align="center">

*Feito com ❤️ e muitas partículas 3D*

</div>
