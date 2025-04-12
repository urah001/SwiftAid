"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertCircle, ClipboardList, FileText, Home, Settings, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardNavProps {
  userRole: "student" | "clinic"
}

export function DashboardNav({ userRole }: DashboardNavProps) {
  const pathname = usePathname()

  const studentNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/student",
      icon: Home,
    },
    {
      title: "Report Emergency",
      href: "/dashboard/student/report",
      icon: AlertCircle,
    },
    {
      title: "Medical Profile",
      href: "/dashboard/student/profile",
      icon: User,
    },
    {
      title: "History",
      href: "/dashboard/student/history",
      icon: ClipboardList,
    },
    {
      title: "Settings",
      href: "/dashboard/student/settings",
      icon: Settings,
    },
  ]

  const clinicNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/clinic",
      icon: Home,
    },
    {
      title: "Active Emergencies",
      href: "/dashboard/clinic/active",
      icon: AlertCircle,
    },
    {
      title: "Emergency History",
      href: "/dashboard/clinic/history",
      icon: ClipboardList,
    },
    {
      title: "Reports",
      href: "/dashboard/clinic/reports",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/dashboard/clinic/settings",
      icon: Settings,
    },
  ]

  const navItems = userRole === "clinic" ? clinicNavItems : studentNavItems

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item, index) => (
        <Button
          key={index}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn("justify-start", pathname === item.href && "bg-muted font-medium")}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
