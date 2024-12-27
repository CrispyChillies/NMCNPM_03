import { useState, useEffect } from "react";
import axios from "axios";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Filter, Trash, Ban } from 'lucide-react';
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
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Moderator";
  status: "active" | "inactive" | "banned";
}

export const UserManagement = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [userData, setUserData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<{ recordsets: User[][] }>('http://localhost:6969/api/users');
        console.log(response.data); // Log the response data
        setUserData(response.data.recordsets[0]); // Assuming the first recordset contains the user data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const filterData = userData.filter((user) => {
    const matchesRole = selectedRole ? user.role.toLowerCase() === selectedRole.toLowerCase() : true;
    const matchesStatus = selectedStatus ? user.status.toLowerCase() === selectedStatus.toLowerCase() : true;
    const matchesName = nameFilter ? user.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
    const matchesEmail = emailFilter ? user.email.toLowerCase().includes(emailFilter.toLowerCase()) : true;

    return matchesRole && matchesStatus && matchesName && matchesEmail;
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:6969/api/users/${id}`);
      setUserData(userData.filter(user => user.id !== id));
      console.log(`Deleted user with id: ${id}`);
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError('Failed to delete user');
    }
  };

  const handleBan = async (id: string) => {
    try {
      await axios.put(`http://localhost:6969/api/users/ban/${id}`);
      setUserData(userData.map(user => 
        user.id === id 
          ? { ...user, status: user.status === "banned" ? "active" : "banned" } 
          : user
      ));
      console.log(`Toggled ban status for user with id: ${id}`);
    } catch (error) {
      console.error('Failed to ban/unban user:', error);
      setError('Failed to ban/unban user');
    }
  };

  const handleUnban = async (id: string) => {
    try {
      await axios.put(`http://localhost:6969/api/users/unban/${id}`);
      setUserData(userData.map(user => 
        user.id === id 
          ? { ...user, status: "active" } 
          : user
      ));
      console.log(`Unbanned user with id: ${id}`);
    } catch (error) {
      console.error('Failed to unban user:', error);
      setError('Failed to unban user');
    }
  }

  return (
    <div className="flex h-screen bg-background w-full">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="mb-8 text-xl font-bold text-foreground mx-2">User Management</h1>

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
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
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
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                        user.status === "active"
                          ? "bg-emerald-100 text-emerald-800"
                          : user.status === "inactive"
                          ? "bg-gray-700 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {user.status}
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
                              This action cannot be undone. This will permanently delete the user account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(user.id)}>Delete</AlertDialogAction>
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
                              {user.status === "banned" 
                                ? "This will unban the user account." 
                                : "This will ban the user account."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {user.status === "banned" ? handleUnban(user.id) : handleBan(user.id)}}>
                              {user.status === "banned" ? "Unban" : "Ban"}
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