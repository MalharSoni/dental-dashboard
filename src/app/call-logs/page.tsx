import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock } from "lucide-react"
import { sheetsService } from "@/lib/google-sheets"

export default async function CallLogsPage() {
  const [callLogs, stats] = await Promise.all([
    sheetsService.getCallLogs(),
    sheetsService.getDashboardStats()
  ])
  
  const incomingCalls = callLogs.filter(call => call.call_type === 'incoming').length
  const outgoingCalls = callLogs.filter(call => call.call_type === 'outgoing').length
  const missedCalls = callLogs.filter(call => call.status === 'missed').length
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Call Logs</h1>
        <p className="text-muted-foreground">
          View and manage all incoming and outgoing calls
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCalls}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incoming</CardTitle>
            <PhoneIncoming className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incomingCalls}</div>
            <p className="text-xs text-muted-foreground">{Math.round((incomingCalls/callLogs.length)*100)}% of total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outgoing</CardTitle>
            <PhoneOutgoing className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outgoingCalls}</div>
            <p className="text-xs text-muted-foreground">{Math.round((outgoingCalls/callLogs.length)*100)}% of total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed</CardTitle>
            <PhoneMissed className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{missedCalls}</div>
            <p className="text-xs text-muted-foreground">{Math.round((missedCalls/callLogs.length)*100)}% missed rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Call Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
          <CardDescription>
            Latest call activity and details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {callLogs.map((call, index) => {
              const timeAgo = new Date(call.timestamp).toLocaleString()
              return (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    call.call_type === 'incoming' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {call.call_type === 'incoming' ? (
                      <PhoneIncoming className={`w-4 h-4 ${call.status === 'missed' ? 'text-red-600' : 'text-green-600'}`} />
                    ) : (
                      <PhoneOutgoing className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{call.caller_name}</p>
                    <p className="text-sm text-muted-foreground">{call.phone_number}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {call.duration}
                    </div>
                    <p className="text-xs text-muted-foreground">{timeAgo}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    call.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {call.status}
                  </span>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}