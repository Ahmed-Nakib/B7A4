export interface TCreateService {
  title: string;
  description: string;
  price: number;
  duration: number;
  categoryId: string;
  isAvailable?: boolean;
}

export interface TUpdateService {
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  categoryId?: string;
  isAvailable?: boolean;
}