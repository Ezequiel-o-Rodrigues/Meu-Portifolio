/**
 * Centralização de Imagens e Links para fácil edição
 * Altere as URLs abaixo para atualizar as imagens em todo o site.
 */

export const IMAGES = {
  // Foto de perfil pequena (circular) na barra de navegação
  // Trocar: salve o arquivo em public/nav.png
  NAV_AVATAR: "/nav.png",

  // Cabeça flutuante estilizada na seção inicial (Hero) — ideal: ilustração/avatar
  // Trocar: salve o arquivo em public/hero.png
  HERO_FLOATING_HEAD: "/hero.png",

  // Foto principal na seção "Sobre Mim" — ideal: headshot profissional
  // Trocar: salve o arquivo em public/about.png
  ABOUT_PHOTO: "/about.png",

  // Função para gerar imagens de projetos (usando o título como semente)
  PROJECT_THUMBNAIL: (seed: string) => `https://picsum.photos/seed/${seed}/800/500`,
};

// GitHub auto-fetch: projetos com este tópico aparecem na aba de Projetos
// Para destacar um repo: GitHub → Manage topics → adicione "portfolio"
export const GITHUB_USERNAME = "Ezequiel-o-Rodrigues";
export const GITHUB_PORTFOLIO_TOPIC = "portfolio";

export const SOCIAL_LINKS = {
  INSTAGRAM: "https://www.instagram.com/ezequiel.o.rod",
  LINKEDIN: "https://linkedin.com/in/ezequiel-oliveira-rodrigues-710859332",
  GITHUB: "https://github.com/Ezequiel-o-Rodrigues",
  EMAIL: "mailto:ezequielrod2020@gmail.com",
  WHATSAPP: "tel:+5564992070004",
};
