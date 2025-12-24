import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { WooProduct, wooCommerce } from "@/services/woocommerce";
import { Search, ShoppingBag } from "lucide-react";
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
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                Nossa Loja
              </h1>
              <p className="font-body text-muted-foreground mb-8">
                Produtos naturais selecionados para seu bem-estar e equilíbrio energético.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full border-border/50 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mb-4" />
                <p className="font-body text-muted-foreground">Carregando produtos...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-16 h-16 text-destructive/50 mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">
                  Erro ao carregar produtos
                </h3>
                <p className="font-body text-muted-foreground">
                  {error}
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="font-body text-muted-foreground">
                  Tente buscar com outros termos.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* WooCommerce Integration Note */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-body text-sm text-muted-foreground">
                Esta loja está preparada para integração com WooCommerce. 
                Configure suas credenciais de API para sincronizar produtos reais.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Loja;
