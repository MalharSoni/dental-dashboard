import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Phone, PhoneOff, DollarSign } from "lucide-react"
import { sheetsService } from "@/lib/google-sheets"

export default async function OverviewPage() {
  const [stats, appointments] = await Promise.all([
    sheetsService.getDashboardStats(),
    sheetsService.getAppointments()
  ])

  const todayAppointments = appointments.filter(apt => 
    new Date(apt.date).toDateString() === new Date().toDateString()
  )
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your practice today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Appointments
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              +8% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
            <PhoneOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.missedCalls}</div>
            <p className="text-xs text-muted-foreground">
              -2% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.todayRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Schedule */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardDescription>
              Your upcoming appointments for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.slice(0, 3).map((appointment) => {
                const initials = appointment.patient_name.split(' ').map(n => n[0]).join('')
                const statusColors = {
                  completed: 'bg-green-50 border-green-500',
                  scheduled: 'bg-gray-50 border-gray-300',
                  cancelled: 'bg-red-50 border-red-500'
                }
                const statusBadgeColors = {
                  completed: 'bg-green-100 text-green-800',
                  scheduled: 'bg-gray-100 text-gray-800', 
                  cancelled: 'bg-red-100 text-red-800'
                }
                
                return (
                  <div key={appointment.id} className={`flex items-center p-4 rounded-lg border-l-4 ${statusColors[appointment.status as keyof typeof statusColors] || statusColors.scheduled}`}>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium text-sm">{initials}</span>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium">{appointment.patient_name}</p>
                      <p className="text-xs text-muted-foreground">{appointment.appointment_type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{appointment.time}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusBadgeColors[appointment.status as keyof typeof statusBadgeColors] || statusBadgeColors.scheduled}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-primary/10 border border-primary/20 rounded-lg text-center group hover:bg-primary/20 transition-colors">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-primary text-lg">+</span>
                </div>
                <span className="text-sm font-medium text-primary">Add Patient</span>
              </button>
              
              <button className="flex flex-col items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-lg text-center group hover:bg-blue-100 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-700">Schedule</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}