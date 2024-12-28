import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validatePersonalInfo } from "@/lib/validations";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

interface UserProfile {
  firstName: string;
  lastName: string;
  citizenId: string;
  email: string;
  phoneNumber: string;
  userAddress: string;
}

export default function ProfileUpdating() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    citizenId: "",
    email: "",
    phoneNumber: "",
    userAddress: "",
  });
  const [editableProfile, setEditableProfile] = useState<UserProfile>({
    ...profile,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode<{ id: string }>(token!);

      // Debug
      console.log(decoded.id);

      const response = await fetch(
        `http://localhost:6969/api/users/profile/${decoded.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setProfile(data);
      setEditableProfile(data);
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableProfile({ ...editableProfile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const validation = validatePersonalInfo(editableProfile);

    if (!validation.isValid) {
      toast.error(Object.values(validation.errors)[0]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode<{ id: string }>(token!);

      // First, check if email exists and belongs to another user
      const emailCheckResponse = await fetch(
        `http://localhost:6969/api/users/check-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: editableProfile.email,
            userId: decoded.id,
          }),
        }
      );

      if (!emailCheckResponse.ok) {
        const error = await emailCheckResponse.json();
        throw new Error(error.error || "Email already exists");
      }

      // If email check passes, proceed with update
      const response = await fetch(
        `http://localhost:6969/api/users/profile/${decoded.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...editableProfile,
            userId: decoded.id,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }

      const updatedData = await response.json();
      setProfile(updatedData);
      setEditableProfile(updatedData);
      setIsEditing(false);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    }
  };

  return (
    <Card className="bg-card text-card-foreground mt-8">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          // Edit Mode
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-card-foreground">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={editableProfile.firstName}
                  onChange={handleInputChange}
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-card-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={editableProfile.lastName}
                  onChange={handleInputChange}
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="citizenId" className="text-card-foreground">
                  Citizen ID
                </Label>
                <Input
                  id="citizenId"
                  name="citizenId"
                  value={editableProfile.citizenId}
                  onChange={handleInputChange}
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editableProfile.email}
                  onChange={handleInputChange}
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-card-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editableProfile.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userAddress" className="text-card-foreground">
                  Address
                </Label>
                <Input
                  id="userAddress"
                  name="userAddress"
                  value={editableProfile.userAddress}
                  onChange={handleInputChange}
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => {
                  setEditableProfile(profile);
                  setIsEditing(false);
                }}
                variant="outline"
                className="rounded-[30px]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                className="bg-primary hover:bg-primary-foreground text-primary-foreground rounded-[30px]"
              >
                Save Changes
              </Button>
            </div>
          </>
        ) : (
          // View Mode
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground">First Name</Label>
                <p className="text-card-foreground">{profile.firstName}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Last Name</Label>
                <p className="text-card-foreground">{profile.lastName}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Citizen ID</Label>
                <p className="text-card-foreground">{profile.citizenId}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Email</Label>
                <p className="text-card-foreground">{profile.email}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Phone Number</Label>
                <p className="text-card-foreground">{profile.phoneNumber}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Address</Label>
                <p className="text-card-foreground">{profile.userAddress}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-primary hover:bg-primary-foreground text-primary-foreground rounded-[30px]"
              >
                Edit Profile
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
