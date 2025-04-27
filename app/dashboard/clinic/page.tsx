"use client"

import { SetStateAction, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, CheckCircle, Clock, MapPin, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function ClinicDashboard() {
  const { toast } = useToast()
  const router = useRouter()

  const [activeEmergencies, setActiveEmergencies] = useState([])
  const [resolvedEmergencies, setResolvedEmergencies] = useState([])
  const [selectedEmergency, setSelectedEmergency] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchEmergencies()

    // Set up polling for new emergencies
    const interval = setInterval(fetchEmergencies, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchEmergencies = async () => {
    try {
      const response = await fetch("/api/emergency/all")
      if (response.ok) {
        const data = await response.json()
        setActiveEmergencies(data.active || [])
        setResolvedEmergencies(data.resolved || [])
      }
    } catch (error) {
      console.error("Failed to fetch emergencies:", error)
    }
  }

  const handleViewEmergency = (emergency: SetStateAction<null>) => {
    setSelectedEmergency(emergency)
    setIsDialogOpen(true)
  }

  const handleResolveEmergency = async () => {
    if (!selectedEmergency) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/emergency/resolve/${selectedEmergency.id}`, {
        method: "PUT",
      })

      if (response.ok) {
        toast({
          title: "Emergency resolved",
          description: "The emergency has been marked as resolved.",
          variant: "success",
        })

        // Update local state
        setActiveEmergencies(activeEmergencies.filter((e) => e.id !== selectedEmergency.id))
        setResolvedEmergencies([...resolvedEmergencies, { ...selectedEmergency, status: "resolved" }])

        // Close dialog
        setIsDialogOpen(false)
        setSelectedEmergency(null)
      } else {
        throw new Error("Failed to resolve emergency")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resolve emergency. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimestamp = (timestamp: string | number | Date) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Clinic Dashboard</h2>
        <p className="text-muted-foreground">Monitor and respond to campus medical emergencies</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <Bell className="h-5 w-5" />
              Active Emergencies
            </CardTitle>
            <CardDescription>Emergencies requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            {activeEmergencies.length > 0 ? (
              <div className="space-y-4">
                {activeEmergencies.map((emergency) => (
                  <Card key={emergency.id} className="overflow-hidden">
                    <div className="bg-red-100 dark:bg-red-900/20 px-4 py-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">{emergency.emergencyType}</Badge>
                        <span className="text-sm font-medium">Reported: {formatTimestamp(emergency.createdAt)}</span>
                      </div>
                      <Button size="sm" onClick={() => handleViewEmergency(emergency)}>
                        View Details
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{emergency.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Victim: {emergency.victimMatNo}</span>
                        </div>
                        <p className="text-sm mt-2">{emergency.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <h3 className="text-xl font-medium">No active emergencies</h3>
                <p className="text-muted-foreground">All reported emergencies have been resolved</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="today">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Emergency History</h3>
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="today" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {resolvedEmergencies.length > 0 ? (
                  <div className="space-y-4">
                    {resolvedEmergencies.map((emergency) => (
                      <div key={emergency.id} className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex-1">
                          <div className="font-medium">{emergency.emergencyType}</div>
                          <div className="text-sm text-muted-foreground">{emergency.location}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatTimestamp(emergency.createdAt)}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleViewEmergency(emergency)}>
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No resolved emergencies today</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-center text-muted-foreground py-4">Historical data will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-center text-muted-foreground py-4">Historical data will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedEmergency && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Emergency Details</DialogTitle>
              <DialogDescription>Complete information about the reported emergency</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Type:</span>
                <span className="col-span-3">{selectedEmergency.emergencyType}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Location:</span>
                <span className="col-span-3">{selectedEmergency.location}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Reporter:</span>
                <span className="col-span-3">{selectedEmergency.reporterMatNo}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Victim:</span>
                <span className="col-span-3">{selectedEmergency.victimMatNo}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Time:</span>
                <span className="col-span-3">{formatTimestamp(selectedEmergency.createdAt)}</span>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="text-sm font-medium">Description:</span>
                <p className="col-span-3">{selectedEmergency.description}</p>
              </div>

              {selectedEmergency.medicalInfo && (
                <div className="grid grid-cols-4 items-start gap-4">
                  <span className="text-sm font-medium">Medical Info:</span>
                  <div className="col-span-3">
                    <p>
                      <strong>Allergies:</strong> {selectedEmergency.medicalInfo.allergies || "None"}
                    </p>
                    <p>
                      <strong>Conditions:</strong> {selectedEmergency.medicalInfo.conditions || "None"}
                    </p>
                    <p>
                      <strong>Medications:</strong> {selectedEmergency.medicalInfo.medications || "None"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              {selectedEmergency.status !== "resolved" && (
                <Button onClick={handleResolveEmergency} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Mark as Resolved"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
