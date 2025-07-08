import { Card } from "@/components/ui/card"
import { SelectNative } from "@/components/ui/select-native"
import { ContentPlaceholder } from "@/components/content-placeholder"

export const ClusterManagement = () => (
  <div className="p-4 sm:p-6 lg:p-8">
    <header>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold">Overview</h3>
        <div className="mt-4 items-center sm:mt-0 sm:flex sm:space-x-2">
          <SelectNative className="w-full sm:w-fit" defaultValue="1">
            <option value="1">Today</option>
            <option value="2">Last 7 days</option>
            <option value="3">Last 4 weeks</option>
            <option value="4">Last 12 months</option>
          </SelectNative>
          <SelectNative className="mt-2 w-full sm:mt-0 sm:w-fit" defaultValue="1">
            <option value="1">US-West</option>
            <option value="2">US-East</option>
            <option value="3">EU-Central-1</option>
          </SelectNative>
        </div>
      </div>
    </header>
    <main>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="h-36 p-2">
          <ContentPlaceholder />
        </Card>
        <Card className="h-36 p-2">
          <ContentPlaceholder />
        </Card>
        <Card className="h-36 p-2">
          <ContentPlaceholder />
        </Card>
      </div>
      <Card className="mt-4 h-96 p-2">
        <ContentPlaceholder />
      </Card>
    </main>
  </div>
)
