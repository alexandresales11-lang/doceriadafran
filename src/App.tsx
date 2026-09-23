import React, { useState, useEffect, useMemo } from 'react';
import { Search, Sparkles, Filter, X, Check, Heart, Cake } from 'lucide-react';
import { Product, CartItem, ProductCategory } from './types';
import { PRODUCTS, CATEGORIES, STORE_CONFIG } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { PoliciesSection } from './components/PoliciesSection';
import { AboutFran } from './components/AboutFran';
import { Footer } from './components/Footer';
import { FloatingCartButton } from './components/FloatingCartButton';

const CART_STORAGE_KEY = 'doceria_da_fran_cart_v1';

export default function App() {
  // Cart state with localStorage restoration
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Category and search filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage quota issues
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, notes?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          notes: notes || updated[existingIndex].notes,
        };
        return updated;
      }
      return [...prev, { product, quantity, notes }];
    });
    showToast(`"${product.name}" adicionado à sacola!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Total calculations
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'todos' || product.category === selectedCategory;

      if (!matchesCategory) return false;

      // Search match
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inName = product.name.toLowerCase().includes(q);
      const inDesc = product.description.toLowerCase().includes(q);
      const inIngredients = product.ingredients.some((ing) => ing.toLowerCase().includes(q));

      return inName || inDesc || inIngredients;
    });
  }, [selectedCategory, searchQuery]);

  const scrollToMenu = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFD] text-[#3D2C35]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-[#3B1A28] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#BE185D] flex items-center justify-center text-white shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={scrollToMenu}
      />

      {/* Hero Section */}
      <Hero onScrollToMenu={scrollToMenu} />

      {/* Main Catalog Section */}
      <main id="catalogo" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        
        {/* Section Heading & Tagline */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#C084FC]">
            <Cake className="w-4 h-4 text-[#BE185D]" />
            <span>Cardápio Artesanal Fran</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3B1A28]">
            Escolha Seus Doces & Bolos Favoritos
          </h2>
          <p className="text-xs sm:text-sm text-[#735A68]">
            Produção fresca com massas leves, recheios fartos e acabamento de alta confeitaria em Jacobina.
          </p>
        </div>

        {/* Search Bar & Category Navigation Controls */}
        <div className="space-y-6 mb-10">
          
          {/* Real-time search bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A8909E]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome ou ingrediente (ex: ninho, nutella, cenoura...)"
              className="w-full text-xs sm:text-sm pl-10 pr-9 py-3 rounded-full bg-white border border-[#E9D5FF] focus:border-[#C084FC] focus:outline-none focus:ring-3 focus:ring-[#C084FC]/20 text-[#3B1A28] placeholder:text-[#A8909E] shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#A8909E] hover:text-[#3B1A28]"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C084FC] to-[#BE185D] text-white shadow-xs shadow-[#BE185D]/20 scale-102'
                      : 'bg-white text-[#6B5561] hover:text-[#BE185D] hover:bg-[#FCE7F3]/40 border border-[#F3E8FF]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter / Filter status */}
        <div className="flex items-center justify-between text-xs text-[#8C7080] mb-6 px-1">
          <span>
            Mostrando <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'delícia disponível' : 'delícias disponíveis'}
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="text-[#BE185D] hover:underline font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#F3E8FF] p-8 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF5F8] flex items-center justify-center text-[#C084FC]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B1A28]">
              Nenhum doce encontrado para "{searchQuery}"
            </h3>
            <p className="text-xs text-[#7A6472]">
              Tente buscar por outro sabor, ingrediente ou explore todas as categorias do cardápio.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#C084FC] to-[#BE185D] rounded-full hover:opacity-95 transition-opacity"
            >
              Ver Todo o Cardápio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const inCart = cart.find((it) => it.product.id === product.id);
              const quantityInCart = inCart ? inCart.quantity : 0;

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantityInCart={quantityInCart}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                />
              );
            })}
          </div>
        )}

      </main>

      {/* About Fran Section */}
      <AboutFran />

      {/* Order Policies & PIX Information */}
      <PoliciesSection />

      {/* Minimalist Footer */}
      <Footer />

      {/* Floating Action Button for Cart */}
      <FloatingCartButton
        itemCount={totalCartCount}
        totalAmount={totalCartAmount}
        onClick={() => setIsCartOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
