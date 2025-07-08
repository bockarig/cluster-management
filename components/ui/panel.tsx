import React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cx } from "@/lib/utils"

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean
}

const Panel = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div"
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          "relative w-full rounded-lg border p-6 text-left shadow-xs select-none",
          // background color
          "bg-main",
          // border color
          "border-brd-line",
          className
        )}
        creight-id="creightit-card"
        {...props}
      />
    )
  }
)

Panel.displayName = "Panel"

export { Panel, type CardProps }
