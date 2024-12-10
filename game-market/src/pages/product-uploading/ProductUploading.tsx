import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  }>({
    name: "",
    initialStock: "",
    price: "",
    version: "",
    sizeInMB: "",
    description: "",
    releaseDate: "",
    image: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upload Game Disc</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={gameDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initialStock">Initial Stock</Label>
              <Input
                id="initialStock"
                name="initialStock"
                type="number"
                value={gameDetails.initialStock}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={gameDetails.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                name="version"
                value={gameDetails.version}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sizeInMB">Size in Megabyte</Label>
              <Input
                id="sizeInMB"
                name="sizeInMB"
                type="number"
                value={gameDetails.sizeInMB}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="releaseDate">
                Date of Release from Manufacturer
              </Label>
              <Input
                id="releaseDate"
                name="releaseDate"
                type="date"
                value={gameDetails.releaseDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={gameDetails.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Game Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
          <Button type="submit" className="w-full">
            <Upload className="mr-2 h-4 w-4" /> UPLOAD
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
