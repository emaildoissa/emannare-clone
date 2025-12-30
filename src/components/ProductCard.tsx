import { WooProduct } from "@/services/woocommerce";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  product: WooProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  // Transform localhost URLs to use ngrok for development
  const transformImageUrl = (url: string) => {
    if (!url) return "/placeholder.svg";
    // Replace localhost:8000 with the ngrok URL (development only)
    const ngrokUrl = "https://0a30aa5eac4e.ngrok-free.app";
    return url
      .replace(/https?:\/\/localhost:8000/g, ngrokUrl)
      .replace(/http:\/\/localhost:8000/g, ngrokUrl);
  };
  
  const mainImage = transformImageUrl(product.images[0]?.src) || "/placeholder.svg";
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numPrice);
  };

  const hasDiscount = product.sale_price && product.regular_price !== product.sale_price;
  const discountPercentage = hasDiscount
    ? Math.round((1 - parseFloat(product.sale_price) / parseFloat(product.regular_price)) * 100)
    : 0;

  return (
    <Link to={`/loja/produto/${product.slug}`} className="group block h-full">
      <article className="h-full bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 border border-border/50 hover:border-primary/30">
        {/* Image Container */}
        <div className="aspect-[4/5] overflow-hidden relative bg-muted/30">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-glow translate-y-4 group-hover:translate-y-0"
            aria-label="Adicionar ao carrinho"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {hasDiscount && (
              <div className="px-3 py-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                -{discountPercentage}%
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          {product.categories[0] && (
            <span className="font-body text-xs text-primary uppercase tracking-widest font-medium">
              {product.categories[0].name}
            </span>
          )}
          
          {/* Title */}
          <h3 className="font-display text-xl text-card-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-display text-2xl font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="font-body text-sm text-muted-foreground line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="w-full rounded-full border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn"
          >
            <ShoppingCart className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
