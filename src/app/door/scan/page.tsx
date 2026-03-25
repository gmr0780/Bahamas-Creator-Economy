'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Html5Qrcode } from 'html5-qrcode';

export default function DoorScanPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const processedRef = useRef(false);

  function extractId(value: string): string {
    const match = value.match(/\/checkin\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
    // If it looks like a raw ID
    if (/^[a-zA-Z0-9_-]+$/.test(value)) return value;
    return '';
  }

  function navigateToCheckin(value: string) {
    const id = extractId(value.trim());
    if (!id || processedRef.current) return;
    processedRef.current = true;
    // Stop scanner before navigating
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }
    router.push(`/checkin/${id}`);
  }

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    navigateToCheckin(input);
  }

  async function startScanner() {
    setCameraError('');
    setScanning(true);
    processedRef.current = false;

    try {
      // Request camera permission explicitly first to trigger browser prompt
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      // Stop the test stream — html5-qrcode will open its own
      stream.getTracks().forEach((t) => t.stop());

      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          navigateToCheckin(decodedText);
        },
        () => {
          // QR code not found in frame — ignore
        }
      );
    } catch (err) {
      console.error('Camera error:', err);
      const msg =
        err instanceof DOMException && err.name === 'NotAllowedError'
          ? 'Camera permission denied. Tap the lock icon in your browser address bar and allow camera access, then try again.'
          : err instanceof DOMException && err.name === 'NotFoundError'
          ? 'No camera found on this device. Use the manual lookup below.'
          : 'Could not access camera. Make sure no other app is using it, then try again.';
      setCameraError(msg);
      setScanning(false);
    }
  }

  function stopScanner() {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }
    setScanning(false);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-aqua">242</h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua/60">
            Influencers &amp; Creative Conference
          </p>
        </div>

        {/* Camera Scanner */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 mb-4">
          {!scanning ? (
            <button
              onClick={startScanner}
              className="w-full rounded-xl bg-gradient-to-r from-aqua to-coral py-4 text-lg font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-3"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9V6a3 3 0 013-3h3M21 9V6a3 3 0 00-3-3h-3M3 15v3a3 3 0 003 3h3M21 15v3a3 3 0 01-3 3h-3" />
              </svg>
              Open Camera Scanner
            </button>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-white">Scanning...</p>
                <button
                  onClick={stopScanner}
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-bold text-sand transition-colors hover:text-white"
                >
                  Close Camera
                </button>
              </div>
              <div
                id="qr-reader"
                className="overflow-hidden rounded-xl"
                style={{ width: '100%' }}
              />
              <p className="mt-3 text-center text-xs text-sand">
                Point camera at the QR code on the attendee&apos;s phone or email
              </p>
            </div>
          )}

          {cameraError && (
            <p className="mt-3 text-sm text-coral text-center">{cameraError}</p>
          )}
        </div>

        {/* Manual Lookup */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
          <h2 className="mb-3 text-center text-sm font-bold text-white uppercase tracking-widest">
            Manual Lookup
          </h2>

          <form onSubmit={handleLookup} className="space-y-3">
            <input
              type="text"
              placeholder="Paste URL or registration ID..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="w-full rounded-xl border border-aqua/30 bg-aqua/10 py-3 text-sm font-bold text-aqua transition-opacity hover:bg-aqua/20 disabled:opacity-40"
            >
              Look Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
