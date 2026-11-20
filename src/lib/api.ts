
import type { EventItem, GalleryPhoto } from '../types';

// ==========================================
// API CONFIGURATION
// ==========================================

const configuredUrl =
  import.meta.env.VITE_API_URL ||
  'https://back.vaidikvidyapeeth.edu.np/api/v1';

const normalizedUrl = configuredUrl.replace(/\/+$/, '');

const BASE = normalizedUrl.endsWith('/api/v1')
  ? normalizedUrl
  : `${normalizedUrl}/api/v1`;

export type Managed<T> = T & {
  isPublished?: boolean | number;
  sortOrder?: number;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

// ==========================================
// SHARED REQUEST FUNCTION
// ==========================================

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);

  // All requests in this API use JSON bodies,
  // except requests without a body.
  if (options.body != null && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers,
    cache: 'no-store',
  });

  const json: ApiResponse<T> | null = await res
    .json()
    .catch(() => null);

  if (!res.ok || !json?.success) {
    if (res.status === 401) {
      throw new Error(
        json?.message ||
        'Admin session is missing or expired. Please sign in again.'
      );
    }

    throw new Error(
      json?.message ||
      `Request failed (${res.status})`
    );
  }

  return json.data as T;
}

// ==========================================
// SCHOOL API
// ==========================================

export const schoolApi = {
  // PUBLIC EVENTS
  events: () =>
    request<EventItem[]>('/events?limit=100'),

  // PUBLIC GALLERY
  gallery: () =>
    request<GalleryPhoto[]>('/gallery?limit=100'),

  // ADMIN EVENTS
  adminEvents: () =>
    request<Managed<EventItem>[]>(
      '/events/admin/all?limit=100'
    ),

  // ADMIN GALLERY
  adminGallery: () =>
    request<Managed<GalleryPhoto>[]>(
      '/gallery/admin/all?limit=100'
    ),

  // ADMIN LOGIN
  login: async (password: string) => {
    return request<void>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  // VERIFY ADMIN SESSION
  session: async () => {
    return request<void>('/admin/session');
  },

  // ADMIN LOGOUT
  logout: async () => {
    return request<void>('/admin/logout', {
      method: 'POST',
    });
  },

  // CREATE OR UPDATE
  save: async (
    kind: 'events' | 'gallery',
    data: Record<string, unknown>,
    id?: string | number
  ) => {
    return request<void>(
      `/${kind}${id != null ? `/${id}` : ''}`,
      {
        method: id != null ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      }
    );
  },

  // DELETE
  remove: async (
    kind: 'events' | 'gallery',
    id: string | number
  ) => {
    return request<void>(`/${kind}/${id}`, {
      method: 'DELETE',
    });
  },
};
