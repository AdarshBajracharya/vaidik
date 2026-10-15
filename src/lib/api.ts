import type { EventItem, GalleryPhoto } from '../types';

const BASE = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '');

export type Managed<T> = T & {
  isPublished?: boolean | number;
  sortOrder?: number;
};

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json = await res
    .json()
    .catch(() => ({ message: 'Invalid server response' }));

  if (!res.ok || !json.success) {
    throw new Error(
      json.message || `Request failed (${res.status})`
    );
  }

  return json.data as T;
}

export const schoolApi = {
  events: () =>
    request<EventItem[]>('/events?limit=100'),

  gallery: () =>
    request<GalleryPhoto[]>('/gallery?limit=100'),

  adminEvents: () =>
    request<Managed<EventItem>[]>('/events/admin/all?limit=100'),

  adminGallery: () =>
    request<Managed<GalleryPhoto>[]>('/gallery/admin/all?limit=100'),

  login: async (password: string) => {
    await request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  session: async () => {
    await request('/admin/session');
  },

  logout: async () => {
    await request('/admin/logout', {
      method: 'POST',
    });
  },

  save: async (
    kind: 'events' | 'gallery',
    data: Record<string, unknown>,
    id?: string | number
  ) => {
    await request(
      `/${kind}${id ? `/${id}` : ''}`,
      {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      }
    );
  },

  remove: async (
    kind: 'events' | 'gallery',
    id: string | number
  ) => {
    await request(`/${kind}/${id}`, {
      method: 'DELETE',
    });
  },
};