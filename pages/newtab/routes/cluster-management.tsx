import { useState } from "react"
import {
  AlertTriangle,
  Clock,
  MessageSquare,
  Package,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SelectNative } from "@/components/ui/select-native"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ContentPlaceholder } from "@/components/content-placeholder"

const clusterData = {
  AB: {
    clusters: ["A", "B"],
    stowers: [
      {
        id: "S001",
        name: "John Smith",
        assignment: "A1-A4",
        currentRate: 85,
        target: 90,
        status: "below",
      },
      {
        id: "S002",
        name: "Maria Garcia",
        assignment: "A5-A8",
        currentRate: 95,
        target: 90,
        status: "above",
      },
      {
        id: "S003",
        name: "David Chen",
        assignment: "B1-B4",
        currentRate: 88,
        target: 90,
        status: "below",
      },
      {
        id: "S004",
        name: "Sarah Johnson",
        assignment: "B5-B8",
        currentRate: 92,
        target: 90,
        status: "above",
      },
    ],
    buffers: [
      {
        id: "B001",
        name: "Mike Wilson",
        assignment: "A1-A6",
        performance: "good",
        notes: "Consistent catch rate",
      },
      {
        id: "B002",
        name: "Lisa Brown",
        assignment: "A7-A13",
        performance: "attention",
        notes: "Missed 3 packages in last hour",
      },
      { id: "B003", name: "Tom Davis", assignment: "B1-B6", performance: "good", notes: "" },
      {
        id: "B004",
        name: "Anna Lee",
        assignment: "B7-B13",
        performance: "excellent",
        notes: "Zero misses today",
      },
    ],
    lanes: generateLaneData("A").concat(generateLaneData("B")),
    volume: { current: 1250, capacity: 1500, trend: "up" },
  },
  CD: {
    clusters: ["C", "D"],
    stowers: [
      {
        id: "S005",
        name: "Robert Kim",
        assignment: "C1-C4",
        currentRate: 91,
        target: 90,
        status: "above",
      },
      {
        id: "S006",
        name: "Jennifer Wu",
        assignment: "C5-C8",
        currentRate: 87,
        target: 90,
        status: "below",
      },
      {
        id: "S007",
        name: "Carlos Rodriguez",
        assignment: "D1-D4",
        currentRate: 93,
        target: 90,
        status: "above",
      },
      {
        id: "S008",
        name: "Emily Taylor",
        assignment: "D5-D8",
        currentRate: 89,
        target: 90,
        status: "below",
      },
    ],
    buffers: [
      { id: "B005", name: "Kevin Park", assignment: "C1-C6", performance: "good", notes: "" },
      { id: "B006", name: "Rachel Green", assignment: "C7-C13", performance: "good", notes: "" },
      {
        id: "B007",
        name: "James Miller",
        assignment: "D1-D6",
        performance: "attention",
        notes: "Slow on peak hours",
      },
      { id: "B008", name: "Sophie Anderson", assignment: "D7-D13", performance: "good", notes: "" },
    ],
    lanes: generateLaneData("C").concat(generateLaneData("D")),
    volume: { current: 980, capacity: 1500, trend: "stable" },
  },
}

function generateLaneData(cluster: string) {
  const lanes = []
  for (let i = 1; i <= 13; i++) {
    const aisle1 = i * 2 - 1
    const aisle2 = i * 2
    lanes.push({
      id: `${cluster}${aisle1}-${cluster}${aisle2}`,
      cluster,
      volume: Math.floor(Math.random() * 50) + 20,
      capacity: 80,
      status: Math.random() > 0.8 ? "high" : Math.random() > 0.6 ? "medium" : "normal",
    })
  }
  return lanes
}

function isLaneInAssignment(laneId: string, assignment: string): boolean {
  // Parse assignment like "A1-A4" or "A7-A13"
  const assignmentMatch = assignment.match(/([A-Z])(\d+)-([A-Z])(\d+)/)
  if (!assignmentMatch) return false

  const [, startCluster, startNum, endCluster, endNum] = assignmentMatch
  const startNumber = Number.parseInt(startNum)
  const endNumber = Number.parseInt(endNum)

  // Parse lane ID like "A1-A2" or "B5-B6"
  const laneMatch = laneId.match(/([A-Z])(\d+)-([A-Z])(\d+)/)
  if (!laneMatch) return false

  const [, laneCluster, laneStart, , laneEnd] = laneMatch
  const laneStartNum = Number.parseInt(laneStart)
  const laneEndNum = Number.parseInt(laneEnd)

  // Check if lane cluster matches and lane numbers fall within assignment range
  return laneCluster === startCluster && laneStartNum >= startNumber && laneEndNum <= endNumber
}

export const ClusterManagement = () => (
  <div className="p-4 sm:p-6 lg:p-8">
    <header>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold">Cluster Overiew</h3>
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
