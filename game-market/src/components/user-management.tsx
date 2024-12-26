import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Bell,
  Filter,
  Heart,
  LogOut,
  MessageSquare,
  Settings,
  Trash,
  Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface User {
  id: number;
  role: "admin" | "seller" | "buyer";
  firstName: string;
  lastName: string;
  citizenId: string;
  email: string;
  phoneNumber: string;
  userAddress: string;
  businessName?: string;
  businessDescription?: string;
  businessAddress?: string;
  userStatus: "banned" | "inactive" | "active";
}

// Sample data
const users: User[] = [
  {
    id: 1,
    role: "admin",
    firstName: "John",
    lastName: "Doe",
    citizenId: "1234567890",
    email: "john@example.com",
    phoneNumber: "555-1234",
    userAddress: "123 Main St, Anytown, USA",
    userStatus: "active",
  },
  {
    id: 2,
    role: "seller",
    firstName: "Jane",
    lastName: "Smith",
    citizenId: "0987654321",
    email: "jane@example.com",
    phoneNumber: "555-5678",
    userAddress: "456 Elm St, Anytown, USA",
    userStatus: "inactive",
  },
  {
    id: 3,
    role: "buyer",
    firstName: "Bob",
    lastName: "Johnson",
    citizenId: "5432109876",
    email: "bob@example.com",
    phoneNumber: "555-9012",
    userAddress: "789 Oak St, Anytown, USA",
    userStatus: "banned",
  },
  {
    id: 4,
    role: "buyer",
    firstName: "Alice",
    lastName: "Brown",
    citizenId: "6789012345",
    email: "alice@example.com",
    phoneNumber: "555-3456",
    userAddress: "101 Pine St, Anytown, USA",
    userStatus: "banned",
  },
  // Add more sample data as needed
];

export const UserManagement = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [userData, setUserData] = useState(users);

  const filterData = userData.filter((user) => {
    const matchesRole = selectedRole
      ? user.role.toLowerCase() === selectedRole.toLowerCase()
      : true;
    const matchesStatus = selectedStatus
      ? user.userStatus.toLowerCase() === selectedStatus.toLowerCase()
      : true;
    const matchesName = nameFilter
      ? user.firstName.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    const matchesEmail = emailFilter
      ? user.email.toLowerCase().includes(emailFilter.toLowerCase())
      : true;

    return matchesRole && matchesStatus && matchesName && matchesEmail;
  });

  const handleDelete = (id: number) => {
    setUserData(userData.filter((user) => user.id !== id));
  };

  const handleBanUnban = (id: number) => {
    setUserData(
      userData.map((user) =>
        user.id === id
          ? {
              ...user,
              userStatus: user.userStatus === "banned" ? "active" : "banned",
            }
          : user
      )
    );
  };

  return (
    <div className="flex h-screen bg-background w-full">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="mb-8 text-xl font-bold text-foreground mx-2">
          User Management
        </h1>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4 rounded-lg bg-white p-4 border">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Filter By</span>
          <Input
            placeholder="Filter by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="max-w-[200px]"
          />
          <Input
            placeholder="Filter by email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="max-w-[200px]"
          />
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="seller">Seller</SelectItem>
              <SelectItem value="buyer">Buyer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            className="ml-auto text-red-500 hover:text-red-600"
            onClick={() => {
              setSelectedRole("");
              setSelectedStatus("");
              setNameFilter("");
              setEmailFilter("");
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
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center">{user.id}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                        user.userStatus === "active"
                          ? "bg-emerald-100 text-emerald-800"
                          : user.userStatus === "inactive"
                          ? "bg-gray-700 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {user.userStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the user account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(user.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              {user.userStatus === "banned"
                                ? "This will unban the user account."
                                : "This will ban the user account."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleBanUnban(user.id)}
                            >
                              {user.userStatus === "banned" ? "Unban" : "Ban"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
};
