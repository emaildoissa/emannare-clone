import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Plus, Minus, Trash2, ExternalLink, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, itemCount, total, updateQuantity, removeFromCart, clearCart } = useCart();

  // Transform localhost URLs to use ngrok for development
  const transformImageUrl = (url: string) => {
    if (!url) return "/placeholder.svg";
    const ngrokUrl = "https://0a30aa5eac4e.ngrok-free.app";
    return url
      .replace(/https?:\/\/localhost:8000/g, ngrokUrl)
      .replace(/http:\/\/localhost:8000/g, ngrokUrl);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    // Build WooCommerce cart URL with products
    // The cart URL format depends on your WooCommerce setup
    const ngrokUrl = "https://0a30aa5eac4e.ngrok-free.app";
    
    // Create cart URL - adds products to WooCommerce cart and redirects to checkout
    const cartParams = items.map(item => `add-to-cart=${item.product.id}&quantity=${item.quantity}`).join('&');
    const checkoutUrl = `${ngrokUrl}/?${cartParams}`;
    
    // Open in new tab
    window.open(checkoutUrl, '_blank');
    
    toast.success("Redirecionando para o checkout...");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Carrinho limpo!");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="relative p-2 text-foreground/80 hover:text-primary transition-colors duration-300"
          aria-label="Abrir carrinho"
        >
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Seu Carrinho
            <span className="text-sm font-body text-muted-foreground font-normal">
              ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingCart className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">
              Carrinho vazio
            </h3>
            <p className="font-body text-muted-foreground text-center max-w-xs">
              Adicione produtos ao seu carrinho para continuar.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setIsOpen(false)}
            >
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-xl bg-muted/30 border border-border/50"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={transformImageUrl(item.product.images[0]?.src)}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm text-foreground line-clamp-2 leading-tight mb-1">
                      {item.product.name}
                    </h4>
                    <p className="font-body text-sm font-semibold text-primary">
                      {formatPrice(parseFloat(item.product.price))}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-body text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          removeFromCart(item.product.id);
                          toast.success("Produto removido do carrinho");
                        }}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remover produto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border pt-4 space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="font-body text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-semibold text-foreground">
                  {formatPrice(total)}
                </span>
              </div>

              <p className="font-body text-xs text-muted-foreground text-center">
                Frete calculado no checkout
              </p>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Finalizar Compra
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Continuar Comprando
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClearCart}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
