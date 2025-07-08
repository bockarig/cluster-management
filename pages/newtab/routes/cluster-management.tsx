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
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
  EG: {
    clusters: ["E", "G"],
    stowers: [
      {
        id: "S009",
        name: "Michael Torres",
        assignment: "E1-E4",
        currentRate: 94,
        target: 90,
        status: "above",
      },
      {
        id: "S010",
        name: "Amanda Foster",
        assignment: "E5-E8",
        currentRate: 86,
        target: 90,
        status: "below",
      },
      {
        id: "S011",
        name: "Daniel Wright",
        assignment: "G1-G4",
        currentRate: 91,
        target: 90,
        status: "above",
      },
      {
        id: "S012",
        name: "Jessica Martinez",
        assignment: "G5-G8",
        currentRate: 88,
        target: 90,
        status: "below",
      },
    ],
    buffers: [
      {
        id: "B009",
        name: "Ryan Cooper",
        assignment: "E1-E6",
        performance: "excellent",
        notes: "Top performer this week",
      },
      { id: "B010", name: "Nicole Hayes", assignment: "E7-E13", performance: "good", notes: "" },
      { id: "B011", name: "Brandon Scott", assignment: "G1-G6", performance: "good", notes: "" },
      {
        id: "B012",
        name: "Melissa Clark",
        assignment: "G7-G13",
        performance: "attention",
        notes: "Training needed on new process",
      },
    ],
    lanes: generateLaneData("E").concat(generateLaneData("G")),
    volume: { current: 1180, capacity: 1500, trend: "up" },
  },
  HJ: {
    clusters: ["H", "J"],
    stowers: [
      {
        id: "S013",
        name: "Christopher Lee",
        assignment: "H1-H4",
        currentRate: 89,
        target: 90,
        status: "below",
      },
      {
        id: "S014",
        name: "Stephanie Adams",
        assignment: "H5-H8",
        currentRate: 96,
        target: 90,
        status: "above",
      },
      {
        id: "S015",
        name: "Anthony Garcia",
        assignment: "J1-J4",
        currentRate: 92,
        target: 90,
        status: "above",
      },
      {
        id: "S016",
        name: "Lauren Thompson",
        assignment: "J5-J8",
        currentRate: 87,
        target: 90,
        status: "below",
      },
    ],
    buffers: [
      { id: "B013", name: "Marcus Johnson", assignment: "H1-H6", performance: "good", notes: "" },
      {
        id: "B014",
        name: "Samantha White",
        assignment: "H7-H13",
        performance: "excellent",
        notes: "Perfect attendance record",
      },
      { id: "B015", name: "Tyler Brown", assignment: "J1-J6", performance: "good", notes: "" },
      { id: "B016", name: "Kimberly Davis", assignment: "J7-J13", performance: "good", notes: "" },
    ],
    lanes: generateLaneData("H").concat(generateLaneData("J")),
    volume: { current: 1320, capacity: 1500, trend: "stable" },
  },
  KL: {
    clusters: ["K", "L"],
    stowers: [
      {
        id: "S017",
        name: "Jonathan Miller",
        assignment: "K1-K4",
        currentRate: 93,
        target: 90,
        status: "above",
      },
      {
        id: "S018",
        name: "Rebecca Wilson",
        assignment: "K5-K8",
        currentRate: 84,
        target: 90,
        status: "below",
      },
      {
        id: "S019",
        name: "Kevin Anderson",
        assignment: "L1-L4",
        currentRate: 90,
        target: 90,
        status: "above",
      },
      {
        id: "S020",
        name: "Michelle Taylor",
        assignment: "L5-L8",
        currentRate: 86,
        target: 90,
        status: "below",
      },
    ],
    buffers: [
      {
        id: "B017",
        name: "Gregory Moore",
        assignment: "K1-K6",
        performance: "attention",
        notes: "Needs refresher training",
      },
      {
        id: "B018",
        name: "Christina Jackson",
        assignment: "K7-K13",
        performance: "good",
        notes: "",
      },
      {
        id: "B019",
        name: "Patrick Martin",
        assignment: "L1-L6",
        performance: "excellent",
        notes: "Mentor for new hires",
      },
      { id: "B020", name: "Vanessa Lee", assignment: "L7-L13", performance: "good", notes: "" },
    ],
    lanes: generateLaneData("K").concat(generateLaneData("L")),
    volume: { current: 890, capacity: 1500, trend: "down" },
  },
  MP: {
    clusters: ["M", "P"],
    stowers: [
      {
        id: "S021",
        name: "Steven Rodriguez",
        assignment: "M1-M4",
        currentRate: 97,
        target: 90,
        status: "above",
      },
      {
        id: "S022",
        name: "Diana Lopez",
        assignment: "M5-M8",
        currentRate: 88,
        target: 90,
        status: "below",
      },
      {
        id: "S023",
        name: "Matthew Gonzalez",
        assignment: "P1-P4",
        currentRate: 91,
        target: 90,
        status: "above",
      },
      {
        id: "S024",
        name: "Ashley Hernandez",
        assignment: "P5-P8",
        currentRate: 85,
        target: 90,
        status: "below",
      },
    ],
    buffers: [
      { id: "B021", name: "Joshua Young", assignment: "M1-M6", performance: "good", notes: "" },
      { id: "B022", name: "Brittany King", assignment: "M7-M13", performance: "good", notes: "" },
      {
        id: "B023",
        name: "Andrew Wright",
        assignment: "P1-P6",
        performance: "attention",
        notes: "Equipment issues reported",
      },
      {
        id: "B024",
        name: "Megan Hill",
        assignment: "P7-P13",
        performance: "excellent",
        notes: "Cross-trained on multiple areas",
      },
    ],
    lanes: generateLaneData("M").concat(generateLaneData("P")),
    volume: { current: 1420, capacity: 1500, trend: "up" },
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

export const ClusterManagement = () => {
  const [selectedCluster, setSelectedCluster] = useState("AB")
  const [selectedAssociate, setSelectedAssociate] = useState<any>(null)
  const [notes, setNotes] = useState("")
  const [swapMode, setSwapMode] = useState(false)
  const [selectedForSwap, setSelectedForSwap] = useState<string[]>([])
  const [selectedStowerSheet, setSelectedStowerSheet] = useState<any>(null)
  const [selectedBufferSheet, setSelectedBufferSheet] = useState<any>(null)

  const currentData = clusterData[selectedCluster as keyof typeof clusterData]

  const handleSwapAssignment = () => {
    if (selectedForSwap.length === 2) {
      // In a real app, this would update the backend
      console.log(`Swapping assignments between ${selectedForSwap[0]} and ${selectedForSwap[1]}`)
      setSwapMode(false)
      setSelectedForSwap([])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-danger-5 border-danger-8"
      case "medium":
        return "bg-(--amber-5) border-(--amber-8)"
      case "attention":
        return "bg-(--orange-3) border-(--orange-8)"
      case "excellent":
        return "bg-(--green-3) border-(--green-8)"
      default:
        return "bg-main border-brd-line"
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "bg-(--green-9)"
      case "good":
        return "bg-accent-9"
      case "attention":
        return "bg-(--orange-9)"
      default:
        return "bg-gray-3"
    }
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold ">Cluster Management</h1>
            <p className="text-cnt-secondary text-lg">Leadership Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="neutral" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Badge variant="neutral" className="text-sm">
              <Clock className="w-3 h-3 mr-1" />
              Last updated: 2 min ago
            </Badge>
          </div>
        </div>

        {/* Cluster Selection */}
        <Tabs value={selectedCluster} onValueChange={setSelectedCluster} className="w-full">
          <TabsList variant="solid" className="mb-8 grid w-full grid-cols-6 max-w-md">
            <TabsTrigger value="AB">AB</TabsTrigger>
            <TabsTrigger value="CD">CD</TabsTrigger>
            <TabsTrigger value="EG">EG</TabsTrigger>
            <TabsTrigger value="HJ">HJ</TabsTrigger>
            <TabsTrigger value="KL">KL</TabsTrigger>
            <TabsTrigger value="MP">MP</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCluster} className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Volume</CardTitle>
                  <Package className="h-4 w-4 text-cnt-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.volume.current}</div>
                  <p className="text-xs text-cnt-secondary">
                    of {currentData.volume.capacity} capacity
                  </p>
                  <div className="flex items-center mt-1">
                    {currentData.volume.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className="text-xs text-cnt-secondary">vs last hour</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Stow Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-cnt-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      currentData.stowers.reduce((acc, s) => acc + s.currentRate, 0) /
                        currentData.stowers.length
                    )}
                  </div>
                  <p className="text-xs text-cnt-secondary">Target: 90 packages/hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Associates</CardTitle>
                  <Users className="h-4 w-4 text-cnt-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {currentData.stowers.length + currentData.buffers.length}
                  </div>
                  <p className="text-xs text-cnt-secondary">
                    {currentData.stowers.length} stowers, {currentData.buffers.length} buffers
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-cnt-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {currentData.stowers.filter((s) => s.status === "below").length +
                      currentData.buffers.filter((b) => b.performance === "attention").length}
                  </div>
                  <p className="text-xs text-cnt-secondary">Require attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Lane Layout */}
            <Card className="bg-gray-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  Overiew
                  <div className="flex items-center gap-2 text-sm">
                    <div className="text-cnt-secondary dark:text-cnt-tertiary flex items-center gap-1">
                      <div className="w-3 h-3 bg-danger-5 border border-danger-8 rounded-sm"></div>
                      <span>High WIP</span>
                    </div>
                    <div className="text-cnt-secondary dark:text-cnt-tertiary flex items-center gap-1">
                      <div className="w-3 h-3 bg-(--amber-5) border border-(--amber-8) rounded-sm"></div>
                      <span>Medium</span>
                    </div>
                    <div className="text-cnt-secondary dark:text-cnt-tertiary flex items-center gap-1">
                      <div className="w-3 h-3 bg-main border border-brd-ring rounded-sm"></div>
                      <span>Light</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {currentData.clusters.map((cluster) => (
                    <div key={cluster} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-base">Cluster {cluster}</h3>
                        <Badge variant="neutral" className="text-sm">
                          {currentData.lanes
                            .filter((lane) => lane.cluster === cluster)
                            .reduce((acc, lane) => acc + lane.volume, 0)}{" "}
                          at station
                        </Badge>
                      </div>
                      <div className="p-4 bg-gray-4">
                        <div className="grid grid-cols-4 gap-2">
                          {currentData.lanes
                            .filter((lane) => lane.cluster === cluster)
                            .map((lane) => {
                              const isHighlighted =
                                (selectedStowerSheet &&
                                  isLaneInAssignment(lane.id, selectedStowerSheet.assignment)) ||
                                (selectedBufferSheet &&
                                  isLaneInAssignment(lane.id, selectedBufferSheet.assignment))

                              const hasSelectedAssociate =
                                selectedStowerSheet || selectedBufferSheet
                              const isDeemphasized = hasSelectedAssociate && !isHighlighted

                              // Get base status color
                              const baseStatusColor = getStatusColor(lane.status)

                              // Create highlighted version that preserves status color
                              const getHighlightedColor = (status: string) => {
                                switch (status) {
                                  case "high":
                                    return "bg-danger-5 border-danger-8 shadow-lg ring-2 ring-danger-3"
                                  case "medium":
                                    return "bg-(--amber-5) border-(--amber-8) shadow-lg ring-2 ring-(--amber-3)"
                                  case "attention":
                                    return "bg-orange-200 border-orange-500 shadow-lg ring-2 ring-orange-300"
                                  case "excellent":
                                    return "bg-green-200 border-green-500 shadow-lg ring-2 ring-green-300"
                                  default:
                                    return "bg-main border-accent-8 shadow-lg ring-2 ring-accent-4"
                                }
                              }

                              return (
                                <div
                                  key={lane.id}
                                  className={`p-3 rounded-lg border-2 text-center transition-all hover:shadow-md relative ${
                                    isHighlighted
                                      ? `${getHighlightedColor(lane.status)} z-10`
                                      : isDeemphasized
                                        ? `${baseStatusColor} opacity-30 grayscale`
                                        : baseStatusColor
                                  }`}
                                >
                                  {/* Add assignment indicator for highlighted lanes */}
                                  {isHighlighted && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-8 rounded-full border-2 border-white-a9"></div>
                                  )}

                                  <div
                                    className={`font-medium text-sm ${isDeemphasized ? "text-gray-400" : ""}`}
                                  >
                                    {lane.id}
                                  </div>
                                  <div
                                    className={`text-xs mt-1 ${isDeemphasized ? "text-gray-400" : "text-cnt-secondary"}`}
                                  >
                                    {lane.volume}/{lane.capacity}
                                  </div>
                                  <div className="w-full bg-gray-6 rounded-full h-1.5 mt-2">
                                    <div
                                      className={`h-1.5 rounded-full transition-all ${
                                        isHighlighted
                                          ? lane.status === "high"
                                            ? "bg-danger-8"
                                            : lane.status === "medium"
                                              ? "bg-(--amber-8)"
                                              : lane.status === "attention"
                                                ? "bg-(--orange-8)"
                                                : "bg-accent-8"
                                          : isDeemphasized
                                            ? "bg-gray-4"
                                            : "bg-accent-8"
                                      }`}
                                      style={{ width: `${(lane.volume / lane.capacity) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Associates Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stowers */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Stowers</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={swapMode ? "secondary" : "primary"}
                      onClick={() => setSwapMode(!swapMode)}
                    >
                      {swapMode ? "Cancel Swap" : "Swap Assignments"}
                    </Button>
                    {swapMode && selectedForSwap.length === 2 && (
                      <Button onClick={handleSwapAssignment}>Confirm Swap</Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentData.stowers.map((stower) => (
                    <div
                      key={stower.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        swapMode && selectedForSwap.includes(stower.id)
                          ? "border-blue-500 bg-blue-50"
                          : stower.status === "below"
                            ? "border-orange-200 hover:border-orange-300"
                            : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => {
                        if (swapMode) {
                          if (selectedForSwap.includes(stower.id)) {
                            setSelectedForSwap(selectedForSwap.filter((id) => id !== stower.id))
                          } else if (selectedForSwap.length < 2) {
                            setSelectedForSwap([...selectedForSwap, stower.id])
                          }
                        } else {
                          setSelectedStowerSheet(stower)
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{stower.name}</div>
                          <div className="text-sm text-cnt-secondary">{stower.assignment}</div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-bold ${stower.status === "above" ? "text-green-600" : "text-orange-600"}`}
                          >
                            {stower.currentRate}/hr
                          </div>
                          <div className="text-xs text-gray-500">Target: {stower.target}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              {/* Stower Details Sheet */}

              {/* Buffers */}
              <Card>
                <CardHeader>
                  <CardTitle>Buffers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentData.buffers.map((buffer) => (
                    <div
                      key={buffer.id}
                      className="p-3 rounded-lg border border-gray-200 cursor-pointer transition-all hover:shadow-md hover:border-gray-300"
                      onClick={() => setSelectedBufferSheet(buffer)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">{buffer.name}</div>
                          <div className="text-sm text-cnt-secondary">{buffer.assignment}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${getPerformanceColor(buffer.performance)}`}
                          ></div>
                          <span className="text-sm capitalize">{buffer.performance}</span>
                        </div>
                      </div>
                      {buffer.notes && (
                        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                          {buffer.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
