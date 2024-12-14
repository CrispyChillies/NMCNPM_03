import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

export default function ProductUploading() {
  const [gameDetails, setGameDetails] = useState<{
    name: string;
    initialStock: string;
    price: string;
    version: string;
    sizeInMB: string;
    description: string;
    releaseDate: string;
    image: File | null;
    englishSupported: string; // "Yes" or "No"
    developer: string;
    publisher: string;
    categories: string;
    genres: string;
    owners: string;
  }>({
    name: "",
    initialStock: "",
    price: "",
    version: "",
    sizeInMB: "",
    description: "",
    releaseDate: "",
    image: null,
    englishSupported: "",
    developer: "",
    publisher: "",
    categories: "",
    genres: "",
    owners: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setGameDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setGameDetails((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Submitting game details:", gameDetails);
    // Simulating an API call with setTimeout
    setTimeout(() => {
      toast.success("Game disc details uploaded successfully!");
      // Reset form after successful submission
      setGameDetails({
        name: "",
        initialStock: "",
        price: "",
        version: "",
        sizeInMB: "",
        description: "",
        releaseDate: "",
        image: null,
        englishSupported: "",
        developer: "",
        publisher: "",
        categories: "",
        genres: "",
        owners: "",
      });
    }, 1000);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-left text-[var(--foreground)]">
        Upload Game Disc
      </h2>
      <Card className="w-full bg-[#2D2D2D] text-white">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Each input group */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={gameDetails.name}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialStock" className="text-white">
                  Initial Stock
                </Label>
                <Input
                  id="initialStock"
                  name="initialStock"
                  type="number"
                  value={gameDetails.initialStock}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={gameDetails.price}
                  min="0"
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version" className="text-white">
                  Version
                </Label>
                <Input
                  id="version"
                  name="version"
                  value={gameDetails.version}
                  onChange={handleInputChange}
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sizeInMB" className="text-white">
                  Size in Megabyte
                </Label>
                <Input
                  id="sizeInMB"
                  name="sizeInMB"
                  type="number"
                  min="0"
                  value={gameDetails.sizeInMB}
                  onChange={handleInputChange}
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="releaseDate" className="text-white">
                  Date of Release from Manufacturer
                </Label>
                <Input
                  id="releaseDate"
                  name="releaseDate"
                  type="date"
                  value={gameDetails.releaseDate}
                  onChange={handleInputChange}
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>

              {/* New input fields */}
              <div className="space-y-2">
                <Label
                  htmlFor="englishSupported"
                  className="text-white px-3 text-xl"
                >
                  English Supported?
                </Label>
                <select
                  id="englishSupported"
                  name="englishSupported"
                  value={gameDetails.englishSupported}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="developer" className="text-white">
                  Developer
                </Label>
                <Input
                  id="developer"
                  name="developer"
                  value={gameDetails.developer}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publisher" className="text-white">
                  Publisher
                </Label>
                <Input
                  id="publisher"
                  name="publisher"
                  value={gameDetails.publisher}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categories" className="text-white">
                  Categories
                </Label>
                <Input
                  id="categories"
                  name="categories"
                  value={gameDetails.categories}
                  onChange={handleInputChange}
                  placeholder="e.g., Action, Adventure"
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genres" className="text-white">
                  Genres
                </Label>
                <Input
                  id="genres"
                  name="genres"
                  value={gameDetails.genres}
                  onChange={handleInputChange}
                  placeholder="e.g., RPG, Shooter"
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owners" className="text-white">
                  Owners
                </Label>
                <Input
                  id="owners"
                  name="owners"
                  value={gameDetails.owners}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe, Jane Smith"
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
                />
              </div>
            </div>

            {/* Description textarea */}
            <div className="space-y-2 mt-6">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={gameDetails.description}
                onChange={handleInputChange}
                rows={4}
                className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
              />
            </div>

            {/* File upload */}
            <div className="space-y-2 mt-6">
              <Label htmlFor="image" className="text-white">
                Game Image
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C]"
              />
            </div>

            {/* Upload button remains Turquoise Green */}
            <Button
              type="submit"
              className="w-full bg-[#106D5C] hover:bg-[#0A5446] text-white mt-6 py-3 text-lg font-semibold transition-colors duration-200"
            >
              <Upload className="mr-2 h-5 w-5" /> UPLOAD
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
