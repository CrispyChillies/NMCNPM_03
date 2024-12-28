import { useState } from "react"
import { Bell, Filter, Heart, LogOut, MessageSquare, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
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

interface Order {
  id: string
  name: string
  address: string
  date: string
  type: string
  status: "Completed" | "Processing" | "Rejected"
}

// sample data
const orders: Order[] = [
  {
    id: "001",
    name: "John Wick",
    address: "009, ABC st, D1",
    date: "10/0/24",
    type: "Sports",
    status: "Completed",
  },
  {
    id: "002",
    name: "John Wick",
    address: "009, ABC st, D1",
    date: "10/0/24",
    type: "Sports",
    status: "Processing",
  },
  {
    id: "003",
    name: "John Wick",
    address: "009, ABC st, D1",
    date: "10/0/24",
    type: "Sports",
    status: "Rejected",
  },
  {
    id: "004",
    name: "John Wick",
    address: "009, ABC st, D1",
    date: "10/0/24",
    type: "Electronics",
    status: "Rejected", 
  },
  // Add more sample data as needed
]

export default function OrderListPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const filterData = orders.filter((order) => {
    const matchesDate = selectedDate ? order.date.toLowerCase() === selectedDate.toLowerCase() : true
    const matchesType = selectedType ? order.type.toLowerCase() === selectedType.toLowerCase() : true
    const matchesStatus = selectedStatus ? order.status.toLowerCase() === selectedStatus.toLowerCase() : true

    console.log(`Order Status: ${order.status}, Selected Status: ${selectedStatus}`)

    return matchesDate && matchesType && matchesStatus
  })

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="mb-8 text-xl font-bold text-foreground mx-2">Order List</h1>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4 rounded-lg bg-white p-4 border">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Filter By</span>
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Order Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            className="ml-auto text-red-500 hover:text-red-600"
            onClick={() => {
              setSelectedDate("")
              setSelectedType("")
              setSelectedStatus("")
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
                <TableHead>Address</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{order.id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                        order.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "Processing"
                          ? "bg-gray-700 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
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