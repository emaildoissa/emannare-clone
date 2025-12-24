import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Ear, Apple, Flower2, Eye, Flame, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const therapies = [
  {
    id: "acupuntura",
    title: "Acupuntura",
    icon: Sparkles,
    description: "A acupuntura é uma técnica milenar da Medicina Tradicional Chinesa que utiliza agulhas finas em pontos específicos do corpo para equilibrar a energia vital (Qi) e promover a saúde.",
    benefits: ["Alívio de dores crônicas", "Redução do estresse", "Melhora do sono", "Equilíbrio emocional"],
  },
  {
    id: "auriculoterapia",
    title: "Auriculoterapia",
    icon: Ear,
    description: "Técnica que utiliza pontos específicos na orelha para tratar diversas condições do corpo. A orelha é um microssistema que reflete todo o organismo.",
    benefits: ["Tratamento de vícios", "Controle da ansiedade", "Alívio de dores", "Regulação hormonal"],
  },
  {
    id: "dietoterapia",
    title: "Dietoterapia",
    icon: Apple,
    description: "A dietoterapia chinesa utiliza os alimentos como medicina, considerando suas propriedades energéticas para equilibrar o organismo.",
    benefits: ["Melhora da digestão", "Aumento da energia", "Fortalecimento imunológico", "Equilíbrio do peso"],
  },
  {
    id: "florais-de-bach",
    title: "Florais de Bach",
    icon: Flower2,
    description: "Sistema de cura natural desenvolvido pelo Dr. Edward Bach, utilizando essências florais para tratar estados emocionais e mentais.",
    benefits: ["Equilíbrio emocional", "Redução da ansiedade", "Melhora do humor", "Desenvolvimento pessoal"],
  },
  {
    id: "iridiagnose",
    title: "Iridiagnose",
    icon: Eye,
    description: "Método de avaliação da saúde através da análise da íris, que reflete condições do organismo e predisposições constitucionais.",
    benefits: ["Diagnóstico preventivo", "Identificação de desequilíbrios", "Orientação terapêutica", "Acompanhamento de tratamentos"],
  },
  {
    id: "moxa",
    title: "Moxa",
    icon: Flame,
    description: "Técnica de aquecimento de pontos de acupuntura utilizando a erva Artemísia, promovendo o fluxo de energia e aquecendo o organismo.",
    benefits: ["Fortalecimento da imunidade", "Alívio de dores articulares", "Melhora da circulação", "Aquecimento do organismo"],
  },
];

const Terapias = () => {
  return (
    <>
      <Helmet>
        <title>Terapias Integrativas - Emannare | Acupuntura, Auriculoterapia e mais</title>
        <meta
          name="description"
          content="Conheça nossas terapias integrativas: Acupuntura, Auriculoterapia, Dietoterapia, Florais de Bach, Iridiagnose e Moxa."
        />
      </Helmet>

      <Header />

      <main className="pt-20 md:pt-24 min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Nossas Terapias
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Oferecemos diversas técnicas da Medicina Tradicional Chinesa e terapias complementares 
              para harmonizar suas energias e promover saúde integral.
            </p>
          </div>
        </section>

        {/* Therapies List */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {therapies.map((therapy, index) => (
                <article
                  key={therapy.id}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-16 items-center`}
                >
                  {/* Icon */}
                  <div className="w-full lg:w-1/3 flex justify-center">
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shadow-glow">
                      <therapy.icon className="w-20 h-20 md:w-28 md:h-28 text-primary" strokeWidth={1} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-2/3 text-center ${index % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}>
                    <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                      {therapy.title}
                    </h2>
                    <p className="font-body text-muted-foreground leading-relaxed mb-6">
                      {therapy.description}
                    </p>

                    {/* Benefits */}
                    <div className={`flex flex-wrap gap-2 mb-6 ${index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"} justify-center`}>
                      {therapy.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="px-4 py-2 rounded-full bg-primary/10 text-primary font-body text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/contato"
                      className="inline-flex items-center gap-2 font-body font-medium text-primary hover:text-secondary transition-colors duration-300"
                    >
                      Agendar consulta
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Terapias;
