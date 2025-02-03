export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  rating: number | null;
  thumbnail: string;
  isVerified: boolean;
  vendorId: string;
  brand?: string | null;
  orderId: string | null;
  variant: string | null;
  createdAt: string;
  updatedAt: string;
};
