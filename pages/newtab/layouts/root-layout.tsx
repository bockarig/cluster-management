import React from "react"
import { Outlet } from "react-router"

import { cx } from "@/lib/utils.ts"
import { Logo } from "@/components/logo.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ThemeToggle } from "@/components/theme-toggle.tsx"

const navigation = [
  { name: "Cluster Owner", href: "#", current: true },
  { name: "Pick & Stage", href: "#", current: false },
  { name: "Notes", href: "#", current: false },
]

export const RootLayout = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <header className="border-b border-brd-line">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <div className="overflow flex h-16 sm:space-x-7">
              <div className="hidden shrink-0 sm:flex sm:items-center">
                <a href="#" className="p-1.5">
                  <Logo className="size-5 shrink-0 text-cnt-primary" aria-hidden={true} />
                </a>
              </div>
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cx(
                      item.current
                        ? "border-accent-9 text-accent-9"
                        : "border-transparent text-cnt-secondary hover:border-brd-control hover:text-cnt-primary",
                      "inline-flex items-center whitespace-nowrap border-b-2 px-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <div className="p-4 sm:p-6 lg:p-8">
        <Outlet />
      </div>
    </ThemeProvider>
  )
}
