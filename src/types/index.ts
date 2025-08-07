export interface Player {
  player1: string;
  player2: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image?: string;
    slug: string;
  };
  creationAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface ProductsRequestBody {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

// API Query Parameters
export interface ProductsQueryParams {
  limit?: number;
  offset?: number;
  categoryId?: number;
  price_min?: number;
  price_max?: number;
  title?: string;
}

export interface ProductByIdParams {
  productId: string | number;
  params?: Record<string, any>;
}

// API Request Bodies
export interface CreateProductRequest {
  body: ProductsRequestBody;
  params?: Record<string, any>;
}

export interface UpdateProductRequest {
  body: Partial<ProductsRequestBody>;
  productId: string | number;
}

export interface DeleteProductRequest {
  productId: string | number;
}

// API Response Types
export interface ProductsResponse {
  products?: Product[];
  total?: number;
  limit?: number;
  offset?: number;
  title?: string;
}

export interface GetProductsRequest {
  params?: ProductsQueryParams;
}
