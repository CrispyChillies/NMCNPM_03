import { useState, useEffect } from "react"
import axios from "axios"
import { Filter } from 'lucide-react'
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
  status: "Completed" | "Pending" | "Cancelled" | "Paid"
}

export default function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const response = await axios.get('http://localhost:6969/api/admin/orders', { headers });
        if (response.data.success && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const filterData = orders.filter((order) => {
    const matchesDate = selectedDate ? order.date.toLowerCase() === selectedDate.toLowerCase() : true
    const matchesType = selectedType ? order.type.toLowerCase() === selectedType.toLowerCase() : true
    const matchesStatus = selectedStatus ? order.status.toLowerCase() === selectedStatus.toLowerCase() : true

    return matchesDate && matchesType && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date as "MM/DD/YYYY"
  };


  return (
    <div className="flex w-full bg-background">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden p-8">
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
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
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{order.id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                        order.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "pending"
                          ? "bg-gray-700 text-white"
                          : order.status === "cancelled"
                          ? "bg-red-500 text-white"
                          : order.status === "paid"
                          ? "bg-blue-500 text-white"
                          : ""
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