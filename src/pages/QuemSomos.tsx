import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamMember from "@/components/TeamMember";
import { Helmet } from "react-helmet-async";

const teamMembers = [
  {
    name: "Helena Cuppari",
    title: "Terapeuta Integrativa",
    description: "Terapeuta Integrativa, com formação em Medicina Tradicional Chinesa – MTC. Formação acadêmica em Iridologia, diagnóstico da íris, e Graduação em Terapias integrativas e complementares. Possui especialização em Auriculoterapia e outros cursos na área da MTC. Atua com foco no diagnóstico, na prevenção e no tratamento de sintomatologias, aplicando as diversas técnicas da MTC, como auriculo, irisdiagnose, acupuntura, moxa, dietoterapia e outras.",
    whatsapp: "051 99901-0411",
    image: "https://emannare.com.br/wp-content/uploads/2023/04/foto-mariahelena-1.png",
  },
  {
    name: "Márcia Cristina Issa",
    title: "Fisioterapeuta",
    description: "Formada pela UFRGS em Fisioterapia, com Pós graduação em fisioterapia neurofuncional no paciente adulto. Com experiência na prestação de atendimento voltado para prevenção, diagnóstico e tratamento de disfunções causadas por lesões neurológicas, realizando técnicas para restauração e desenvolvimento da capacidade física e funcional do paciente e experiência profissional na área ortopédica e traumatologia de pacientes adulto e infantil.",
    whatsapp: "051 99306-3122",
    image: "https://emannare.com.br/wp-content/uploads/2023/05/foto-marcia.png",
  },
];

const QuemSomos = () => {
  return (
    <>
      <Helmet>
        <title>Quem Somos - Emannare | Nossa Equipe de Terapeutas</title>
        <meta
          name="description"
          content="Conheça nossa equipe de profissionais especializados em terapias integrativas e complementares em Porto Alegre."
        />
      </Helmet>

      <Header />

      <main className="pt-20 md:pt-24 min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Quem Somos
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Somos um núcleo de profissionais dedicados a promover saúde e bem-estar 
              através de terapias integrativas e complementares.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                Nossa Missão
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                O nome Emannare vem do latim e significa "emanar", "fluir". Acreditamos que a 
                saúde é resultado do livre fluxo de energia vital em nosso corpo. Quando há 
                bloqueios ou desequilíbrios nesse fluxo, surgem as doenças.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Nossa missão é ajudar você a restaurar esse equilíbrio natural, utilizando 
                técnicas ancestrais da Medicina Tradicional Chinesa combinadas com abordagens 
                modernas de cuidado integral.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                Nossa Equipe
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </div>

            <div className="space-y-20 md:space-y-32 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={member.name}
                  {...member}
                  reverse={index % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                Nossos Valores
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">Cuidado Integral</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Tratamos o ser humano como um todo, considerando corpo, mente e espírito.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">Excelência</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Buscamos constante aperfeiçoamento em nossas técnicas e conhecimentos.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💜</span>
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">Acolhimento</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Oferecemos um ambiente seguro e acolhedor para sua jornada de cura.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default QuemSomos;
