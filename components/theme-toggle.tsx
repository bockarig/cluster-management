import { useId } from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const ThemeToggle = () => {
  const id = useId()
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="inline-flex items-center gap-2">
      <Switch
        id={id}
        className="rounded-sm [&_span]:rounded"
        checked={theme === "dark"}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor={id} className="sr-only">
        Square switch
      </Label>
    </div>
  )
}
