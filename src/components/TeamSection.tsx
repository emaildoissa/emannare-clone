import TeamMember from "./TeamMember";

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

const TeamSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            Quem Somos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Team Members */}
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
  );
};

export default TeamSection;
