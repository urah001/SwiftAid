"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const campusLocations = [
  "Main Library",
  "Science Building",
  "Sports field",
  "Engineering Faculty",
  "Medical Center",
  "Cafeteria",
  "Parking Lot",
  "Administration Building",
  "Main Gate",
  "Small Gate",
  "Faculty of Science",
  "Faculty of Engineering",
  "Faculty of Computing",
  "Library",
  "Admin Block",
  "Student Male Hostel Takeoff site",
  "Student Male Hostel Permanent site",
  "Student Female Hostel Takeoff site",
  "Student Female Hostel Permanent site",
  "School Cafeteria",
  "School Clinic",
  "Lecture Room 1",
  "Lecture Room 2",
  "Lecture Room 3",
  "Lecture Room 4",
  "Lecture Room 5",
  "Lecture Room 6",
  "Lecture Room 7",
  "School Field",
  "ICT Center",
  "Computer Lab",
];

type EmergencyReport = {
  id: string;
  emergencyType: string;
  location: string;
  status: "resolved" | "pending";
};

export default function StudentDashboard() {
  const { user } = useKindeBrowserClient();
  const { toast } = useToast();
  const router = useRouter();

  const [emergencyType, setEmergencyType] = useState("");
  const [location, setLocation] = useState("");
  const [victimMatNo, setVictimMatNo] = useState("");
  const [description, setDescription] = useState("");
  const [allergies, setAllergies] = useState("");
  const [condition, setCondition] = useState("");
  const [medication, setMedication] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [recentReports, setRecentReports] = useState<EmergencyReport[]>([]);
  // this is the funtion to send the report to the database
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/emergency/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emergencyType,
          location,
          victimMatNo: victimMatNo || user?.email,
          description,
          reporterMatNo: user?.email, 
        }),
      });

      if (response.ok) {
        toast({
          title: "Emergency reported",
          description:
            "Medical staff has been notified and will respond shortly.",
          variant: "default",
        });

        setEmergencyType("");
        setLocation("");
        setVictimMatNo("");
        setDescription("");

        fetchRecentReports();
      } else {
        throw new Error("Failed to submit report");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit emergency report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchRecentReports = async () => {
    try {
      const response = await fetch("/api/emergency/user-reports");
      if (response.ok) {
        const data = await response.json();
        setRecentReports(data.reports);
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  };

  // this is the funtion to send the user medical information to the database
  // this function would be called only once make the component display none , or rethink this so the student can update their database everytime
  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch("/api/emergency/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //these are the json data that would be sent to the database , it must b same as the collection type in the database
        body: JSON.stringify({
          allergies,
          condition,
          medication,
          bloodType,
        }),
      });

      if (response.ok) {
        toast({
          title: "Medical Information Updated successfully",
          description: "Medical Information has been updated.",
          variant: "default",
        });

        setAllergies("");
        setCondition("");
        setMedication("");
        setBloodType(""); 
      } else {
        throw new Error("Failed to Update medical Record");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to update medical report report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // ✅ Fetch reports on page load
  //try not to increase this polling funtion , it causes the system to crash because of too frequent reload of the server
  useEffect(() => {
    fetchRecentReports();
    // Set up polling for new emergencies
    const interval = setInterval(fetchRecentReports, 20000); // Poll every 2 seconds
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Student Dashboard</h2>
        <p className="text-muted-foreground">
          Report emergencies or update your medical information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Report Emergency
            </CardTitle>
            <CardDescription>
              Submit details about a medical emergency on campus
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergency-type">Emergency Type</Label>
                <Select
                  value={emergencyType}
                  onValueChange={setEmergencyType}
                  required
                >
                  <SelectTrigger id="emergency-type">
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical Emergency</SelectItem>
                    <SelectItem value="injury">Injury/Accident</SelectItem>
                    <SelectItem value="mental">Mental Health Crisis</SelectItem>
                    <SelectItem value="other">Other Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation} required>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select campus location" />
                  </SelectTrigger>
                  <SelectContent>
                    {campusLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="victim-matno">
                  Victim&apos;s Matriculation Number (if not you)
                </Label>
                <Input
                  id="victim-matno"
                  placeholder="provide the victim or your matNo"
                  value={victimMatNo}
                  onChange={(e) => setVictimMatNo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the emergency situation"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Report Emergency"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        {/* this is a component to update the database with the your medical information */}
        <form onSubmit={handleUpdate}>
          <Card>
            <CardHeader>
              <CardTitle>Your Medical Information</CardTitle>
              <CardDescription>
                Update your medical information for emergency responders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="List any allergies you have"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conditions">Medical Conditions</Label>
                <Textarea
                  id="conditions"
                  onChange={(e) => setCondition(e.target.value)}
                  value={condition}
                  placeholder="List any medical conditions"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  onChange={(e) => setMedication(e.target.value)}
                  value={medication}
                  placeholder="List any medications you're taking"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">blood group</Label>
                <Textarea
                  id="bloodType"
                  onChange={(e) => setBloodType(e.target.value)}
                  value={bloodType}
                  placeholder="what is your blood group.."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isUpdating}>
                {isUpdating ? "Submitting..." : "Update Medical Record"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>

      {/* this is a component to show your recent report */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Reports</CardTitle>
          <CardDescription>
            History of emergencies you've reported
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentReports.length > 0 ? (
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <div className="flex-1">
                    <div className="font-medium">{report.emergencyType}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-sm ${
                        report.status === "resolved"
                          ? "text-green-500"
                          : "text-amber-500"
                      }`}
                    >
                      {report.status === "resolved" ? "Resolved" : "Pending"}
                    </div>
                    {report.status === "resolved" && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No emergency reports yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
