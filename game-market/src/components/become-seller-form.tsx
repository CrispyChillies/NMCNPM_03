import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

export default function BecomeSellerForm() {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    businessAddress: "",
    businessName: "",
    productDescription: "",
    address: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please sign in first");
        return;
      }

      const decoded = jwtDecode<{ id: string }>(token);

      const response = await fetch("http://localhost:6969/api/seller/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          userId: decoded.id,
          date: new Date().toISOString().split("T")[0],
          status: "pending",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit request");
      }

      toast.success("Request submitted successfully");
      setFormData({
        email: "",
        phoneNumber: "",
        businessAddress: "",
        businessName: "",
        productDescription: "",
        address: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit request"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Become a Seller</h2>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          required
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          name="businessName"
          required
          value={formData.businessName}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessAddress">Business Address</Label>
        <Textarea
          id="businessAddress"
          name="businessAddress"
          required
          value={formData.businessAddress}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productDescription">Product Description</Label>
        <Textarea
          id="productDescription"
          name="productDescription"
          required
          value={formData.productDescription}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Contact Address</Label>
        <Textarea
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Request
      </Button>
    </form>
  );
}
