"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const inputClasses =
  "w-full border border-gold/40 bg-burgundy-dark/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

function QuoteFormInner() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("package") || "custom";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          eventType: formData.get("eventType"),
          eventDate: formData.get("eventDate"),
          guests: formData.get("guests"),
          package: formData.get("package"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <div className="border border-gold/40 bg-burgundy-dark/60 p-8 md:p-10">
      {status === "success" ? (
        <div className="py-16 text-center">
          <p className="h-serif text-3xl italic text-gold">Thank you</p>
          <p className="mt-4 max-w-md mx-auto text-cream/70">
            Your quote request has been received. We&apos;ll be in touch shortly —
            and you&apos;ll also get a confirmation email.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="btn-ghost mt-8"
          >
            Send Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                Name *
              </label>
              <input id="name" name="name" required className={inputClasses} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                Email *
              </label>
              <input id="email" name="email" type="email" required className={inputClasses} placeholder="you@email.com" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="(313) 555-0123" />
            </div>
            <div>
              <label htmlFor="guests" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                Guests
              </label>
              <input id="guests" name="guests" type="number" min="1" className={inputClasses} placeholder="40" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="eventType" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                Event Type
              </label>
              <input id="eventType" name="eventType" className={inputClasses} placeholder="Repass, party, corporate…" />
            </div>
            <div>
              <label htmlFor="eventDate" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                Event Date
              </label>
              <input id="eventDate" name="eventDate" type="date" className={`${inputClasses} [color-scheme:dark]`} />
            </div>
          </div>

          <div>
            <label htmlFor="package" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
              Package
            </label>
            <select id="package" name="package" defaultValue={preset} className={inputClasses}>
              <option value="repass">Repass — $499</option>
              <option value="hibachi">Hibachi Experience — $599</option>
              <option value="corporate">Corporate — Custom</option>
              <option value="custom">Custom / Not sure yet</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
              Tell us about your event
            </label>
            <textarea id="message" name="message" rows={4} className={inputClasses} placeholder="Anything special? Dietary needs, themes, timeline…" />
          </div>

          {error && (
            <p className="border border-red-400/50 bg-red-900/30 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          <button type="submit" disabled={status === "submitting"} className="btn-gold w-full disabled:opacity-60">
            {status === "submitting" ? "Sending…" : "Request a Quote"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function QuoteForm() {
  return (
    <Suspense fallback={<div className="border border-gold/40 bg-burgundy-dark/60 p-10">Loading form…</div>}>
      <QuoteFormInner />
    </Suspense>
  );
}
