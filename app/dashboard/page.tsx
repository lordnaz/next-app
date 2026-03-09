import Link from "next/link"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { logout, getUserCount, getUsers } from "./actions"
import { UsersTable } from "./components/users-table"

export default async function DashboardPage() {
  const userCount = await getUserCount()
  const users = await getUsers()

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative background (matches your landing/login vibe) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-500/20 to-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-fuchsia-500/15 via-indigo-500/15 to-sky-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]" />
      </div>

      {/* Top nav (embedded here since you have no dashboard layout yet) */}
      <header className="relative z-10 border-b border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background">
              <span className="text-sm font-bold">A</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Lord Naz</p>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="/#security" className="text-sm text-muted-foreground hover:text-foreground">
              Security
            </Link>
            <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
              Support
            </Link>
          </nav>

          {/* Server Action logout (keeps your logic intact) */}
          <form action={logout}>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </form>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Page header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview of your system metrics and registered users.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0">
            <Button variant="secondary" asChild>
              <Link href="/settings">Settings</Link>
            </Button>
            <Button asChild>
              <Link href="/users">Manage Users</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            description="Active users in the system"
            value={String(userCount)}
            icon={<IconUsers />}
          />
          <StatCard
            title="Revenue"
            description="Total revenue this month"
            value="$12,345"
            icon={<IconRevenue />}
          />
          <StatCard
            title="Orders"
            description="Orders processed today"
            value="89"
            icon={<IconOrders />}
          />
          <StatCard
            title="Uptime"
            description="Service availability"
            value="99.9%"
            icon={<IconShield />}
          />
        </section>

        {/* Users table */}
        <section className="mt-8">
          <Card className="border-border/60 bg-background/70 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <CardHeader className="space-y-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-xl">Users</CardTitle>
                  <CardDescription>All registered users</CardDescription>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/users/export">Export</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/users/new">Add User</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-lg border border-border/60 bg-background/40">
                <UsersTable users={users} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Lord Naz. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="/support" className="hover:text-foreground">Support</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

/** Reusable stat card */
function StatCard({
  title,
  description,
  value,
  icon,
}: {
  title: string
  description: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <Card className="border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-background/50">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
      </CardContent>
    </Card>
  )
}

/** Inline SVG icons (no extra deps) */
function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground">
      <path
        d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconRevenue() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground">
      <path d="M12 1v22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconOrders() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground">
      <path
        d="M7 7h14l-1.2 6.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L6 3H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground">
      <path
        d="M12 2 20 6v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
