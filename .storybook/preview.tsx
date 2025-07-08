import { useEffect } from "react"
import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react-vite"

import "@/styles/global.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

const DEFAULT_GRAY_COLOR = "slate"
const DEFAULT_ACCENT_COLOR = "cyan"
const DEFAULT_RADIUS = "medium"
const DEFAULT_SCALING = "100%"

const withThemeProvider = (Story, { parameters }) => {
  const {
    grayColor = DEFAULT_GRAY_COLOR,
    accentColor = DEFAULT_ACCENT_COLOR,
    radius = DEFAULT_RADIUS,
    scaling = DEFAULT_SCALING,
  } = parameters
  useEffect(() => {
    // Ensure the theme is set to light on initial load
    document.documentElement.classList.add("creightit")
    document.documentElement.setAttribute("data-gray-color", grayColor)
    document.documentElement.setAttribute("data-accent-color", accentColor)

    document.documentElement.setAttribute("data-is-root-theme", "true")
    document.documentElement.setAttribute("data-scaling", scaling)
    document.documentElement.setAttribute("data-radius", radius)
  }, [])

  return <Story />
}

export const decorators = [
  withThemeProvider,
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
]

export default preview
