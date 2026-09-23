export type ProductCategory = 
  | 'todos'
  | 'bolos-vulcao'
  | 'bolos-tradicionais'
  | 'tortas-gourmet'
  | 'docinhos-festa'
  | 'especiais';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  description: string;
  ingredients: string[];
  servings: string;
  leadTime: string; // e.g. "Encomenda com 24h", "Pronta Entrega"
  image: string;
  highlightBadge?: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type DeliveryMethod = 'retirada' | 'entrega';
export type PaymentMethod = 'pix' | 'cartao' | 'dinheiro';

export interface OrderFormState {
  customerName: string;
  customerPhone: string;
  deliveryMethod: DeliveryMethod;
  address: string;
  neighborhood: string;
  referencePoint: string;
  preferredDate: string;
  preferredTime: string;
  paymentMethod: PaymentMethod;
  specialNotes: string;
}
