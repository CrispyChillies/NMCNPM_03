'use client'

import { useState, useEffect } from "react"
import { Filter, Trash, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Game {
  productId: string
  name: string
  genre: string
  price: number
  releaseDay: string
  status: "available" | "unavailable"
}

export default function GameManagementPage() {
  const [gameData, setGameData] = useState<Game[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedDeveloper, setSelectedDeveloper] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const response = await axios.get('http://localhost:6969/api/admin/products', { headers });
        if (Array.isArray(response.data.recordset)) {
          setGameData(response.data.recordset);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const filterData = gameData.filter((game) => {
    const matchesCategory = selectedCategory ? game.genre.toLowerCase() === selectedCategory.toLowerCase() : true
    const matchesName = nameFilter ? game.name.toLowerCase().includes(nameFilter.toLowerCase()) : true
    const matchesMinPrice = minPrice ? game.price >= parseFloat(minPrice) : true
    const matchesMaxPrice = maxPrice ? game.price <= parseFloat(maxPrice) : true

    return matchesCategory && matchesName && matchesMinPrice && matchesMaxPrice
  })

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      await axios.delete(`http://localhost:6969/api/admin/products/${id}`, { headers });
      setGameData(gameData.filter(game => game.productId !== id));
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date as "MM/DD/YYYY"
  };

  return (
    <div className="flex bg-background w-full">
      <div className="flex-1 overflow-y-hidden p-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Game Product Management</h1>
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 border">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Filter By</span>
          <Input
            placeholder="Game Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="max-w-[200px]"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rpg">RPG</SelectItem>
              <SelectItem value="others">Others</SelectItem>
              <SelectItem value="action">Action</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="max-w-[120px]"
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="max-w-[120px]"
          />
          <Button
            variant="ghost"
            className="ml-auto text-red-500 hover:text-red-600"
            onClick={() => {
              setSelectedCategory("")
              setSelectedDeveloper("")
              setNameFilter("")
              setMinPrice("")
              setMaxPrice("")
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
                <TableHead>Game</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Prices</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData.map((game) => (
                <TableRow key={game.productId}>
                  <TableCell className="text-center">{game.productId}</TableCell>
                  <TableCell>{game.name}</TableCell>
                  <TableCell>{game.genre}</TableCell>
                  <TableCell>${game.price.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(game.releaseDay)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                        game.status === "available"
                          ? "bg-emerald-100 text-emerald-800"
                          : game.status === "unavailable"
                          ? "bg-yellow-100 text-yellow-800" : 
                          "bg-red-500 text-white"
                      }`}
                    >
                      {game.status} 
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
                              This action cannot be undone. This will permanently delete the game from the database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(game.productId)}>Delete</AlertDialogAction>
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