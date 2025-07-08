import { PickAndStage } from "@/pages/newtab/routes/pick-and-stage.tsx"
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
      {
        path: "/pick-and-stage",
        Component: PickAndStage,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
