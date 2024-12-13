'use client'

import { useState } from "react"
import { Bell, Filter, Heart, LogOut, MessageSquare, Settings, Trash, Edit, Plus } from 'lucide-react'
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
// import { useRouter } from 'next/navigation'

interface Game {
  id: string
  name: string
  category: string
  developers: string
  price: number
  releaseDate: string
}

// Sample data
const games: Game[] = [
  {
    id: "001",
    name: "The Witcher 3",
    category: "RPG",
    developers: "CD Projekt Red",
    price: 39.99,
    releaseDate: "2015-05-19",
  },
  {
    id: "002",
    name: "FIFA 22",
    category: "Sports",
    developers: "EA Sports",
    price: 59.99,
    releaseDate: "2021-10-01",
  },
  {
    id: "003",
    name: "Minecraft",
    category: "Sandbox",
    developers: "Mojang",
    price: 26.95,
    releaseDate: "2011-11-18",
  },
  {
    id: "004",
    name: "Cyberpunk 2077",
    category: "RPG",
    developers: "CD Projekt Red",
    price: 59.99,
    releaseDate: "2020-12-10",
  },
  // Add more sample data as needed
]

export const GameProductManagement = () => {
  const [gameData, setGameData] = useState(games)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedDeveloper, setSelectedDeveloper] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  // const router = useRouter()

  const filterData = gameData.filter((game) => {
    const matchesCategory = selectedCategory ? game.category.toLowerCase() === selectedCategory.toLowerCase() : true
    const matchesDeveloper = selectedDeveloper ? game.developers.toLowerCase() === selectedDeveloper.toLowerCase() : true
    const matchesName = nameFilter ? game.name.toLowerCase().includes(nameFilter.toLowerCase()) : true
    const matchesMinPrice = minPrice ? game.price >= parseFloat(minPrice) : true
    const matchesMaxPrice = maxPrice ? game.price <= parseFloat(maxPrice) : true

    return matchesCategory && matchesDeveloper && matchesName && matchesMinPrice && matchesMaxPrice
  })

  const handleDelete = (id: string) => {
    setGameData(gameData.filter(game => game.id !== id))
  }

  // const handleEdit = (id: string) => {
  //   router.push(`/edit-game/${id}`)
  // }

  // const handleAddGame = () => {
  //   router.push('/add-game')
  // }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Game Product Management</h1>

        {/* Filters */}
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
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="sandbox">Sandbox</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDeveloper} onValueChange={setSelectedDeveloper}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Developer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cd projekt red">CD Projekt Red</SelectItem>
              <SelectItem value="ea sports">EA Sports</SelectItem>
              <SelectItem value="mojang">Mojang</SelectItem>
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
                <TableHead>Developers</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="text-center">{game.id}</TableCell>
                  <TableCell>{game.name}</TableCell>
                  <TableCell>{game.category}</TableCell>
                  <TableCell>{game.developers}</TableCell>
                  <TableCell>${game.price.toFixed(2)}</TableCell>
                  <TableCell>{game.releaseDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon"> 
                        {/* onClick={() => handleEdit(game.id)}> */}
                        <Edit className="h-4 w-4" />
                      </Button>
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
                            <AlertDialogAction onClick={() => handleDelete(game.id)}>Delete</AlertDialogAction>
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

