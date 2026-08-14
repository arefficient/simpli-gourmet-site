"use client";

import { useState } from "react";

export default function BlogSubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/blog/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Subscription failed. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-8 border border-gold/40 bg-burgundy-dark/60 p-6 text-center">
        <p className="h-serif text-xl italic text-gold">Thank you for subscribing</p>
        <p className="mt-2 text-sm text-cream/70">You&apos;re on the list for our latest recipes and updates.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="w-full sm:w-80 border border-gold/40 bg-burgundy-dark/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold whitespace-nowrap disabled:opacity-60"
      >
        {status === "submitting" ? "Subscribing…" : "Subscribe"}
      </button>
      {errorMessage && (
        <p className="w-full text-xs text-red-300 mt-2">{errorMessage}</p>
      )}
    </form>
  );
}
