'use client'

import Link from "next/link"
import { useState, useTransition } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signup } from "./actions"

export default function SignupPage() {
  const [error, setError] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    setError(undefined)

    // Important: signup() redirects on success, so code after it may not run.
    startTransition(async () => {
      const result = await signup(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative background (same visual language as landing/login/dashboard) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-500/20 to-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-fuchsia-500/15 via-indigo-500/15 to-sky-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]" />
      </div>

      {/* Top nav */}
      <header className="relative z-10 border-b border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background">
              <span className="text-sm font-bold">A</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Lord Naz</p>
              <p className="text-xs text-muted-foreground">Create account</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-16">
        {/* Left: copy */}
        <section className="order-2 md:order-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Quick setup • Secure account • Learning mode
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Create your account
          </h1>

          <p className="mt-3 max-w-lg text-muted-foreground">
            Sign up in seconds. After success, you’ll be redirected to login automatically.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild variant="secondary">
              <Link href="/login">I already have an account</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <MiniStat label="Secure" value="Protected" />
            <MiniStat label="Setup" value="Fast" />
            <MiniStat label="Access" value="Instant" />
          </div>
        </section>

        {/* Right: form card */}
        <section className="order-1 md:order-2">
          <Card className="border-border/60 bg-background/70 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>Enter your email and password to create an account.</CardDescription>

              {error && (
                <div
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}
            </CardHeader>

            <CardContent>
              <form action={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: use at least 8 characters (learning-friendly).
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Creating account..." : "Create account"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4 hover:text-foreground">
                    Login
                  </Link>
                </p>

                <p className="text-center text-xs text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lord Naz. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/support" className="hover:text-foreground">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3 backdrop-blur">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  )
}
