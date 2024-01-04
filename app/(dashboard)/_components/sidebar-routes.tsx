"use client";

import { BarChart, Compass, Layout, List, UserPlus,FileBox } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

const adminRoutes = [
  {
    icon:FileBox,
    label: "Course Moderation",
    href: "/admin/course_moderation"
  },
  {
    icon: UserPlus,
    label: "Teacher Registration",
    href:"/admin/teacher_registration"
  }
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");

  let routes 
  if (!isTeacherPage && !isAdminPage){
    routes =guestRoutes
  }
  else if (isTeacherPage && !isAdminPage){
    routes = teacherRoutes
  }
  else{
    routes = adminRoutes
  }

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}