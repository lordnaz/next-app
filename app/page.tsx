import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/30 via-sky-500/20 to-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-24 right-[-60px] h-72 w-72 rounded-full bg-gradient-to-tr from-fuchsia-500/20 via-indigo-500/20 to-sky-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,120,120,0.12)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top nav */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-sm">
            A
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Lord Naz
            <span className="ml-2 rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
              v1
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            How it works
          </a>
          <a
            href="#security"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Security
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="shadow-sm">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Modern dashboard access, simplified
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Welcome to <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Lord Naz</span>
          </h1>

          <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
            Get started in seconds. Log in to access your dashboard, manage your work,
            and stay on top of what matters — with a fast, clean experience.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto shadow-sm">
              <Link href="/login">Login to Dashboard</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-background/70 backdrop-blur"
            >
              <Link href="/signup">Create an Account</Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required • Secure sign-in • Mobile friendly
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3" id="features">
          <FeatureCard
            title="Fast onboarding"
            desc="Create an account and land in your dashboard with minimal steps."
            icon={
              <IconBolt />
            }
          />
          <FeatureCard
            title="Clean workflow"
            desc="Organize tasks, track progress, and keep everything in one place."
            icon={
              <IconGrid />
            }
          />
          <FeatureCard
            title="Reliable access"
            desc="Consistent sign-in experience designed for modern web apps."
            icon={
              <IconShield />
            }
          />
        </div>
      </section>

      {/* Info band */}
      <section className="relative z-10 border-y bg-background/60 backdrop-blur" id="how">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 md:grid-cols-3 md:gap-8">
          <Stat label="Setup time" value="< 2 min" />
          <Stat label="Pages optimized" value="SSR/SSG ready" />
          <Stat label="UI approach" value="Modern + accessible" />
        </div>
      </section>

      {/* Security / CTA */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14 md:py-20" id="security">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Built with a modern foundation
            </h2>
            <p className="mt-4 text-muted-foreground">
              This landing page is structured for scalability — clear sections, reusable
              components, responsive layout, and a design that feels current.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">✓</span>
                Responsive hero, feature grid, and CTA sections
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">✓</span>
                Subtle gradients + grid texture for depth (not noisy)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">✓</span>
                Works well with shadcn/ui + Tailwind tokens
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-sm">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/login">I already have an account</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border bg-background/70 p-6 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Preview</p>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600">
                Ready
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm font-medium">Quick access</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Login and jump straight to your dashboard.
                </p>
              </div>
              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm font-medium">Simple navigation</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Keep the landing minimal, focused, and conversion-friendly.
                </p>
              </div>
              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm font-medium">Consistent UI</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Built to match your existing button styles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lord Naz. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link className="hover:text-foreground transition" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-foreground transition" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-foreground transition" href="/support">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group rounded-2xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-sm">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-background/60 p-6 shadow-sm backdrop-blur">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function IconBolt() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-95"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 2L3 14H11L9 22L21 10H13L13 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-95"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3H3V10H10V3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 3H14V10H21V3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 14H3V21H10V14Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 14H14V21H21V14Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-95"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
