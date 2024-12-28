import { useState } from "react"
import { Bell, Filter, Heart, LogOut, MessageSquare, Settings, Eye, Check, X, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface GameRequest {
  id: string
  user: string
  date: string
  status: string
  topics: string
  gameName: string
  gameDescription: string
  price: number
  category: string
  imageUrl: string
}

// Sample data
const gameRequests: GameRequest[] = [
  {
    id: "001",
    user: "John Doe",
    date: "2023-06-01",
    status: "Pending",
    topics: "RPG",
    gameName: "The Witcher 3",
    gameDescription: "An open-world RPG with a rich story",
    price: 39.99,
    category: "RPG",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "002",
    user: "Jane Smith",
    date: "2023-06-02",
    status: "Pending",
    topics: "Sports",
    gameName: "FIFA 22",
    gameDescription: "A popular football simulation game",
    price: 59.99,
    category: "Sports",
    imageUrl: "/placeholder.svg"
  },
  // Add more sample data as needed
]

export default function GameRequest() {
  const [requests, setRequests] = useState(gameRequests)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [userFilter, setUserFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<GameRequest | null>(null)
  const [declineReason, setDeclineReason] = useState("")
  const [customDeclineReason, setCustomDeclineReason] = useState("")

  const filterData = requests.filter((request) => {
    const matchesStatus = selectedStatus ? request.status.toLowerCase() === selectedStatus.toLowerCase() : true
    const matchesTopic = selectedTopic ? request.topics.toLowerCase() === selectedTopic.toLowerCase() : true
    const matchesUser = userFilter ? request.user.toLowerCase().includes(userFilter.toLowerCase()) : true
    const matchesStartDate = startDate ? new Date(request.date) >= new Date(startDate) : true
    const matchesEndDate = endDate ? new Date(request.date) <= new Date(endDate) : true

    return matchesStatus && matchesTopic && matchesUser && matchesStartDate && matchesEndDate
  })

  const handleAccept = (id: string) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Accepted' } : request
    ))
  }

  const handleDecline = (id: string) => {
    const reason = declineReason === 'Other' ? customDeclineReason : declineReason
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Declined' } : request
    ))
    // Here you would typically send the reason to the user
    console.log(`Request ${id} declined. Reason: ${reason}`)
    setDeclineReason("")
    setCustomDeclineReason("")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="mb-8 text-xl font-bold text-foreground mx-2">Game Request Pending</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 border">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Filter By</span>
          <Input
            placeholder="User"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="max-w-[200px]"
          />
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rpg">RPG</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="sandbox">Sandbox</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="max-w-[150px]"
          />
          <Input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="max-w-[150px]"
          />
          <Button
            variant="ghost"
            className="ml-auto text-red-500 hover:text-red-600"
            onClick={() => {
              setSelectedStatus("")
              setSelectedTopic("")
              setUserFilter("")
              setStartDate("")
              setEndDate("")
            }}
          >
            Reset Filter
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg bg-white border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Topics</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="text-center">{request.id}</TableCell>
                  <TableCell>{request.user}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{request.topics}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Game Details</DialogTitle>
                            <DialogDescription>
                              View the details of the game request.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <img src={request.imageUrl} alt={request.gameName} className="w-full h-48 object-cover rounded-lg" />
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input id="name" value={request.gameName} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">
                                Description
                              </Label>
                              <Textarea id="description" value={request.gameDescription} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="price" className="text-right">
                                Price
                              </Label>
                              <Input id="price" value={`$${request.price.toFixed(2)}`} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="category" className="text-right">
                                Category
                              </Label>
                              <Input id="category" value={request.category} className="col-span-3" readOnly />
                            </div>
                          </div>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="icon" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleAccept(request.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="icon" className="bg-red-500 hover:bg-red-600 text-white">
                            <X className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Decline Reason</h4>
                              <p className="text-sm text-muted-foreground">
                                Select a reason for declining this request.
                              </p>
                            </div>
                            <RadioGroup value={declineReason} onValueChange={setDeclineReason}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="inappropriate" id="r1" />
                                <Label htmlFor="r1">Inappropriate content</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="duplicate" id="r2" />
                                <Label htmlFor="r2">Duplicate listing</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pricing" id="r3" />
                                <Label htmlFor="r3">Incorrect pricing</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Other" id="r4" />
                                <Label htmlFor="r4">Other</Label>
                              </div>
                            </RadioGroup>
                            {declineReason === 'Other' && (
                              <Textarea
                                placeholder="Enter custom reason"
                                value={customDeclineReason}
                                onChange={(e) => setCustomDeclineReason(e.target.value)}
                              />
                            )}
                            <Button onClick={() => handleDecline(request.id)}>Submit</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}