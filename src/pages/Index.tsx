import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TherapiesSection from "@/components/TherapiesSection";
import TeamSection from "@/components/TeamSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Emannare - Núcleo de Terapias Integrativas e Complementares</title>
        <meta 
          name="description" 
          content="Harmonizando energias e restaurando a saúde e o bem-estar através de terapias integrativas como Acupuntura, Auriculoterapia, Dietoterapia e mais." 
        />
        <meta name="keywords" content="terapias integrativas, acupuntura, medicina chinesa, bem-estar, saúde, Porto Alegre" />
      </Helmet>
      
      <Header />
      <main>
        <Hero />
        <TherapiesSection />
        <TeamSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
