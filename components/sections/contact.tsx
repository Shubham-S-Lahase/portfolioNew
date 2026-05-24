"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Send,
  Linkedin,
  Github,
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ACCESS_KEY = "e4ea3642-87af-41d5-950c-b16a453fa21f";

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [resultMessage, setResultMessage] = useState("");

  const validate = (data: typeof values) => {
    const next: Errors = {};
    if (!data.name.trim() || data.name.trim().length < 2)
      next.name = "Please enter your name.";
    if (!emailRegex.test(data.email)) next.email = "Please enter a valid email.";
    if (data.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus("submitting");
    setResultMessage("");
    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);
      formData.append(
        "subject",
        `New portfolio message from ${values.name}`
      );
      formData.append("from_name", "Shubham Lahase Portfolio");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit form.");
      }

      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setResultMessage("Message sent successfully.");
    } catch (error) {
      setStatus("error");
      setResultMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-tight">
        <SectionHeading
          number="06"
          eyebrow="contact"
          title="Let's build something great."
          description="Got a project, a role, or an idea? Send a message — I usually reply within a day."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.2fr]"
        >
          <motion.div variants={fadeInUp} className="card-surface p-6">
            <span className="mono-caption">{"// reach me directly"}</span>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer email, phone, or LinkedIn? Use the links below.
            </p>
            <div className="mt-6 space-y-2.5">
              <ContactLink
                href={`mailto:${siteConfig.email}`}
                icon={Mail}
                label="email"
                value={siteConfig.email}
              />
              {siteConfig.phone ? (
                <ContactLink
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  icon={Phone}
                  label="phone"
                  value={siteConfig.phone}
                />
              ) : null}
              <ContactLink
                href={siteConfig.socials.linkedin}
                icon={Linkedin}
                label="linkedin"
                value="linkedin.com/in/shubhamlahase"
                external
              />
              <ContactLink
                href={siteConfig.socials.github}
                icon={Github}
                label="github"
                value="github.com/Shubham-S-Lahase"
                external
              />
            </div>

            <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-3">
              <span className="mono-caption">tip</span>
              <p className="mt-1 text-xs text-muted-foreground">
                Press <span className="kbd">⌘</span>{" "}
                <span className="kbd">K</span> to open the command palette and
                jump to email / LinkedIn / resume actions instantly.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="card-surface p-6">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex flex-col items-center justify-center gap-3 py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 16,
                    }}
                    className="grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary"
                  >
                    <CheckCircle2 className="h-9 w-9" />
                  </motion.div>
                  <h3 className="text-lg font-semibold">Message sent</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out — I&apos;ll get back to you soon.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setStatus("idle");
                      setResultMessage("");
                    }}
                  >
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-5"
                >
                  <span className="mono-caption">{"// send a message"}</span>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={values.name}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, name: e.target.value }))
                      }
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name ? (
                      <p id="name-error" className="text-xs text-rose-400">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, email: e.target.value }))
                      }
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email ? (
                      <p id="email-error" className="text-xs text-rose-400">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me a little about your project, role, or idea…"
                      rows={5}
                      value={values.message}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, message: e.target.value }))
                      }
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message ? (
                      <p id="message-error" className="text-xs text-rose-400">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                      I respect your inbox. No spam, ever.
                    </p>
                    <Button
                      type="submit"
                      variant="default"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send message
                        </>
                      )}
                    </Button>
                  </div>
                  {status === "error" && resultMessage ? (
                    <p className="text-xs text-rose-400">{resultMessage}</p>
                  ) : null}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
  external,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
      className="group flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:border-primary/50 hover:bg-secondary/60"
    >
      <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/15 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex flex-col">
        <span className="mono-caption">{label}</span>
        <span className="text-sm text-foreground/90">{value}</span>
      </span>
      <span
        aria-hidden
        className="ml-auto font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
