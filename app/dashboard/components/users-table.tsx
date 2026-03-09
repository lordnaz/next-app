'use client'

import Link from "next/link"
import { useMemo, useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


type User = {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string
}

type SortKey = "email" | "created_at" | "last_sign_in_at"
type SortDir = "asc" | "desc"

export function UsersTable({ users }: { users: User[] }) {
  const [query, setQuery] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("created_at")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter
  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter((u) => u.email.toLowerCase().includes(q))
  }, [users, query])

  // Sort
  const sortedUsers = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1

    const toTime = (v: string) => {
      const t = Date.parse(v)
      return Number.isFinite(t) ? t : NaN
    }

    const copy = [...filteredUsers]
    copy.sort((a, b) => {
      if (sortKey === "email") {
        return a.email.localeCompare(b.email) * dir
      }

      // date-based keys
      const ta = toTime(a[sortKey])
      const tb = toTime(b[sortKey])

      // If both parse, compare timestamps; otherwise fallback to string compare
      if (Number.isFinite(ta) && Number.isFinite(tb)) return (ta - tb) * dir
      return String(a[sortKey]).localeCompare(String(b[sortKey])) * dir
    })

    return copy
  }, [filteredUsers, sortKey, sortDir])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = sortedUsers.slice(startIndex, endIndex)

  // Reset page when filter/sort changes to avoid empty pages
  useEffect(() => {
    setCurrentPage(1)
  }, [query, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  function SortIndicator({ active }: { active: boolean }) {
    return (
      <span className={`ml-1 inline-flex text-[10px] ${active ? "text-foreground" : "text-muted-foreground"}`}>
        {active ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
      </span>
    )
  }

  const showingFrom = sortedUsers.length === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(endIndex, sortedUsers.length)

  // Small helper: render pagination numbers compactly
  const pageNumbers = useMemo(() => {
    const max = totalPages
    const cur = currentPage
    const windowSize = 5

    if (max <= windowSize) return Array.from({ length: max }, (_, i) => i + 1)

    const half = Math.floor(windowSize / 2)
    let start = Math.max(1, cur - half)
    let end = Math.min(max, start + windowSize - 1)
    start = Math.max(1, end - windowSize + 1)

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [totalPages, currentPage])

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Users</div>
          <span className="rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-xs text-muted-foreground">
            {users.length} total
          </span>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by email..."
            className="h-9 w-full sm:w-[240px]"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery("")
              setSortKey("created_at")
              setSortDir("desc")
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border/60 bg-background/40">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="py-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 px-3 text-xs font-semibold"
                  onClick={() => toggleSort("email")}
                >
                  Email
                  <SortIndicator active={sortKey === "email"} />
                </Button>
              </TableHead>

              <TableHead className="py-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 px-3 text-xs font-semibold"
                  onClick={() => toggleSort("created_at")}
                >
                  Created At
                  <SortIndicator active={sortKey === "created_at"} />
                </Button>
              </TableHead>

              <TableHead className="py-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 px-3 text-xs font-semibold"
                  onClick={() => toggleSort("last_sign_in_at")}
                >
                  Last Login
                  <SortIndicator active={sortKey === "last_sign_in_at"} />
                </Button>
              </TableHead>

              <TableHead className="py-3">
                <span className="text-xs font-semibold">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/30">
                  <TableCell className="py-3 font-medium">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-3 text-muted-foreground">
                    {user.created_at}
                  </TableCell>
                  <TableCell className="py-3 text-muted-foreground">
                    {user.last_sign_in_at}
                  </TableCell>
                  <TableCell className="py-3">
                    <Button asChild size="sm" variant="outline">
                      <Link href="/payment">Payment</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                  {users.length === 0
                    ? "No users available yet."
                    : "No results. Try a different search term."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{showingFrom}</span> to{" "}
          <span className="font-medium text-foreground">{showingTo}</span> of{" "}
          <span className="font-medium text-foreground">{sortedUsers.length}</span> users
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {pageNumbers[0] > 1 && (
              <>
                <Button
                  type="button"
                  variant={currentPage === 1 ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-9 px-0"
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </Button>
                <span className="px-1 text-xs text-muted-foreground">…</span>
              </>
            )}

            {pageNumbers.map((n) => (
              <Button
                key={n}
                type="button"
                variant={currentPage === n ? "default" : "outline"}
                size="sm"
                className="h-8 w-9 px-0"
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </Button>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                <span className="px-1 text-xs text-muted-foreground">…</span>
                <Button
                  type="button"
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-9 px-0"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
