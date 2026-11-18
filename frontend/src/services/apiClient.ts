import {
  BlogPost,
  ChatRequestDto,
  ChatResponseDto,
  CreateContactDto,
  ContactResponseDto,
} from "@/types/api.types";

const FALLBACK_API_URL = "https://nana-backend-2jvy.onrender.com";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || FALLBACK_API_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public endpoint: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Curated dispatch fallback dataset adhering to the Swagger API BlogPost schema.
 * Ensures the editorial interface displays rich content during offline builds or
 * when the Render backend instance is cold-starting.
 */
export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "dispatch-01",
    title: "The Architecture of Viral Video Hooks: Engineering 29,000 Views in Dire Dawa",
    description:
      "In the modern short-form attention economy, the opening 1.8 seconds dictate total commercial return. At Nana Creative, we engineer visual hooks through lighting contrasts, dynamic camera movements on the DJI RS 3/4, and auditory focal points using Hollyland wireless capture. This dispatch explores the exact pre-production frameworks behind our highest-retention client campaigns across Ethiopia.",
    imageUrl: "/images/gear-canon.jpg",
    createdAt: "2026-11-12T10:00:00.000Z",
    updatedAt: "2026-11-12T10:00:00.000Z",
  },
  {
    id: "dispatch-02",
    title: "Clinical Authority Positioning: Why Healthcare Brands Cannot Market Like Consumer FMCGs",
    description:
      "When positioning specialized medical and dental institutions like Dr. KeFelegn Dental Clinic and Bright Aesthetics, conventional marketing funnels fail. Trust, clinical precision, patient confidentiality, and medical authority require cinema-grade lighting, structured expert interviews, and ethical educational frameworks that convert patients without compromising reputation.",
    imageUrl: "/images/portfolio/dr-kefelegn.jpg",
    createdAt: "2026-11-08T14:30:00.000Z",
    updatedAt: "2026-11-08T14:30:00.000Z",
  },
  {
    id: "dispatch-03",
    title: "The Eastern Corridor Expansion: Scaling Enterprise Media Between Dire Dawa & Addis Ababa",
    description:
      "Operating across Ethiopia's primary commercial corridors requires dual-hub agility. From industrial manufacturers like Shumbro Plastic Factory to hospitality leaders like B Capital Hotel and conglomerates like Wabi Business Group, this playbook breaks down our multi-regional production pipelines and synchronized social media engines.",
    imageUrl: "/images/portfolio/free-spring.jpg",
    createdAt: "2026-11-02T09:15:00.000Z",
    updatedAt: "2026-11-02T09:15:00.000Z",
  },
];

/**
 * Custom fetch wrapper with Next.js App Router revalidation support
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Default 60-second revalidation for ISR caching in Next.js App Router
    next: {
      revalidate: 60,
      ...(options.next || {}),
    },
  };

  try {
    const res = await fetch(url, config);

    if (!res.ok) {
      let errorMessage = `API Error ${res.status}: ${res.statusText}`;
      try {
        const errorBody = await res.json();
        if (errorBody && errorBody.message) {
          errorMessage = Array.isArray(errorBody.message)
            ? errorBody.message.join(", ")
            : errorBody.message;
        }
      } catch {
        // Response was not JSON
      }
      throw new ApiError(errorMessage, res.status, endpoint);
    }

    return (await res.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Unknown network error";
    throw new ApiError(`Network request failed on ${endpoint}: ${message}`, 500, endpoint);
  }
}

/**
 * Public Blog API service methods executing against Swagger backend:
 * https://nana-backend-2jvy.onrender.com/docs
 */
export const blogApi = {
  /**
   * Retrieve all blog posts ordered by creation date
   */
  async getAllPosts(
    options?: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } }
  ): Promise<BlogPost[]> {
    try {
      const posts = await apiFetch<BlogPost[]>("/posts", options);
      if (Array.isArray(posts) && posts.length > 0) {
        return posts;
      }
      return fallbackBlogPosts;
    } catch (err) {
      console.warn("[apiClient] Live Swagger API request failed on /posts, serving fallback articles:", err);
      return fallbackBlogPosts;
    }
  },

  /**
   * Retrieve a single blog post by its unique UUID or identifier
   */
  async getPostById(
    id: string,
    options?: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } }
  ): Promise<BlogPost> {
    try {
      return await apiFetch<BlogPost>(`/posts/${encodeURIComponent(id)}`, options);
    } catch (err) {
      console.warn(`[apiClient] Fetch failed for post ${id}, checking fallback pool:`, err);
      const fallback = fallbackBlogPosts.find((p) => p.id === id);
      if (fallback) return fallback;
      throw err;
    }
  },
};
 
/**
 * AI Assistant Chat API service methods executing against Swagger backend:
 * POST /chat
 */
export const chatApi = {
  /**
   * Send a question/prompt to Nana Creatives AI assistant
   */
  async sendMessage(message: string): Promise<ChatResponseDto> {
    const payload: ChatRequestDto = { message: message.trim() };
    return await apiFetch<ChatResponseDto>("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  },
};

/**
 * Contact & Discovery Inquiries API service methods executing against Swagger backend:
 * POST /contacts, GET /contacts, GET /contacts/{id}
 */
export const contactsApi = {
  /**
   * Submit a new discovery/contact inquiry
   */
  async createContact(dto: CreateContactDto): Promise<ContactResponseDto> {
    const payload: CreateContactDto = {
      name: dto.name.trim(),
      phone: dto.phone.trim(),
      companyName: dto.companyName.trim(),
      service: dto.service.trim(),
      message: dto.message.trim(),
    };

    return await apiFetch<ContactResponseDto>("/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  },

  /**
   * Retrieve all contact inquiries (admin/editorial)
   */
  async getAllContacts(): Promise<ContactResponseDto[]> {
    return await apiFetch<ContactResponseDto[]>("/contacts", {
      cache: "no-store",
    });
  },

  /**
   * Retrieve a single contact inquiry by UUID
   */
  async getContactById(id: string): Promise<ContactResponseDto> {
    return await apiFetch<ContactResponseDto>(`/contacts/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
  },
};

/**
 * Central API Client interface
 */
export const apiClient = {
  blog: blogApi,
  posts: blogApi,
  chat: chatApi,
  contacts: contactsApi,
  baseUrl: API_BASE_URL,
};

export default apiClient;
