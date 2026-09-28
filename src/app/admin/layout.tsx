import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prospera Central Admin — Enterprise CRM, Analytics & AI Portal",
  description: "Administrative command center for corporate consulting, client inquiries, catalog, and AI training.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      {children}
    </div>
  );
}
