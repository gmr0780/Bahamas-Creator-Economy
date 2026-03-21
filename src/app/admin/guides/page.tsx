'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Guide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  order: number;
  published: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface GuideForm {
  title: string;
  slug: string;
  subtitle: string;
  icon: string;
  order: number;
  published: boolean;
  content: string;
}

const emptyForm: GuideForm = {
  title: '',
  slug: '',
  subtitle: '',
  icon: '',
  order: 0,
  published: false,
  content: '',
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminGuidesPage() {
  const router = useRouter();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<string | null>(null); // guide id or 'new'
  const [form, setForm] = useState<GuideForm>(emptyForm);
  const [autoSlug, setAutoSlug] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchGuides = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/guides');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setGuides(json.guides);
    } catch {
      // network error
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  function openNewForm() {
    setEditing('new');
    setForm(emptyForm);
    setAutoSlug(true);
  }

  function openEditForm(guide: Guide) {
    setEditing(guide.id);
    setForm({
      title: guide.title,
      slug: guide.slug,
      subtitle: guide.subtitle,
      icon: guide.icon,
      order: guide.order,
      published: guide.published,
      content: guide.content,
    });
    setAutoSlug(false);
  }

  function closeForm() {
    setEditing(null);
    setForm(emptyForm);
    setAutoSlug(true);
  }

  function handleTitleChange(value: string) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: autoSlug ? slugify(value) : f.slug,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const isNew = editing === 'new';
      const url = isNew
        ? '/api/admin/guides'
        : `/api/admin/guides/${editing}`;
      const method = isNew ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        router.push('/admin');
        return;
      }

      if (res.ok) {
        closeForm();
        await fetchGuides();
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/guides/${id}`, {
        method: 'DELETE',
      });
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (res.ok) {
        setDeleteConfirm(null);
        if (editing === id) closeForm();
        await fetchGuides();
      }
    } catch {
      // silently fail
    }
  }

  async function handleTogglePublished(guide: Guide) {
    try {
      const res = await fetch(`/api/admin/guides/${guide.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !guide.published }),
      });
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (res.ok) {
        await fetchGuides();
      }
    } catch {
      // silently fail
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
          <p className="text-sm text-sand/60">Loading guides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Admin header */}
      <header className="border-b border-white/10 bg-navy/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-aqua/60">
              242Creators.com
            </span>
            <span className="text-white/30">|</span>
            <span className="text-sm font-semibold text-white">Guides</span>
          </div>
          <Link
            href="/admin/dashboard"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Title + New button */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white">
            Educational Guides
          </h1>
          <button
            onClick={openNewForm}
            className="cta-gradient rounded-xl px-5 py-2.5 text-sm font-extrabold text-white shadow-lg transition-all hover:scale-105"
          >
            + New Guide
          </button>
        </div>

        {/* Guide form (new or edit) */}
        {editing && (
          <div className="mb-6 glass-dark rounded-2xl p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {editing === 'new' ? 'Create New Guide' : 'Edit Guide'}
              </h2>
              <button
                onClick={closeForm}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/60 transition-colors hover:border-coral/30 hover:text-coral"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="guide-title"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                >
                  Title
                </label>
                <input
                  id="guide-title"
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Guide title..."
                  required
                  className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="guide-slug"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                >
                  Slug
                </label>
                <input
                  id="guide-slug"
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setForm((f) => ({ ...f, slug: e.target.value }));
                  }}
                  placeholder="guide-slug"
                  required
                  className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
                />
                <p className="mt-1.5 text-xs text-sand/40">
                  Auto-generated from title. Edit to customize.
                </p>
              </div>

              {/* Subtitle + Icon + Order row */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="guide-subtitle"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                  >
                    Subtitle
                  </label>
                  <input
                    id="guide-subtitle"
                    type="text"
                    value={form.subtitle}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subtitle: e.target.value }))
                    }
                    placeholder="Brief description..."
                    className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guide-icon"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                  >
                    Icon
                  </label>
                  <input
                    id="guide-icon"
                    type="text"
                    value={form.icon}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, icon: e.target.value }))
                    }
                    placeholder="Emoji or icon text"
                    className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guide-order"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                  >
                    Order
                  </label>
                  <input
                    id="guide-order"
                    type="number"
                    min={0}
                    value={form.order}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, order: Number(e.target.value) }))
                    }
                    className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
                  />
                </div>
              </div>

              {/* Published toggle */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70">
                  Published
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({ ...f, published: !f.published }))
                  }
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors ${
                    form.published
                      ? 'border-green-500/40 bg-green-500/20'
                      : 'border-white/20 bg-white/10'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full transition-transform ${
                      form.published
                        ? 'translate-x-6 bg-green-400'
                        : 'translate-x-1 bg-sand/50'
                    }`}
                  />
                </button>
                <p className="mt-1.5 text-xs text-sand/40">
                  {form.published
                    ? 'This guide is visible to the public.'
                    : 'This guide is hidden from the public.'}
                </p>
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="guide-content"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
                >
                  Content
                </label>
                <textarea
                  id="guide-content"
                  rows={18}
                  value={form.content}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, content: e.target.value }))
                  }
                  placeholder={"## Section Title\n\nWrite your guide content here using markdown-style headers (## ) to separate sections..."}
                  className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 font-mono text-sm leading-relaxed text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
                />
                <p className="mt-1.5 text-xs text-sand/40">
                  Use ## headers to create sections. Markdown-style formatting.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="cta-gradient rounded-xl px-6 py-3 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving
                    ? 'Saving...'
                    : editing === 'new'
                      ? 'Create Guide'
                      : 'Update Guide'}
                </button>

                {editing !== 'new' && (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(editing)}
                    className="rounded-xl border border-coral/30 px-6 py-3 text-sm font-extrabold text-coral transition-all hover:bg-coral/10"
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Guides table */}
        <div className="glass-dark overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Order
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Icon
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Title
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Slug
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Published
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {guides.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-sand/40"
                    >
                      No guides yet. Click &quot;New Guide&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  guides.map((guide) => (
                    <tr
                      key={guide.id}
                      className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 text-sand/70">{guide.order}</td>
                      <td className="px-4 py-3 text-lg">{guide.icon}</td>
                      <td className="px-4 py-3 font-medium text-white">
                        {guide.title}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-sand/50">
                        {guide.slug}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleTogglePublished(guide)}
                          className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors ${
                            guide.published
                              ? 'border-green-500/40 bg-green-500/20'
                              : 'border-white/20 bg-white/10'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full transition-transform ${
                              guide.published
                                ? 'translate-x-5 bg-green-400'
                                : 'translate-x-1 bg-sand/50'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditForm(guide)}
                            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
                          >
                            Edit
                          </button>
                          {deleteConfirm === guide.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(guide.id)}
                                className="rounded-lg border border-coral/40 bg-coral/10 px-3 py-1.5 text-xs font-semibold text-coral transition-colors hover:bg-coral/20"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/60 transition-colors hover:border-white/20"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(guide.id)}
                              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-coral/30 hover:text-coral"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal (when triggered from edit form) */}
      {deleteConfirm && editing === deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-dark mx-4 max-w-sm rounded-2xl p-6 text-center">
            <p className="mb-4 text-white">
              Are you sure you want to delete this guide? This action cannot be
              undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="rounded-xl border border-coral/40 bg-coral/10 px-5 py-2.5 text-sm font-extrabold text-coral transition-all hover:bg-coral/20"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-sand/60 transition-colors hover:border-white/20"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
