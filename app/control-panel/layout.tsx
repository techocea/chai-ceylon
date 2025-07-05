import Link from "next/link";
import { ReactNode } from "react";

export default async function ControlPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 bg-primary px-6 py-8 text-white lg:block">
        <h2 className="mb-8 text-xl font-bold">Vendor Panel</h2>
        <ul className="space-y-4 text-sm">
          <li>
            <Link href="/dashboard" className="hover:underline">
              Overview
            </Link>
          </li>
          <li>
            <Link href="/dashboard/orders" className="hover:underline">
              Orders
            </Link>
          </li>
          <li>
            <Link href="/dashboard/products" className="hover:underline">
              Products
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="hover:underline">
              Settings
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 px-4 py-8 lg:px-10 lg:py-12">{children}</main>
    </div>
  );
}
