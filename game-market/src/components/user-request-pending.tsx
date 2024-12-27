import { useState, useEffect } from "react";
import { Bell, Filter, Heart, LogOut, MessageSquare, Settings, Eye, Check, X, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UserRequest {
  gameRequestId: string;
  userId: string;
  requestDate: string;
  status: string;
  name: string;
  description: string;
  price: number;
  genre: string;
  image: string;
}

export default function UserRequestPending() {
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<UserRequest | null>(null);
  const [declineReason, setDeclineReason] = useState("");
  const [customDeclineReason, setCustomDeclineReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await axios.get< {recordsets:UserRequest[][]}>('http://localhost:6969/api/users/request-pending');
        setRequests(response.data.recordsets[0]);
      } catch (error) {
        console.error("Failed to fetch user requests:", error);
        setError("Failed to fetch user requests");
      }
    };

    fetchUserRequests();
  }, []);

  const filterData = requests.filter((request) => {
    const matchesStatus = selectedStatus ? request.status.toLowerCase() === selectedStatus.toLowerCase() : true;
    const matchesUser = userFilter ? request.userId.toLowerCase().includes(userFilter.toLowerCase()) : true;
    const matchesStartDate = startDate ? new Date(request.requestDate) >= new Date(startDate) : true;
    const matchesEndDate = endDate ? new Date(request.requestDate) <= new Date(endDate) : true;

    return matchesStatus && matchesUser && matchesStartDate && matchesEndDate;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date as "MM/DD/YYYY"
  };

  const handleAccept = async (id: string) => {
    try {
      await axios.put(`http://localhost:6969/api/users/request-product-upload/${id}`);
      setRequests(requests.map(request => 
        request.gameRequestId === id ? { ...request, status: 'Accepted' } : request
      ));
      console.log(`Accepted request with id: ${id}`);
    } catch (error) {
      console.error('Failed to accept request:', error);
      setError('Failed to accept request');
    }
  };

  const handleDecline = async (id: string) => {
    const reason = declineReason === 'Other' ? customDeclineReason : declineReason;
    try {
      await axios.put(`http://localhost:6969/api/users/decline-request-product-upload/${id}`);
      setRequests(requests.map(request => 
        request.gameRequestId === id ? { ...request, status: 'rejected' } : request
      ));
      console.log(`Request ${id} declined. Reason: ${reason}`);
      setDeclineReason("");
      setCustomDeclineReason("");
    } catch (error) {
      console.error('Failed to decline request:', error);
      setError('Failed to decline request');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="mb-8 text-xl font-bold text-foreground mx-2">User Request Pending</h1>

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
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          {/* <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
            </SelectContent>
          </Select> */}
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
              setSelectedStatus("");
              setSelectedTopic("");
              setUserFilter("");
              setStartDate("");
              setEndDate("");
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
                {/* <TableHead>Topics</TableHead> */}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData.map((request) => (
                <TableRow key={request.gameRequestId}>
                  <TableCell className="text-center">{request.gameRequestId}</TableCell>
                  <TableCell>{request.userId}</TableCell>
                  <TableCell>{formatDate(request.requestDate)}</TableCell>
                  <TableCell>
                  <span
                      className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                        request.status.toLowerCase() === "accepted"
                          ? "bg-emerald-100 text-emerald-800"
                          : request.status.toLowerCase() === "rejected"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
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
                            <DialogTitle>Product Details</DialogTitle>
                            <DialogDescription>
                              View the details of the product request.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <img src={request.image} alt={request.name} className="w-full h-48 object-cover rounded-lg" />
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input id="name" value={request.name} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">
                                Description
                              </Label>
                              <Textarea id="description" value={request.description} className="col-span-3" readOnly />
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
                              <Input id="category" value={request.genre} className="col-span-3" readOnly />
                            </div>
                          </div>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="icon" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleAccept(request.gameRequestId)}>
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
                            <Button onClick={() => handleDecline(request.gameRequestId)}>Submit</Button>
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
  );
}