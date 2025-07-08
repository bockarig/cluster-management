import React from "react"
import ReactDOM from "react-dom/client"

import App from "./app.tsx"

import "@fontsource-variable/sora"
import "@/styles/global.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
