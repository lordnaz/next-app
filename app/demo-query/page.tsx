'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DemoQueryPage() {
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    refetchInterval: 5000, // Add this line - auto-refresh every 5 seconds
  })

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">TanStack Query Demo</h1>
          <Button onClick={() => refetch()}>Refresh Data</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users (with TanStack Query)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error loading users</p>}
            {users && (
              <div className="space-y-2">
                {users.map((user: any) => (
                  <div key={user.id} className="p-3 border rounded">
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
