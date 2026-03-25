'use client';

import { useState, useEffect, use } from 'react';

interface RegistrationInfo {
  fullName: string;
  platform: string;
  handle: string;
  status: string;
  checkedIn: boolean;
  checkedInAt: string | null;
}

interface MinimalInfo {
  valid: boolean;
  checkedIn: boolean;
}

type PageState =
  | { type: 'loading' }
  | { type: 'not-found' }
  | { type: 'error'; message: string }
  | { type: 'info'; data: RegistrationInfo; isDoorStaff: boolean }
  | { type: 'minimal'; data: MinimalInfo }
  | { type: 'checking-in' }
  | { type: 'checked-in'; fullName: string; checkedInAt: string }
  | { type: 'already-checked-in'; fullName: string; checkedInAt: string };

async function checkDoorStaff(): Promise<boolean> {
  try {
    const res = await fetch('/api/door/verify');
    if (!res.ok) return false;
    const data = await res.json();
    return data.isDoorStaff === true;
  } catch {
    return false;
  }
}

export default function CheckinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [state, setState] = useState<PageState>({ type: 'loading' });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/checkin/${id}`);
        if (res.status === 404) {
          setState({ type: 'not-found' });
          return;
        }
        if (!res.ok) {
          setState({ type: 'error', message: 'Failed to load registration.' });
          return;
        }
        const data = await res.json();

        // Unauthenticated response: { valid, checkedIn } only
        if ('valid' in data && !('fullName' in data)) {
          setState({ type: 'minimal', data: data as MinimalInfo });
          return;
        }

        const fullData = data as RegistrationInfo;

        if (fullData.checkedIn && fullData.checkedInAt) {
          setState({
            type: 'already-checked-in',
            fullName: fullData.fullName,
            checkedInAt: fullData.checkedInAt,
          });
          return;
        }

        const isDoor = await checkDoorStaff();
        setState({ type: 'info', data: fullData, isDoorStaff: isDoor });
      } catch {
        setState({ type: 'error', message: 'Connection error.' });
      }
    }
    load();
  }, [id]);

  async function handleCheckIn() {
    setState({ type: 'checking-in' });
    try {
      const res = await fetch(`/api/door/checkin/${id}`, { method: 'POST' });
      if (res.status === 401) {
        setState({ type: 'error', message: 'Not authorized. Please log in at /door first.' });
        return;
      }
      if (res.status === 404) {
        setState({ type: 'not-found' });
        return;
      }
      const data = await res.json();
      if (data.alreadyCheckedIn) {
        setState({
          type: 'already-checked-in',
          fullName: data.fullName,
          checkedInAt: data.checkedInAt,
        });
      } else {
        setState({
          type: 'checked-in',
          fullName: data.fullName,
          checkedInAt: data.checkedInAt,
        });
      }
    } catch {
      setState({ type: 'error', message: 'Connection error during check-in.' });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-black text-aqua">242</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-aqua/60">
            Influencers & Creative Conference
          </p>
        </div>

        {/* Loading */}
        {state.type === 'loading' && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-12 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
            <p className="text-sm text-sand/60">Loading registration...</p>
          </div>
        )}

        {/* Not Found */}
        {state.type === 'not-found' && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-red-400">Registration Not Found</h2>
            <p className="mt-2 text-sm text-sand/60">This QR code is not linked to a valid registration.</p>
          </div>
        )}

        {/* Error */}
        {state.type === 'error' && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <h2 className="text-lg font-bold text-red-400">Error</h2>
            <p className="mt-2 text-sm text-sand/60">{state.message}</p>
          </div>
        )}

        {/* Minimal Info (unauthenticated) */}
        {state.type === 'minimal' && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center">
            {state.data.checkedIn ? (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20">
                  <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-yellow-400">Already Checked In</h2>
                <p className="mt-2 text-sm text-sand/60">This registration has already been checked in.</p>
              </>
            ) : (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-green-400">Valid Registration</h2>
                <p className="mt-2 text-sm text-sand/60">Please ask staff to check you in.</p>
              </>
            )}
          </div>
        )}

        {/* Registration Info */}
        {state.type === 'info' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-aqua/60">Attendee</p>
              <h2 className="mt-2 text-2xl font-black text-white">{state.data.fullName}</h2>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sand/80">
                  {state.data.platform}
                </span>
                <span className="text-sm text-sand/60">@{state.data.handle}</span>
              </div>
              <div className="mt-3">
                <span
                  className={`inline-block rounded-full border px-3 py-1 text-xs font-bold capitalize ${
                    state.data.status === 'approved'
                      ? 'border-green-500/30 bg-green-500/20 text-green-400'
                      : state.data.status === 'pending'
                      ? 'border-yellow-500/30 bg-yellow-500/20 text-yellow-400'
                      : 'border-red-500/30 bg-red-500/20 text-red-400'
                  }`}
                >
                  {state.data.status}
                </span>
              </div>
            </div>

            {state.isDoorStaff ? (
              <button
                onClick={handleCheckIn}
                className="w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 py-5 text-lg font-black uppercase tracking-wider text-white shadow-lg shadow-green-500/25 transition-all active:scale-95"
              >
                CHECK IN
              </button>
            ) : (
              <div className="rounded-2xl border border-aqua/20 bg-aqua/5 p-6 text-center">
                <p className="text-sm font-medium text-aqua">
                  Please ask staff to check you in.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Checking In */}
        {state.type === 'checking-in' && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-12 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-green-400 border-t-transparent" />
            <p className="text-sm text-sand/60">Checking in...</p>
          </div>
        )}

        {/* Success */}
        {state.type === 'checked-in' && (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-green-500/20">
              <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-green-400">Checked In!</h2>
            <p className="mt-2 text-lg font-bold text-white">{state.fullName}</p>
            <p className="mt-1 text-xs text-sand/50">
              {new Date(state.checkedInAt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        )}

        {/* Already Checked In */}
        {state.type === 'already-checked-in' && (
          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20">
              <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-yellow-400">Already Checked In</h2>
            <p className="mt-2 text-lg font-bold text-white">{state.fullName}</p>
            <p className="mt-1 text-sm text-sand/60">
              Checked in at{' '}
              {new Date(state.checkedInAt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
