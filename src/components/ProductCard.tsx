import { WooProduct } from "@/services/woocommerce";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Plus } from "lucide-react";
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

  return (
    <Link to={`/loja/produto/${product.slug}`} className="group block">
      <article className="h-full bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500">
        {/* Image */}
        <div className="aspect-square overflow-hidden relative">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
            aria-label="Adicionar ao carrinho"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Sale Badge */}
          {product.sale_price && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
              Promoção
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          {product.categories[0] && (
            <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
              {product.categories[0].name}
            </span>
          )}
          
          {/* Title */}
          <h3 className="font-display text-lg text-card-foreground mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-body text-lg font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.sale_price && product.regular_price !== product.sale_price && (
              <span className="font-body text-sm text-muted-foreground line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
