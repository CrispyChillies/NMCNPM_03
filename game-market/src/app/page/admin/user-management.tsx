import { useState, useEffect } from "react"
import axios from "axios"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Filter, Trash, Ban } from 'lucide-react'
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

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "provider"
  status: "active" | "inactive" | "banned"
}

export default function UserManagementPage() {
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [emailFilter, setEmailFilter] = useState("")
  const [userData, setUserData] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const response = await axios.get('http://localhost:6969/api/admin/users', { headers });
        if (response.data.success && Array.isArray(response.data.users)) {
          setUserData(response.data.users);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filterData = userData.filter((user) => {
    const matchesRole = selectedRole ? user.role.toLowerCase() === selectedRole.toLowerCase() : true
    const matchesStatus = selectedStatus ? user.status.toLowerCase() === selectedStatus.toLowerCase() : true
    const matchesName = nameFilter ? user.name.toLowerCase().includes(nameFilter.toLowerCase()) : true
    const matchesEmail = emailFilter ? user.email.toLowerCase().includes(emailFilter.toLowerCase()) : true

    return matchesRole && matchesStatus && matchesName && matchesEmail
  })

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      await axios.delete(`http://localhost:6969/api/admin/users/${id}`, { headers });
      setUserData(userData.filter(user => user.id !== id));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleBanUnban = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      if (status === "banned") {
        await axios.post(`http://localhost:6969/api/admin/users/${id}/unban`, {}, { headers });
        setUserData(userData.map(user => 
          user.id === id 
            ? { ...user, status: "active" } 
            : user
        ));
        console.log('User unbanned successfully');
      } else {
        await axios.post(`http://localhost:6969/api/admin/users/${id}/ban`, {}, { headers });
        setUserData(userData.map(user => 
          user.id === id 
            ? { ...user, status: "banned" } 
            : user
        ));
        console.log('User banned successfully');
      }
    } catch (error) {
      console.error('Failed to ban/unban user:', error);
    }
  };

  return (
    <div className="flex bg-background w-full">
      <div className="flex-1 p-8 overflow-y-hidden">
        <h1 className="mb-8 text-xl font-bold text-foreground mx-2">User Management</h1>
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
              <SelectItem value="provider">Provider</SelectItem>
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
              setSelectedRole("")
              setSelectedStatus("")
              setNameFilter("")
              setEmailFilter("")
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
                            <AlertDialogAction onClick={() => handleBanUnban(user.id, user.status)}>
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
  )
}