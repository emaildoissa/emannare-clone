import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { WooProduct, wooCommerce } from "@/services/woocommerce";
import { Search, ShoppingBag, Sparkles, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";

const Loja = () => {
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProducts = await wooCommerce.getProducts({ per_page: 50 });
        setProducts(fetchedProducts);
        console.log(`Loaded ${fetchedProducts.length} products from WooCommerce`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
        console.error('Error loading products:', errorMessage);
        setError(errorMessage);
        toast({
          title: "Erro ao carregar produtos",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [toast]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Loja - Emannare | Produtos Naturais e Terapêuticos</title>
        <meta
          name="description"
          content="Confira nossa loja de produtos naturais para bem-estar: florais de Bach, óleos essenciais, chás e mais."
        />
      </Helmet>

      <Header />

      <main className="pt-20 md:pt-24 min-h-screen bg-background">
        {/* Hero Section - Elegant gradient with decorative elements */}
        <section className="relative overflow-hidden py-20 md:py-28">
          {/* Decorative Background */}
          <div className="absolute inset-0 gradient-hero opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          
          {/* Floating decorative elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '-1.5s' }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-up">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-body text-sm text-primary font-medium">Produtos Artesanais</span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                Nossa <span className="gradient-text">Loja</span>
              </h1>
              
              <p className="font-body text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
                Produtos naturais selecionados com amor e intenção para seu bem-estar, 
                equilíbrio energético e harmonia interior.
              </p>

              {/* Search - Enhanced design */}
              <div className="relative max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full blur-xl opacity-50" />
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 pr-6 h-14 rounded-full border-2 border-primary/20 bg-card/80 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 text-base shadow-soft transition-all duration-300"
                  />
                </div>
              </div>

              {/* Stats/Features */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Leaf className="w-5 h-5 text-primary" />
                  <span className="font-body text-sm">100% Natural</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span className="font-body text-sm">Feito à Mão</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                  <span className="font-body text-sm">Envio Seguro</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            {!isLoading && !error && filteredProducts.length > 0 && (
              <div className="text-center mb-12">
                <p className="font-body text-sm text-primary uppercase tracking-widest mb-2">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
              </div>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
                </div>
                <p className="font-body text-muted-foreground mt-6">Carregando produtos...</p>
              </div>
            ) : error ? (
              <div className="text-center py-24">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-10 h-10 text-destructive/60" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3">
                  Erro ao carregar produtos
                </h3>
                <p className="font-body text-muted-foreground max-w-md mx-auto">
                  {error}
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground/60" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3">
                  Nenhum produto encontrado
                </h3>
                <p className="font-body text-muted-foreground">
                  Tente buscar com outros termos.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Dúvidas sobre qual produto escolher?
              </h2>
              <p className="font-body text-muted-foreground mb-6">
                Entre em contato conosco para uma consulta personalizada e descubra 
                quais produtos são ideais para você.
              </p>
              <a
                href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-medium hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Fale Conosco
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Loja;
