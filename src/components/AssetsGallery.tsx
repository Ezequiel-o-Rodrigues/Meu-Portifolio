import React from 'react';
import { IMAGES, SOCIAL_LINKS } from '../constants';
import { ArrowLeft, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const AssetCard = ({ title, url, description }: { title: string, url: string, description: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/10 flex flex-col h-full">
      <div className="aspect-video bg-black/40 relative group overflow-hidden">
        <img 
          src={url} 
          alt={title} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <a href={url} target="_blank" rel="noreferrer" className="p-3 bg-primary rounded-full text-white hover:scale-110 transition-transform">
            <ExternalLink size={20} />
          </a>
          <button onClick={copyToClipboard} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:scale-110 transition-transform">
            {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
          </button>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-display font-bold text-white mb-2 uppercase tracking-tight">{title}</h3>
        <p className="text-white/50 text-xs mb-4 flex-1">{description}</p>
        <div className="mt-auto">
          <code className="block w-full p-2 bg-black/30 rounded text-[10px] text-primary/80 break-all font-mono">
            {url}
          </code>
        </div>
      </div>
    </div>
  );
};

export const AssetsGallery = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-6 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Voltar ao Site
            </a>
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter">
              Galeria de <span className="text-primary">Assets</span>
            </h1>
            <p className="text-white/40 mt-4 max-w-2xl">
              Visualize e gerencie todas as imagens do seu portfólio. Para alterar qualquer imagem, edite o arquivo <code className="text-primary/60">src/constants.ts</code>.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl border-white/5">
            <h2 className="text-xs font-display font-bold uppercase tracking-widest text-primary mb-4">Links Sociais</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {Object.entries(SOCIAL_LINKS).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase">{key}</span>
                  <a href={value} target="_blank" rel="noreferrer" className="text-xs hover:text-primary transition-colors truncate max-w-[150px]">
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AssetCard 
            title="Avatar da Navegação" 
            url={IMAGES.NAV_AVATAR} 
            description="A pequena foto circular que aparece no canto superior esquerdo da barra de navegação."
          />
          <AssetCard 
            title="Cabeça Flutuante (Hero)" 
            url={IMAGES.HERO_FLOATING_HEAD} 
            description="A imagem principal estilizada que flutua na seção inicial do site."
          />
          <AssetCard 
            title="Foto Sobre Mim" 
            url={IMAGES.ABOUT_PHOTO} 
            description="A foto profissional que aparece na seção 'Sobre Mim'."
          />
          <AssetCard 
            title="Exemplo: Thumbnail de Projeto" 
            url={IMAGES.PROJECT_THUMBNAIL("Portfolio")} 
            description="Exemplo de como as imagens dos projetos são geradas automaticamente. Você pode definir URLs fixas no constants.ts se preferir."
          />
        </div>

        <footer className="mt-24 pt-8 border-t border-white/5 text-center text-white/20 text-xs">
          <p>© 2026 Ezequiel Rodrigues • Painel de Gerenciamento de Assets</p>
        </footer>
      </div>
    </div>
  );
};
