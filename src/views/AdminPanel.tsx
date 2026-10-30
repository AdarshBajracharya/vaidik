
import React, { useEffect, useState } from 'react';

import {
  ArrowLeft,
  CalendarDays,
  Check,
  Edit2,
  Eye,
  EyeOff,
  Images,
  LoaderCircle,
  LogOut,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

import { schoolApi, type Managed } from '../lib/api';
import type { EventItem, GalleryPhoto } from '../types';

type Kind = 'events' | 'gallery';
type EditorId = string | number | null;

type UploadedPhoto = {
  url: string;
  name: string;
};

const eventCategories = [
  'Academic',
  'Sports',
  'Cultural',
  'Activities',
];

const photoCategories = [
  'Campus',
  'Classroom',
  'Events',
  'Sports',
  'Arts & Culture',
  'Pre-School',
];

const input =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#164287]';

const field =
  'mb-1 block text-sm font-semibold text-slate-700';

const primaryButton =
  'inline-flex items-center gap-2 rounded-lg bg-[#164287] px-5 py-3 font-semibold text-white disabled:opacity-50';

const blankEvent = () => ({
  title: '',
  date: new Date().toLocaleDateString('en-CA'),
  category: 'Academic',
  summary: '',
  fullDescription: '',
  time: '',
  location: '',
  coverImage: '',
  gallery: [] as string[],
  isPublished: true,
});

const blankPhoto = () => ({
  title: '',
  category: 'Campus',
  image: '',
  caption: '',
  sortOrder: 0,
  isPublished: true,
});

const maxImageBytes = 20 * 1024 * 1024;

const validImageTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

const configuredApi = (
  import.meta.env.VITE_API_URL ||
  'https://back.vaidikvidyapeeth.edu.np/api/v1'
).replace(/\/+$/, '');

const apiBase = configuredApi.endsWith('/api/v1')
  ? configuredApi
  : `${configuredApi}/api/v1`;

// ========================================
// IMAGE UPLOAD FUNCTION
// ========================================

async function uploadImage(file: File): Promise<string> {
  if (!validImageTypes.includes(file.type)) {
    throw new Error(
      'Choose a JPG, PNG, WebP, or GIF image.'
    );
  }

  if (file.size > maxImageBytes) {
    throw new Error(
      `"${file.name}" is larger than 20 MB.`
    );
  }

  const response = await fetch(`${apiBase}/uploads`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.url) {
    throw new Error(
      data?.message ||
      'Image upload failed. Please sign in again and retry.'
    );
  }

  return data.url as string;
}

// ========================================
// REUSABLE UPLOAD COMPONENT
// ========================================

interface UploadFieldProps {
  label: string;
  required?: boolean;
  multiple?: boolean;
  uploading: boolean;
  onFiles: (files: File[]) => Promise<void>;
}

const UploadField: React.FC<UploadFieldProps> = ({
  label,
  required = false,
  multiple = false,
  uploading,
  onFiles,
}) => {
  return (
    <div>
      <label className={field}>
        {label} {required ? '*' : ''}
      </label>

      <label
        className={`
          flex cursor-pointer flex-col items-center gap-2
          rounded-xl border-2 border-dashed border-slate-300
          bg-slate-50 p-5 text-center
          ${uploading
            ? 'pointer-events-none opacity-60'
            : 'hover:border-[#164287]'
          }
        `}
      >
        {uploading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Upload size={23} />
        )}

        <span className="text-sm font-semibold">
          {uploading
            ? 'Uploading images...'
            : multiple
              ? 'Select one or more photos'
              : 'Choose image'}
        </span>

        <span className="text-xs text-slate-500">
          JPG, PNG, WebP, GIF • Maximum 20 MB per image
        </span>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple={multiple}
          disabled={uploading}
          className="sr-only"
          onChange={async (e) => {
            const files = Array.from(
              e.currentTarget.files || []
            );

            e.currentTarget.value = '';

            if (files.length > 0) {
              await onFiles(files);
            }
          }}
        />
      </label>
    </div>
  );
};

// ========================================
// ADMIN PANEL
// ========================================

export const AdminPanel: React.FC = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<Kind>('events');

  const [events, setEvents] = useState<
    Managed<EventItem>[]
  >([]);

  const [photos, setPhotos] = useState<
    Managed<GalleryPhoto>[]
  >([]);

  const [editing, setEditing] = useState<EditorId>(null);
  const [showForm, setShowForm] = useState(false);

  const [event, setEvent] = useState(blankEvent());
  const [photo, setPhoto] = useState(blankPhoto());

  const [bulkPhotos, setBulkPhotos] = useState<
    UploadedPhoto[]
  >([]);

  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // ========================================
  // ERROR HANDLING
  // ========================================

  const showError = (err: unknown) => {
    setError(
      err instanceof Error
        ? err.message
        : 'Something went wrong.'
    );

    setMessage('');
  };

  // ========================================
  // LOAD EVENTS AND GALLERY
  // ========================================

  const load = async () => {
    const [loadedEvents, loadedPhotos] =
      await Promise.all([
        schoolApi.adminEvents(),
        schoolApi.adminGallery(),
      ]);

    setEvents(loadedEvents);
    setPhotos(loadedPhotos);
  };

  useEffect(() => {
    schoolApi
      .session()
      .then(async () => {
        setSignedIn(true);
        await load();
      })
      .catch(() => {
        setSignedIn(false);
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);

  // ========================================
  // LOGIN
  // ========================================

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    setBusy(true);
    setError('');

    try {
      await schoolApi.login(password);

      setSignedIn(true);
      setPassword('');

      await load();
    } catch (err) {
      showError(err);
    } finally {
      setBusy(false);
    }
  };

  // ========================================
  // LOGOUT
  // ========================================

  const logout = async () => {
    try {
      await schoolApi.logout();

      setSignedIn(false);
      setShowForm(false);
    } catch (err) {
      showError(err);
    }
  };

  // ========================================
  // START ADD OR EDIT
  // ========================================

  const start = (
    item?: Managed<EventItem> | Managed<GalleryPhoto>
  ) => {
    setError('');
    setMessage('');

    setEditing(item?.id ?? null);
    setBulkPhotos([]);

    if (tab === 'events') {
      const current = item as
        | Managed<EventItem>
        | undefined;

      setEvent(
        current
          ? {
            title: current.title,
            date: current.date.slice(0, 10),
            category: current.category,
            summary: current.summary,
            fullDescription: current.fullDescription,
            time: current.time || '',
            location: current.location || '',
            coverImage: current.coverImage || '',
            gallery: current.gallery || [],
            isPublished: Boolean(current.isPublished),
          }
          : blankEvent()
      );
    } else {
      const current = item as
        | Managed<GalleryPhoto>
        | undefined;

      setPhoto(
        current
          ? {
            title: current.title,
            category: current.category,
            image: current.image || '',
            caption: current.caption || '',
            sortOrder: current.sortOrder || 0,
            isPublished: Boolean(current.isPublished),
          }
          : blankPhoto()
      );
    }

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ========================================
  // UPLOAD IMAGES
  // ========================================

  const uploadFiles = async (
    files: File[],
    destination: 'cover' | 'eventGallery' | 'photo'
  ) => {
    setUploading(true);
    setError('');

    try {
      for (const file of files) {
        const url = await uploadImage(file);

        if (destination === 'cover') {
          setEvent((previous) => ({
            ...previous,
            coverImage: url,
          }));
        } else if (destination === 'eventGallery') {
          setEvent((previous) => ({
            ...previous,
            gallery: [
              ...previous.gallery,
              url,
            ],
          }));
        } else if (editing === null) {
          setBulkPhotos((previous) => [
            ...previous,
            {
              url,
              name: file.name,
            },
          ]);
        } else {
          setPhoto((previous) => ({
            ...previous,
            image: url,
          }));
        }
      }
    } catch (err) {
      showError(err);
    } finally {
      setUploading(false);
    }
  };

  // ========================================
  // SAVE EVENT OR GALLERY
  // ========================================

  const save = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploading || busy) {
      return;
    }

    if (tab === 'events' && !event.coverImage) {
      setError('Please upload an event cover image.');
      return;
    }

    if (
      tab === 'gallery' &&
      (
        editing === null
          ? bulkPhotos.length === 0
          : !photo.image
      )
    ) {
      setError('Please upload a gallery photo.');
      return;
    }

    setBusy(true);
    setError('');
    setMessage('');

    try {
      if (tab === 'gallery' && editing === null) {
        let saved = 0;

        try {
          for (
            let index = 0;
            index < bulkPhotos.length;
            index += 1
          ) {
            const selected = bulkPhotos[index];

            const nameFromFile = selected.name
              .replace(/\.[^.]+$/, '')
              .replace(/[-_]+/g, ' ')
              .trim();

            await schoolApi.save('gallery', {
              ...photo,
              title:
                photo.title.trim() ||
                nameFromFile ||
                `School photo ${index + 1}`,
              image: selected.url,
              sortOrder: Math.min(
                1000000,
                photo.sortOrder + index
              ),
            });

            saved += 1;
          }
        } catch (err) {
          setBulkPhotos((previous) =>
            previous.slice(saved)
          );

          await load();

          throw new Error(
            `${saved} photo(s) saved; remaining photos were kept. ${err instanceof Error
              ? err.message
              : 'Please retry.'
            }`
          );
        }
      } else {
        await schoolApi.save(
          tab,
          tab === 'events' ? event : photo,
          editing ?? undefined
        );
      }

      await load();

      setShowForm(false);
      setBulkPhotos([]);

      setMessage(
        editing !== null
          ? 'Changes saved successfully.'
          : tab === 'gallery'
            ? 'Gallery photos added successfully.'
            : 'New item added successfully.'
      );
    } catch (err) {
      showError(err);
    } finally {
      setBusy(false);
    }
  };

  // ========================================
  // DELETE EVENT OR PHOTO
  // ========================================

  const remove = async (
    id: string | number
  ) => {
    if (
      !window.confirm(
        'Permanently delete this item? This cannot be undone.'
      )
    ) {
      return;
    }

    setBusy(true);
    setError('');

    try {
      await schoolApi.remove(tab, id);
      await load();

      setMessage('Item deleted.');
    } catch (err) {
      showError(err);
    } finally {
      setBusy(false);
    }
  };

  const items =
    tab === 'events' ? events : photos;

  // ========================================
  // SESSION LOADING
  // ========================================

  if (checking) {
    return (
      <div className="grid min-h-screen place-content-center text-slate-600">
        <LoaderCircle className="mx-auto animate-spin" />
        Checking admin session...
      </div>
    );
  }

  // ========================================
  // LOGIN PAGE
  // ========================================

  if (!signedIn) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 px-4">
        <form
          onSubmit={login}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#164287] text-2xl font-bold text-white">
            V
          </div>

          <h1 className="font-serif text-3xl font-bold">
            School Admin
          </h1>

          <p className="mb-7 mt-2 text-slate-500">
            Sign in to manage school events and photos.
          </p>

          <label
            htmlFor="admin-password"
            className={field}
          >
            Admin password
          </label>

          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className={input}
            placeholder="Enter your password"
          />

          {error && (
            <p
              role="alert"
              className="mt-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            disabled={busy}
            className={`mt-5 w-full justify-center ${primaryButton}`}
          >
            {busy ? 'Signing in...' : 'Sign in'}
          </button>

          <a
            href="/"
            className="mt-5 block text-center text-sm text-[#164287]"
          >
            ← Back to school website
          </a>
        </form>
      </div>
    );
  }

  // ========================================
  // MAIN ADMIN PANEL
  // ========================================

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="font-serif text-xl font-bold text-[#164287]">
              Vaidik Vidyapeeth
            </p>

            <p className="text-xs text-slate-500">
              Content management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-[#164287]"
            >
              <ArrowLeft size={15} />
              Website
            </a>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* PAGE TITLE */}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manage Content
            </h1>

            <p className="mt-1 text-slate-500">
              Add, update, publish or remove school updates.
            </p>
          </div>

          {!showForm && (
            <button
              onClick={() => start()}
              className={primaryButton}
            >
              <Plus size={18} />

              Add {tab === 'events' ? 'Event' : 'Photo'}
            </button>
          )}
        </div>

        {/* MESSAGES */}

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800"
          >
            {message}
          </div>
        )}

        {/* EVENTS / GALLERY LIST */}

        {!showForm && (
          <>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:max-w-md">
              <button
                onClick={() => setTab('events')}
                className={`rounded-xl border p-4 text-left ${tab === 'events'
                    ? 'border-[#164287] bg-blue-50'
                    : 'border-slate-200 bg-white'
                  }`}
              >
                <CalendarDays
                  size={22}
                  className="text-[#164287]"
                />

                <span className="mt-2 block font-bold">
                  Events
                </span>

                <span className="text-sm text-slate-500">
                  {events.length} entries
                </span>
              </button>

              <button
                onClick={() => setTab('gallery')}
                className={`rounded-xl border p-4 text-left ${tab === 'gallery'
                    ? 'border-[#164287] bg-blue-50'
                    : 'border-slate-200 bg-white'
                  }`}
              >
                <Images
                  size={22}
                  className="text-[#164287]"
                />

                <span className="mt-2 block font-bold">
                  Gallery
                </span>

                <span className="text-sm text-slate-500">
                  {photos.length} photos
                </span>
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="border-b p-5 font-bold">
                {tab === 'events'
                  ? 'School Events'
                  : 'Photo Gallery'}
              </div>

              {items.length === 0 ? (
                <p className="p-10 text-center text-slate-500">
                  Nothing here yet. Select Add{' '}
                  {tab === 'events'
                    ? 'Event'
                    : 'Photo'}{' '}
                  to begin.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap"
                    >
                      <img
                        src={
                          tab === 'events'
                            ? (item as EventItem).coverImage
                            : (item as GalleryPhoto).image
                        }
                        alt=""
                        className="h-20 w-24 rounded-lg bg-slate-100 object-cover"
                      />

                      <div className="min-w-[150px] flex-1">
                        <div className="font-bold">
                          {item.title}
                        </div>

                        <div className="text-sm text-slate-500">
                          {item.category}

                          {tab === 'events'
                            ? ` • ${(
                              item as EventItem
                            ).date.slice(0, 10)}`
                            : ''}
                        </div>

                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs ${item.isPublished
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                            }`}
                        >
                          {item.isPublished
                            ? 'Published'
                            : 'Draft'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => start(item)}
                          className="rounded-lg border p-2 hover:bg-blue-50"
                          aria-label={`Edit ${item.title}`}
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          disabled={busy}
                          onClick={() => remove(item.id)}
                          className="rounded-lg border p-2 text-red-600 hover:bg-red-50"
                          aria-label={`Delete ${item.title}`}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ADD / EDIT FORM */}

        {showForm && (
          <form
            onSubmit={save}
            className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
          >
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editing !== null ? 'Edit' : 'Add'}{' '}
                {tab === 'events'
                  ? 'Event'
                  : 'Gallery Photos'}
              </h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={busy || uploading}
                className="text-sm text-slate-500 hover:underline"
              >
                Cancel
              </button>
            </div>

            {/* EVENT FORM */}

            {tab === 'events' ? (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="event-title"
                    className={field}
                  >
                    Event title *
                  </label>

                  <input
                    id="event-title"
                    required
                    maxLength={255}
                    className={input}
                    value={event.title}
                    onChange={(e) =>
                      setEvent({
                        ...event,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Annual Sports Day"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="event-date"
                      className={field}
                    >
                      Date *
                    </label>

                    <input
                      id="event-date"
                      type="date"
                      required
                      className={input}
                      value={event.date}
                      onChange={(e) =>
                        setEvent({
                          ...event,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="event-category"
                      className={field}
                    >
                      Category *
                    </label>

                    <select
                      id="event-category"
                      className={input}
                      value={event.category}
                      onChange={(e) =>
                        setEvent({
                          ...event,
                          category: e.target.value,
                        })
                      }
                    >
                      {eventCategories.map((category) => (
                        <option key={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="event-time"
                      className={field}
                    >
                      Time
                    </label>

                    <input
                      id="event-time"
                      className={input}
                      value={event.time}
                      onChange={(e) =>
                        setEvent({
                          ...event,
                          time: e.target.value,
                        })
                      }
                      placeholder="10:00 AM"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="event-location"
                      className={field}
                    >
                      Location
                    </label>

                    <input
                      id="event-location"
                      className={input}
                      value={event.location}
                      onChange={(e) =>
                        setEvent({
                          ...event,
                          location: e.target.value,
                        })
                      }
                      placeholder="School ground"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="event-summary"
                    className={field}
                  >
                    Short summary *
                  </label>

                  <textarea
                    id="event-summary"
                    required
                    rows={3}
                    className={input}
                    value={event.summary}
                    onChange={(e) =>
                      setEvent({
                        ...event,
                        summary: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="event-description"
                    className={field}
                  >
                    Full description *
                  </label>

                  <textarea
                    id="event-description"
                    required
                    rows={6}
                    className={input}
                    value={event.fullDescription}
                    onChange={(e) =>
                      setEvent({
                        ...event,
                        fullDescription: e.target.value,
                      })
                    }
                  />
                </div>

                <UploadField
                  label="Cover image"
                  required
                  uploading={uploading}
                  onFiles={(files) =>
                    uploadFiles(files, 'cover')
                  }
                />

                {event.coverImage && (
                  <div className="relative inline-block">
                    <img
                      src={event.coverImage}
                      alt="Event cover preview"
                      className="h-36 w-60 rounded-lg object-cover"
                    />

                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() =>
                        setEvent({
                          ...event,
                          coverImage: '',
                        })
                      }
                      aria-label="Remove cover image"
                      className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <UploadField
                  label="Other event photos"
                  multiple
                  uploading={uploading}
                  onFiles={(files) =>
                    uploadFiles(files, 'eventGallery')
                  }
                />

                {event.gallery.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {event.gallery.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="relative"
                      >
                        <img
                          src={url}
                          alt={`Event photo ${index + 1}`}
                          className="h-28 w-full rounded-lg object-cover"
                        />

                        <button
                          type="button"
                          disabled={uploading}
                          aria-label={`Remove event photo ${index + 1}`}
                          onClick={() =>
                            setEvent((previous) => ({
                              ...previous,
                              gallery: previous.gallery.filter(
                                (_, i) => i !== index
                              ),
                            }))
                          }
                          className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* GALLERY FORM */

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="photo-title"
                    className={field}
                  >
                    {editing === null
                      ? 'Title (optional; applies to all selected photos)'
                      : 'Photo title *'}
                  </label>

                  <input
                    id="photo-title"
                    required={editing !== null}
                    className={input}
                    value={photo.title}
                    onChange={(e) =>
                      setPhoto({
                        ...photo,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. School Library (or leave blank to use filenames)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="photo-category"
                    className={field}
                  >
                    Category *
                  </label>

                  <select
                    id="photo-category"
                    className={input}
                    value={photo.category}
                    onChange={(e) =>
                      setPhoto({
                        ...photo,
                        category: e.target.value,
                      })
                    }
                  >
                    {photoCategories.map((category) => (
                      <option key={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MULTIPLE IMAGE UPLOAD */}

                <UploadField
                  label={
                    editing === null
                      ? 'Select gallery photos'
                      : 'Replace gallery photo'
                  }
                  required
                  multiple={editing === null}
                  uploading={uploading}
                  onFiles={(files) =>
                    uploadFiles(files, 'photo')
                  }
                />

                {/* MULTIPLE PHOTO PREVIEW */}

                {editing === null ? (
                  bulkPhotos.length > 0 && (
                    <div>
                      <p className="mb-3 text-sm font-semibold">
                        {bulkPhotos.length} photos ready to save
                      </p>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {bulkPhotos.map((selected, index) => (
                          <div
                            key={`${selected.url}-${index}`}
                            className="relative"
                          >
                            <img
                              src={selected.url}
                              alt={selected.name}
                              className="h-32 w-full rounded-lg object-cover"
                            />

                            <p
                              className="mt-1 truncate text-xs text-slate-500"
                              title={selected.name}
                            >
                              {selected.name}
                            </p>

                            <button
                              type="button"
                              disabled={uploading || busy}
                              onClick={() =>
                                setBulkPhotos((previous) =>
                                  previous.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                              aria-label={`Remove ${selected.name}`}
                              className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  photo.image && (
                    <div className="relative inline-block">
                      <img
                        src={photo.image}
                        alt="Photo preview"
                        className="max-h-56 rounded-lg object-cover"
                      />

                      <button
                        type="button"
                        disabled={uploading}
                        onClick={() =>
                          setPhoto({
                            ...photo,
                            image: '',
                          })
                        }
                        aria-label="Remove gallery image"
                        className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )
                )}

                <div>
                  <label
                    htmlFor="photo-caption"
                    className={field}
                  >
                    Caption
                  </label>

                  <textarea
                    id="photo-caption"
                    className={input}
                    rows={3}
                    value={photo.caption}
                    onChange={(e) =>
                      setPhoto({
                        ...photo,
                        caption: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="photo-order"
                    className={field}
                  >
                    Display order (lower number first)
                  </label>

                  <input
                    id="photo-order"
                    type="number"
                    min="0"
                    max="1000000"
                    className={input}
                    value={photo.sortOrder}
                    onChange={(e) =>
                      setPhoto({
                        ...photo,
                        sortOrder: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* PUBLISH CONTROL */}

            <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input
                type="checkbox"
                className="h-5 w-5 accent-[#164287]"
                checked={
                  tab === 'events'
                    ? event.isPublished
                    : photo.isPublished
                }
                onChange={(e) =>
                  tab === 'events'
                    ? setEvent({
                      ...event,
                      isPublished: e.target.checked,
                    })
                    : setPhoto({
                      ...photo,
                      isPublished: e.target.checked,
                    })
                }
              />

              <span className="flex-1">
                <span className="block font-semibold">
                  Publish on school website
                </span>

                <span className="text-xs text-slate-500">
                  Uncheck to save as a private draft
                </span>
              </span>

              {(
                tab === 'events'
                  ? event.isPublished
                  : photo.isPublished
              ) ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </label>

            <p className="mt-4 text-xs text-slate-500">
              Images are uploaded to your school backend.
              Existing saved images will remain available.
            </p>

            {/* SAVE BUTTONS */}

            <div className="mt-7 flex gap-3">
              <button
                type="submit"
                disabled={busy || uploading}
                className={primaryButton}
              >
                {busy ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Check size={18} />
                )}

                {busy
                  ? 'Saving...'
                  : uploading
                    ? 'Uploading...'
                    : tab === 'gallery' &&
                      editing === null
                      ? `Save ${bulkPhotos.length} photos`
                      : 'Save changes'}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={busy || uploading}
                className="rounded-lg border border-slate-300 px-5 py-3 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};
