/**
 * Centralização de Imagens e Links para fácil edição
 * Altere as URLs abaixo para atualizar as imagens em todo o site.
 */

export const IMAGES = {
  // Foto de perfil pequena na barra de navegação
  NAV_AVATAR: "input_file_0.png",
  
  // Cabeça flutuante estilizada na seção inicial (Hero)
  HERO_FLOATING_HEAD: "input_file_0.png",
  
  // Foto principal na seção "Sobre Mim"
  ABOUT_PHOTO: "input_file_1.png",
  
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
