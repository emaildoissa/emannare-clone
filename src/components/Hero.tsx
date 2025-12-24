import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fade-up">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground mb-4 drop-shadow-lg">
          Emannare
        </h1>
        <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-primary-foreground/90 drop-shadow-md">
          Núcleo de Terapias Integrativas e Complementares
        </p>
      </div>

      {/* Decorative Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-primary-foreground/80"
        >
          <path 
            d="M12 5v14M19 12l-7 7-7-7" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
