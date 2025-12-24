import { Sparkles, Ear, Apple, Flower2, Eye, Flame } from "lucide-react";
import TherapyCard from "./TherapyCard";

const therapies = [
  { title: "Acupuntura", icon: Sparkles, href: "/terapias/acupuntura" },
  { title: "Auriculoterapia", icon: Ear, href: "/terapias/auriculoterapia" },
  { title: "Dietoterapia", icon: Apple, href: "/terapias/dietoterapia" },
  { title: "Florais de Bach", icon: Flower2, href: "/terapias/florais-de-bach" },
  { title: "Iridiagnose", icon: Eye, href: "/terapias/iridiagnose" },
  { title: "Moxa", icon: Flame, href: "/terapias/moxa" },
];

const TherapiesSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
            Saúde e Energia
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            A causa fundamental do aparecimento e desenvolvimento das doenças é resultado do 
            desequilíbrio das energias que percorrem nosso corpo. As terapias integrativas 
            trabalham para harmonizar as energias e restaurar a saúde e o bem-estar.
          </p>
        </div>

        {/* Therapy Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {therapies.map((therapy, index) => (
            <TherapyCard
              key={therapy.title}
              {...therapy}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TherapiesSection;
