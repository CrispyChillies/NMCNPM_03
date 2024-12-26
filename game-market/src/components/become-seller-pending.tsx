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

interface SellerRequest {
  id: string
  name: string
  email: string
  phoneNumber: string
  businessName: string
  productDescription: string
  address: string
  date: string
  status: string
}

// Sample data
const sellerRequests: SellerRequest[] = [
  {
    id: "001",
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "+1234567890",
    businessName: "John's Electronics",
    productDescription: "Selling high-quality electronics and gadgets",
    address: "123 Main St, Anytown, USA",
    date: "2023-06-01",
    status: "Pending"
  },
  {
    id: "002",
    name: "Jane Smith",
    email: "jane@example.com",
    phoneNumber: "+1987654321",
    businessName: "Jane's Furniture Emporium",
    productDescription: "Handcrafted furniture and home decor",
    address: "456 Oak Ave, Somewhere, USA",
    date: "2023-06-02",
    status: "Pending"
  },
  // Add more sample data as needed
]

export default function BecomeSellerPending() {
  const [requests, setRequests] = useState(sellerRequests)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [declineReason, setDeclineReason] = useState("")
  const [customDeclineReason, setCustomDeclineReason] = useState("")

  const filterData = requests.filter((request) => {
    const matchesStatus = selectedStatus ? request.status.toLowerCase() === selectedStatus.toLowerCase() : true
    const matchesName = nameFilter ? request.name.toLowerCase().includes(nameFilter.toLowerCase()) : true
    const matchesStartDate = startDate ? new Date(request.date) >= new Date(startDate) : true
    const matchesEndDate = endDate ? new Date(request.date) <= new Date(endDate) : true

    return matchesStatus && matchesName && matchesStartDate && matchesEndDate
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
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="mb-8 ml-2 text-xl font-bold text-foreground">Become Seller Pending Requests</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 border">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Filter By</span>
          <Input
            placeholder="Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
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
              setNameFilter("")
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
                <TableHead>Name</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="text-center">{request.id}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.businessName}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.status}</TableCell>
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
                            <DialogTitle>Seller Application Details</DialogTitle>
                            <DialogDescription>
                              View the details of the seller application.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input id="name" value={request.name} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">
                                Email
                              </Label>
                              <Input id="email" value={request.email} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="phone" className="text-right">
                                Phone
                              </Label>
                              <Input id="phone" value={request.phoneNumber} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="business" className="text-right">
                                Business
                              </Label>
                              <Input id="business" value={request.businessName} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">
                                Description
                              </Label>
                              <Textarea id="description" value={request.productDescription} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="address" className="text-right">
                                Address
                              </Label>
                              <Textarea id="address" value={request.address} className="col-span-3" readOnly />
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
                                Select a reason for declining this seller application.
                              </p>
                            </div>
                            <RadioGroup value={declineReason} onValueChange={setDeclineReason}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="incomplete" id="r1" />
                                <Label htmlFor="r1">Incomplete information</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="unqualified" id="r2" />
                                <Label htmlFor="r2">Unqualified seller</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="policy" id="r3" />
                                <Label htmlFor="r3">Violates platform policy</Label>
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

