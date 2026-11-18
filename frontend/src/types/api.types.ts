/**
 * Nana Creative API Types
 * Inferred and generated from NestJS Swagger / OpenAPI specification:
 * https://nana-backend-2jvy.onrender.com/docs & /docs-json
 */

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageKey?: string;
  createdAt: string;
  updatedAt: string;
  signedImageUrl?: string;
}

export interface CreatePostDto {
  title: string;
  description: string;
  file?: File | Blob;
}

export interface UpdatePostDto {
  title?: string;
  description?: string;
  file?: File | Blob;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

/**
 * UI Presentation enhancements for Blog Post
 */
export interface BlogPostWithMeta extends BlogPost {
  category: string;
  readTimeMinutes: number;
  formattedDate: string;
}

/**
 * AI Chat DTOs
 * Endpoint: POST /chat
 */
export interface ChatRequestDto {
  message: string;
}

export interface ChatResponseDto {
  status: string;
  reply: string;
}

/**
 * Contact / Request DTOs
 * Endpoint: POST /contacts, GET /contacts, GET /contacts/{id}
 */
export interface CreateContactDto {
  name: string;
  phone: string;
  companyName: string;
  service: string;
  message: string;
}

export interface ContactResponseDto {
  id: string;
  name: string;
  phone: string;
  companyName: string;
  service: string;
  message: string;
  createdAt: string;
}

export interface UpdateContactDto {
  name?: string;
  phone?: string;
  companyName?: string;
  service?: string;
  message?: string;
}
