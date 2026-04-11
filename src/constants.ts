/**
 * Centralização de Imagens e Links para fácil edição
 */

// GitHub auto-fetch: projetos com este tópico aparecem na aba de Projetos
// Para destacar um repo: GitHub → Manage topics → adicione "portfolio"
export const GITHUB_USERNAME = "Ezequiel-o-Rodrigues";
export const GITHUB_PORTFOLIO_TOPIC = "portfolio";

export const IMAGES = {
  // Avatar de perfil (morphing hero→nav). Puxa direto do GitHub.
  // Pra trocar: mude a foto no GitHub (Settings → Profile → Profile picture).
  NAV_AVATAR: `https://github.com/${GITHUB_USERNAME}.png?size=460`,
  HERO_FLOATING_HEAD: `https://github.com/${GITHUB_USERNAME}.png?size=460`,

  // Foto principal na seção "Sobre Mim" — headshot profissional local
  // Pra trocar: salve o arquivo em public/about.png
  ABOUT_PHOTO: "/about.png",

  // Função para gerar imagens de projetos (usando o título como semente)
  PROJECT_THUMBNAIL: (seed: string) => `https://picsum.photos/seed/${seed}/800/500`,
};

export const SOCIAL_LINKS = {
  INSTAGRAM: "https://www.instagram.com/ezequiel.o.rod",
  LINKEDIN: "https://linkedin.com/in/ezequiel-oliveira-rodrigues-710859332",
  GITHUB: "https://github.com/Ezequiel-o-Rodrigues",
  EMAIL: "mailto:ezequielrod2020@gmail.com",
  WHATSAPP: "tel:+5564992070004",
};
