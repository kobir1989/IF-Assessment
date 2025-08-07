export interface Player {
  player1: string;
  player2: string;
}

// Base interface for common fields
export interface BaseEntity {
  id: number;
  name: string;
  slug: string;
}

export interface Category extends BaseEntity {
  image: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt?: string;
  updatedAt?: string;
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

// Generic API request interfaces
export interface ApiRequest<T = Record<string, unknown>> {
  params?: T;
}

export interface ApiRequestWithBody<TBody, TParams = Record<string, unknown>>
  extends ApiRequest<TParams> {
  body: TBody;
}

export interface ApiRequestWithId<TParams = Record<string, unknown>> extends ApiRequest<TParams> {
  productId: string | number;
}

// API request types
export type GetProductsRequest = ApiRequest<ProductsQueryParams>;
export type CreateProductRequest = ApiRequestWithBody<ProductsRequestBody>;
export type UpdateProductRequest = ApiRequestWithId & { body: Partial<ProductsRequestBody> };
export type ProductIdParams = ApiRequestWithId;

// API Response Types
export interface ProductsResponse extends Partial<ProductsQueryParams> {
  products?: Product[];
  total?: number;
}
