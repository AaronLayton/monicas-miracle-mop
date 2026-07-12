import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin/auth"
import { AdminLoginForm } from "@/components/admin/admin-login-form"

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin")
  }
  return (
    <div className="page-nav-offset mx-auto max-w-sm px-4 pb-24">
      <div className="rounded-3xl bg-card p-8 shadow-float shine-border">
        <h1 className="text-display text-2xl font-semibold mb-2">
          Admin sign in
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          For {`Kasey's`} eyes only — enter the dashboard password.
        </p>
        <AdminLoginForm />
      </div>
    </div>
  )
}
