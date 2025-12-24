import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Helmet } from "react-helmet-async";

const blogPosts = [
  {
    title: "Iridologia: revisão sistemática",
    excerpt: "Este estudo é uma revisão de literatura (artigos) no período de 1970 a 2005 sobre Iridologia / Irisdiagnose, com o objetivo de identificar as publicações disponíveis, verificando se houve validação científica para a metodologia.",
    date: "28 de abril de 2023",
    image: "https://emannare.com.br/wp-content/uploads/2023/04/ss.png",
    slug: "iridologia-revisao-sistematica",
  },
  {
    title: "Nutrição e estados de humor: da medicina chinesa antiga à Neurociência",
    excerpt: "Atualmente nota-se uma tendência de síntese de diretrizes terapêuticas orientais e ocidentais que têm como princípio a utilização do alimento como remédio e do remédio como alimento.",
    date: "28 de abril de 2023",
    image: "https://emannare.com.br/wp-content/uploads/2023/04/ca5900_afe63699d30b4819b4af6d27b2c7b722mv2.webp",
    slug: "nutricao-estados-de-humor",
  },
  {
    title: "Personalidades segundo os Cinco Elementos da Medicina Tradicional Chinesa",
    excerpt: "Em diferentes épocas, autores de diversos ramos das ciências tentaram classificar os tipos humanos segundo certas características gerais. A Medicina Tradicional Chinesa também possui seu sistema de classificação.",
    date: "28 de abril de 2023",
    image: "https://emannare.com.br/wp-content/uploads/2023/04/dd.png",
    slug: "personalidades-cinco-elementos",
  },
  {
    title: "Acupuntura e Psicologia: um estudo dos cinco elementos",
    excerpt: "A aproximação das ciências ocidentais e das tradições orientais busca conhecer o ser humano como um todo, com a intenção de descobrir a conexão entre os diversos aspectos da existência humana.",
    date: "28 de abril de 2023",
    image: "https://emannare.com.br/wp-content/uploads/2023/04/ed.png",
    slug: "acupuntura-psicologia",
  },
];

const Leituras = () => {
  return (
    <>
      <Helmet>
        <title>Leituras - Emannare | Artigos sobre Terapias Integrativas</title>
        <meta
          name="description"
          content="Explore nossos artigos e leituras sobre terapias integrativas, medicina chinesa, acupuntura e bem-estar."
        />
      </Helmet>

      <Header />

      <main className="pt-20 md:pt-24 min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Leituras
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Cuide da saúde do seu corpo e da sua mente. Explore nossos artigos e leituras 
              para saber mais sobre os benefícios dos tratamentos que disponibilizamos.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Leituras;
