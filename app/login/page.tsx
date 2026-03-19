'use client'

import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { login, loginWithGoogle } from "./actions"

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setSuccess(true)
      const t = setTimeout(() => setSuccess(false), 5000)
      return () => clearTimeout(t)
    }
  }, [searchParams])

  function handleSubmit(formData: FormData) {
    setError(undefined)

    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative background (match landing template feel) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Soft gradient blobs */}
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-500/20 to-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-fuchsia-500/15 via-indigo-500/15 to-sky-500/15 blur-3xl" />

        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]" />
      </div>

      {/* Top nav (mirrors landing structure) */}
      <header className="relative z-10 border-b border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background">
              <span className="text-sm font-bold">A</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Lord Naz</p>
              <p className="text-xs text-muted-foreground">Secure access</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="/#how" className="text-sm text-muted-foreground hover:text-foreground">
              How it works
            </Link>
            <Link href="/#security" className="text-sm text-muted-foreground hover:text-foreground">
              Security
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-16">
        {/* Left side (marketing copy like landing hero) */}
        <section className="order-2 md:order-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Secure sign-in • Fast access • Mobile friendly
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Log in to access your dashboard, manage your work, and stay on top of what matters —
            with a clean, consistent experience.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild variant="secondary">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup">Create an Account</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <MiniStat label="Preview" value="Ready" />
            <MiniStat label="Quick access" value="Dashboard" />
            <MiniStat label="Security" value="Protected" />
          </div>
        </section>

        {/* Right side (Login card) */}
        <section className="order-1 md:order-2">
          <Card className="border-border/60 bg-background/70 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email and password to access your account.
              </CardDescription>

              {/* Status messages */}
              <div className="space-y-2 pt-2" aria-live="polite">
                {success && (
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
                    Account created successfully! Please login.
                  </div>
                )}

                {error && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </div>
                )}
              </div>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border bg-background accent-foreground"
                      name="remember"
                    />
                    Remember me
                  </label>

                  <span className="text-xs text-muted-foreground">
                    New here?{" "}
                    <Link href="/signup" className="text-foreground underline-offset-4 hover:underline">
                      Sign up
                    </Link>
                  </span>
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Signing in..." : "Login"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs text-muted-foreground">
                    <span className="bg-background px-2">or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => loginWithGoogle()}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </Button>


                <p className="text-center text-xs text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <Link href="/terms" className="hover:text-foreground underline-offset-4 hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="hover:text-foreground underline-offset-4 hover:underline">
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
