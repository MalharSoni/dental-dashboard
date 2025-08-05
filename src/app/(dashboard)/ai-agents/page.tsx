import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Settings, Activity, Zap, MessageSquare, Phone, Calendar, Users } from "lucide-react"
import { sheetsService } from "@/lib/google-sheets"

export default async function AIAgentsPage() {
  const [aiActivity, stats] = await Promise.all([
    sheetsService.getAIAgentActivity(),
    sheetsService.getDashboardStats()
  ])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-muted-foreground">
            Manage your AI assistants and automation workflows
          </p>
        </div>
        <Button>
          <Bot className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAIAgents}</div>
            <p className="text-xs text-muted-foreground">Running 24/7</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aiTasksToday}</div>
            <p className="text-xs text-muted-foreground">+23% from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aiSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <div className="w-4 h-4 text-green-600">⏱️</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Agents */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Reception Assistant</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Handles patient inquiries, appointment scheduling, and basic information requests via chat and phone.
            </CardDescription>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Messages handled today:</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span>Average response time:</span>
                <span className="font-medium">1.2s</span>
              </div>
              <div className="flex justify-between">
                <span>Customer satisfaction:</span>
                <span className="font-medium">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Call Handler</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Manages incoming calls, routes emergencies, takes messages, and provides basic practice information.
            </CardDescription>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Calls handled today:</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span>Missed calls prevented:</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span>Emergency escalations:</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Scheduler Pro</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Optimizes appointment scheduling, sends reminders, handles cancellations and rescheduling requests.
            </CardDescription>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Appointments scheduled:</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between">
                <span>Reminders sent:</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between">
                <span>No-show rate reduction:</span>
                <span className="font-medium">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Patient Care</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-sm text-yellow-600">Training</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Provides post-treatment care instructions, medication reminders, and follow-up communications.
            </CardDescription>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Care instructions sent:</span>
                <span className="font-medium">15</span>
              </div>
              <div className="flex justify-between">
                <span>Follow-ups completed:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>Patient satisfaction:</span>
                <span className="font-medium">4.9/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Activity</CardTitle>
          <CardDescription>
            Latest actions performed by your AI agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiActivity.map((activity) => {
              const timeAgo = new Date(activity.timestamp).toLocaleString()
              return (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{activity.agent_name}</p>
                    <p className="text-sm text-muted-foreground">{activity.task_description}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
              </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}