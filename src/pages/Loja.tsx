import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { WooProduct } from "@/services/woocommerce";
import { Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";

// Mock products for demonstration (replace with real WooCommerce data)
const mockProducts: WooProduct[] = [
  {
    id: 1,
    name: "Kit Florais de Bach - Emergência",
    slug: "kit-florais-emergencia",
    permalink: "",
    price: "89.90",
    regular_price: "99.90",
    sale_price: "89.90",
    description: "Kit completo com florais de Bach para situações de emergência.",
    short_description: "Kit emergencial com florais selecionados.",
    images: [{ id: 1, src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400", alt: "Florais de Bach" }],
    categories: [{ id: 1, name: "Florais", slug: "florais" }],
    stock_status: "instock",
    stock_quantity: 10,
    attributes: [],
  },
  {
    id: 2,
    name: "Óleo Essencial de Lavanda",
    slug: "oleo-essencial-lavanda",
    permalink: "",
    price: "45.00",
    regular_price: "45.00",
    sale_price: "",
    description: "Óleo essencial puro de lavanda para aromaterapia.",
    short_description: "Óleo essencial 100% puro.",
    images: [{ id: 2, src: "https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=400", alt: "Óleo de Lavanda" }],
    categories: [{ id: 2, name: "Óleos Essenciais", slug: "oleos-essenciais" }],
    stock_status: "instock",
    stock_quantity: 25,
    attributes: [],
  },
  {
    id: 3,
    name: "Chá de Ervas Relaxante",
    slug: "cha-ervas-relaxante",
    permalink: "",
    price: "32.00",
    regular_price: "32.00",
    sale_price: "",
    description: "Blend especial de ervas para relaxamento e bem-estar.",
    short_description: "Chá relaxante com ervas naturais.",
    images: [{ id: 3, src: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400", alt: "Chá de Ervas" }],
    categories: [{ id: 3, name: "Chás", slug: "chas" }],
    stock_status: "instock",
    stock_quantity: 50,
    attributes: [],
  },
  {
    id: 4,
    name: "Incenso Natural Sândalo",
    slug: "incenso-sandalo",
    permalink: "",
    price: "18.00",
    regular_price: "18.00",
    sale_price: "",
    description: "Incenso natural de sândalo para meditação.",
    short_description: "Incenso 100% natural.",
    images: [{ id: 4, src: "https://images.unsplash.com/photo-1582126892906-5ba118eaf46e?w=400", alt: "Incenso" }],
    categories: [{ id: 4, name: "Incensos", slug: "incensos" }],
    stock_status: "instock",
    stock_quantity: 100,
    attributes: [],
  },
  {
    id: 5,
    name: "Cristal Ametista Polida",
    slug: "cristal-ametista",
    permalink: "",
    price: "65.00",
    regular_price: "75.00",
    sale_price: "65.00",
    description: "Ametista polida para equilíbrio energético.",
    short_description: "Cristal de ametista natural.",
    images: [{ id: 5, src: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400", alt: "Ametista" }],
    categories: [{ id: 5, name: "Cristais", slug: "cristais" }],
    stock_status: "instock",
    stock_quantity: 15,
    attributes: [],
  },
  {
    id: 6,
    name: "Vela Aromática Eucalipto",
    slug: "vela-aromatica-eucalipto",
    permalink: "",
    price: "42.00",
    regular_price: "42.00",
    sale_price: "",
    description: "Vela aromática de eucalipto para purificação do ambiente.",
    short_description: "Vela natural aromática.",
    images: [{ id: 6, src: "https://images.unsplash.com/photo-1602607234591-49b3db9b1f61?w=400", alt: "Vela Aromática" }],
    categories: [{ id: 6, name: "Velas", slug: "velas" }],
    stock_status: "instock",
    stock_quantity: 30,
    attributes: [],
  },
];

const Loja = () => {
  const [products, setProducts] = useState<WooProduct[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
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
