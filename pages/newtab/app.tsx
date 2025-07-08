import { createMemoryRouter, RouterProvider } from "react-router"

import { RootLayout } from "./layouts/root-layout.tsx"
import { ClusterManagement } from "./routes/cluster-management.tsx"

const router = createMemoryRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: ClusterManagement,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
