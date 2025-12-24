import BlogCard from "./BlogCard";

const blogPosts = [
  {
    title: "Iridologia: revisão sistemática",
    excerpt: "Este estudo é uma revisão de literatura (artigos) no período de 1970 a 2005 sobre Iridologia / Irisdiagnose, com o objetivo de identificar...",
    date: "28 de abril de 2023",
    image: "https://emannare.com.br/wp-content/uploads/2023/04/ss.png",
    slug: "iridologia-revisao-sistematica",
  },
  {
    title: "Nutrição e estados de humor: da medicina chinesa antiga à Neurociência",
    excerpt: "Atualmente nota-se uma tendência de síntese de diretrizes terapêuticas orientais e ocidentais que têm como princípio a utilização do alim...",
    date: "28 de abril de 2023",
    image: "https://emannare.com.br/wp-content/uploads/2023/04/ca5900_afe63699d30b4819b4af6d27b2c7b722mv2.webp",
    slug: "nutricao-estados-de-humor",
  },
  {
    title: "Personalidades segundo os Cinco Elementos da Medicina Tradicional Chinesa",
    excerpt: "Em diferentes épocas, autores de diversos ramos das ciências tentaram classificar os tipos humanos segundo certas características gerais...",
    date: "28 de abril de 2023",
    image: "https://emannare.com.br/wp-content/uploads/2023/04/dd.png",
    slug: "personalidades-cinco-elementos",
  },
  {
    title: "Acupuntura e Psicologia: um estudo dos cinco elementos",
    excerpt: "A aproximação das ciências ocidentais e das tradições orientais busca conhecer o ser humano como um todo, com a intenção de descobrir a c...",
    date: "28 de abril de 2023",
    image: "https://emannare.com.br/wp-content/uploads/2023/04/ed.png",
    slug: "acupuntura-psicologia",
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
            Leituras
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            Cuide da saúde do seu corpo e da sua mente. Explore nossos artigos e leituras 
            para saber mais sobre os benefícios dos tratamentos que disponibilizamos.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
