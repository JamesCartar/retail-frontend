import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/lib/store/authStore'
import { authService } from '@/lib/api/auth'
import { recordService } from '@/lib/api/records'
import { Button } from '@/components/ui/button'
import { StatsCard, QuickActions, RecentActivity } from '@/components/pages/home'
import { RecordItem } from '@/common/types'
import { APP_CONFIG, ROUTES } from '@/common/constants'

export default function Home() {
  const router = useRouter()
  const { user, setUser, logout } = useAuthStore()
  const [records, setRecords] = useState<RecordItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRecords: 0,
    pendingRecords: 0,
    completedRecords: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const userData = await authService.getCurrentUser()
        setUser(userData)

        // Fetch recent records
        const recordsData = await recordService.getAll({ page: 1, perPage: 10 })
        setRecords(recordsData.data || [])

        // Calculate stats (in real app, this would come from backend)
        const total = recordsData.total || 0
        const pending = recordsData.data?.filter((r: RecordItem) => r.status === 'pending').length || 0
        const completed = recordsData.data?.filter((r: RecordItem) => r.status === 'completed').length || 0
        const revenue = recordsData.data?.reduce((sum: number, r: RecordItem) => sum + (r.amount || 0), 0) || 0

        setStats({
          totalRecords: total,
          pendingRecords: pending,
          completedRecords: completed,
          totalRevenue: revenue,
        })
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [setUser])

  const handleLogout = async () => {
    try {
      await authService.logout()
      logout()
      router.push(ROUTES.LOGIN)
    } catch (err) {
      console.error('Logout failed:', err)
      logout()
      router.push(ROUTES.LOGIN)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold">{APP_CONFIG.NAME}</h1>
            <div className="flex items-center gap-4">
              {user && (
                <span className="text-sm text-gray-600">
                  Welcome, {user.name}
                </span>
              )}
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Total Records"
            value={stats.totalRecords}
            description="All time records"
          />
          <StatsCard
            title="Pending Records"
            value={stats.pendingRecords}
            description="Awaiting completion"
          />
          <StatsCard
            title="Completed Records"
            value={stats.completedRecords}
            description="Successfully processed"
          />
          <StatsCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            description="From all records"
          />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <RecentActivity
              records={records}
              isLoading={isLoading}
              onViewAll={() => router.push(ROUTES.VIEW_RECORDS)}
            />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}
