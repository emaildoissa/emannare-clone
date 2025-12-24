import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl mb-4">Emannare</h3>
            <p className="font-body text-sm text-background/70 leading-relaxed">
              Núcleo de Terapias Integrativas e Complementares. 
              Harmonizando energias e restaurando o bem-estar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-4">Links Rápidos</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/terapias" className="font-body text-sm text-background/70 hover:text-background transition-colors">
                Terapias
              </Link>
              <Link to="/quem-somos" className="font-body text-sm text-background/70 hover:text-background transition-colors">
                Quem Somos
              </Link>
              <Link to="/leituras" className="font-body text-sm text-background/70 hover:text-background transition-colors">
                Leituras
              </Link>
              <Link to="/loja" className="font-body text-sm text-background/70 hover:text-background transition-colors">
                Loja
              </Link>
              <Link to="/contato" className="font-body text-sm text-background/70 hover:text-background transition-colors">
                Contato
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-4">Contato</h4>
            <div className="space-y-3">
              <a 
                href="https://wa.me/5551999010411" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-background/70 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4" />
                (51) 99901-0411
              </a>
              <a 
                href="mailto:contato@emannare.com.br"
                className="flex items-center gap-3 font-body text-sm text-background/70 hover:text-background transition-colors"
              >
                <Mail className="w-4 h-4" />
                contato@emannare.com.br
              </a>
              <div className="flex items-center gap-3 font-body text-sm text-background/70">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Porto Alegre, RS
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="font-body text-sm text-background/50">
            © {new Date().getFullYear()} Emannare. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
