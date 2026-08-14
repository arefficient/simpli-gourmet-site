"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const inputClasses =
  "w-full border border-gold/40 bg-burgundy-dark/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Nut Allergy",
  "Other",
];

const ADDITIONAL_SERVICES = [
  "Bar Service",
  "Live Cooking Station",
  "Rentals / Staffing",
];

const BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
  "Not sure yet",
];

function QuoteFormInner() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("package") || "custom";

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  // Form field state across steps
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    guests: "",
    venueType: "indoor",
    duration: "",
    package: preset,
    dietary: [] as string[],
    additionalServices: [] as string[],
    budget: "Under $500",
    message: "",
  });

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleDietaryToggle(item: string) {
    setFormData((prev) => {
      const exists = prev.dietary.includes(item);
      return {
        ...prev,
        dietary: exists
          ? prev.dietary.filter((i) => i !== item)
          : [...prev.dietary, item],
      };
    });
  }

  function handleServiceToggle(item: string) {
    setFormData((prev) => {
      const exists = prev.additionalServices.includes(item);
      return {
        ...prev,
        additionalServices: exists
          ? prev.additionalServices.filter((i) => i !== item)
          : [...prev.additionalServices, item],
      };
    });
  }

  function validateStep(currentStep: number) {
    setError("");
    if (currentStep === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        setError("Please enter your name and email address.");
        return false;
      }
    }
    return true;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(prev + 1, 4));
  }

  function prevStep() {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(step)) return;

    setStatus("submitting");
    setError("");

    // Build comprehensive message combining additional metadata for the database & backend
    const combinedMessage = [
      formData.venueType ? `Venue Type: ${formData.venueType}` : "",
      formData.duration ? `Duration: ${formData.duration}` : "",
      formData.dietary.length > 0 ? `Dietary: ${formData.dietary.join(", ")}` : "",
      formData.additionalServices.length > 0 ? `Additional Services: ${formData.additionalServices.join(", ")}` : "",
      formData.budget ? `Budget Range: ${formData.budget}` : "",
      formData.message ? `Notes: ${formData.message}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          guests: formData.guests ? Number(formData.guests) : null,
          package: formData.package,
          message: combinedMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
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
            onClick={() => {
              setStatus("idle");
              setStep(1);
              setFormData({
                name: "",
                email: "",
                phone: "",
                eventDate: "",
                eventType: "",
                guests: "",
                venueType: "indoor",
                duration: "",
                package: preset,
                dietary: [],
                additionalServices: [],
                budget: "Under $500",
                message: "",
              });
            }}
            className="btn-ghost mt-8"
          >
            Send Another Request
          </button>
        </div>
      ) : (
        <div>
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gold mb-2">
              <span>Step {step} of 4</span>
              <span>
                {step === 1 && "Basics"}
                {step === 2 && "Event Details"}
                {step === 3 && "Preferences"}
                {step === 4 && "Final Details"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-burgundy-dark border border-gold/30">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basics */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="h-serif text-2xl text-cream mb-4">1. Contact &amp; Date</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                      Name *
                    </label>
                    <input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className={inputClasses}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={inputClasses}
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={inputClasses}
                      placeholder="(313) 555-0123"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventDate" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                      Event Date
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => updateField("eventDate", e.target.value)}
                      className={`${inputClasses} [color-scheme:dark]`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Event Details */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="h-serif text-2xl text-cream mb-4">2. Event Details</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="eventType" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                      Event Type
                    </label>
                    <input
                      id="eventType"
                      value={formData.eventType}
                      onChange={(e) => updateField("eventType", e.target.value)}
                      className={inputClasses}
                      placeholder="Repass, party, corporate…"
                    />
                  </div>
                  <div>
                    <label htmlFor="guests" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                      Guest Count
                    </label>
                    <input
                      id="guests"
                      type="number"
                      min="1"
                      value={formData.guests}
                      onChange={(e) => updateField("guests", e.target.value)}
                      className={inputClasses}
                      placeholder="40"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                      Venue Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["indoor", "outdoor", "mixed"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateField("venueType", type)}
                          className={`py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${
                            formData.venueType === type
                              ? "bg-gold text-burgundy-dark border-gold"
                              : "bg-burgundy-dark/40 text-cream border-gold/40 hover:border-gold"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="duration" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                      Approximate Duration
                    </label>
                    <input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => updateField("duration", e.target.value)}
                      className={inputClasses}
                      placeholder="e.g. 4 hours"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="h-serif text-2xl text-cream mb-2">3. Preferences &amp; Services</h3>
                <div>
                  <label htmlFor="package" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                    Package Selection
                  </label>
                  <select
                    id="package"
                    value={formData.package}
                    onChange={(e) => updateField("package", e.target.value)}
                    className={inputClasses}
                  >
                    <option value="repass">Repass — $499</option>
                    <option value="hibachi">Hibachi Experience — $599</option>
                    <option value="corporate">Corporate — Custom</option>
                    <option value="custom">Custom / Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                    Dietary Restrictions / Allergies (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {DIETARY_OPTIONS.map((item) => {
                      const selected = formData.dietary.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleDietaryToggle(item)}
                          className={`p-3 text-xs font-bold uppercase tracking-wider border text-left transition-colors ${
                            selected
                              ? "bg-gold text-burgundy-dark border-gold"
                              : "bg-burgundy-dark/40 text-cream/80 border-gold/30 hover:border-gold/60"
                          }`}
                        >
                          {selected ? "✓ " : "+ "}{item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                    Additional Services of Interest
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {ADDITIONAL_SERVICES.map((item) => {
                      const selected = formData.additionalServices.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleServiceToggle(item)}
                          className={`p-3 text-xs font-bold uppercase tracking-wider border text-left transition-colors ${
                            selected
                              ? "bg-gold text-burgundy-dark border-gold"
                              : "bg-burgundy-dark/40 text-cream/80 border-gold/30 hover:border-gold/60"
                          }`}
                        >
                          {selected ? "✓ " : "+ "}{item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Final Details */}
            {step === 4 && (
              <div className="space-y-5">
                <h3 className="h-serif text-2xl text-cream mb-4">4. Final Details</h3>
                <div>
                  <label htmlFor="budget" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    className={inputClasses}
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold">
                    Notes / Additional Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className={inputClasses}
                    placeholder="Anything special? Themes, timeline, specific requests…"
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="border border-red-400/50 bg-red-900/30 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-gold/20">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-ghost !px-6 !py-2.5 text-xs"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-gold !px-8 !py-2.5 text-xs"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-gold !px-8 !py-2.5 text-xs disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Request a Quote"}
                </button>
              )}
            </div>
          </form>
        </div>
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
