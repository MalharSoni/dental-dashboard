import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Voicemail, Play, Download, Trash2, Clock, User } from "lucide-react"
import { sheetsService } from "@/lib/google-sheets"

export default async function VoicemailsPage() {
  const voicemails = await sheetsService.getVoicemails()
  
  const unreadCount = voicemails.filter(vm => !vm.listened).length
  const avgDuration = voicemails.reduce((acc, vm) => {
    const [min, sec] = vm.duration.split(':').map(Number)
    return acc + (min * 60 + sec)
  }, 0) / voicemails.length
  const avgMinutes = Math.floor(avgDuration / 60)
  const avgSeconds = Math.floor(avgDuration % 60)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Voicemails</h1>
        <p className="text-muted-foreground">
          Manage and listen to patient voicemails
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Voicemails</CardTitle>
            <Voicemail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{voicemails.length}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgMinutes}:{avgSeconds.toString().padStart(2, '0')}</div>
            <p className="text-xs text-muted-foreground">Minutes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <div className="w-4 h-4 text-green-600">✓</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Within 24h</p>
          </CardContent>
        </Card>
      </div>

      {/* Voicemails List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Voicemails</CardTitle>
          <CardDescription>
            Listen to and manage patient voicemails
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                caller: "Sarah Johnson", 
                number: "+1 (555) 123-4567", 
                duration: "2:34", 
                time: "10 minutes ago",
                unread: true,
                urgent: false
              },
              { 
                caller: "Robert Miller", 
                number: "+1 (555) 234-5678", 
                duration: "1:12", 
                time: "1 hour ago",
                unread: true,
                urgent: true
              },
              { 
                caller: "Unknown Caller", 
                number: "+1 (555) 345-6789", 
                duration: "0:45", 
                time: "2 hours ago",
                unread: false,
                urgent: false
              },
              { 
                caller: "Jennifer Davis", 
                number: "+1 (555) 456-7890", 
                duration: "3:21", 
                time: "4 hours ago",
                unread: true,
                urgent: false
              },
              { 
                caller: "Mark Wilson", 
                number: "+1 (555) 567-8901", 
                duration: "1:58", 
                time: "Yesterday",
                unread: false,
                urgent: false
              },
            ].map((voicemail, index) => (
              <div key={index} className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                voicemail.unread ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    {voicemail.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
                    )}
                    {voicemail.urgent && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${voicemail.unread ? 'text-blue-900' : ''}`}>
                        {voicemail.caller}
                      </p>
                      {voicemail.urgent && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{voicemail.number}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {voicemail.duration}
                    </div>
                    <p className="text-xs text-muted-foreground">{voicemail.time}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}