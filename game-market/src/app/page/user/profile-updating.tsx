"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validatePersonalInfo } from "@/lib/validations";
import { toast } from "sonner";

export default function ProfileUpdating() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
    email: "",
    phoneNumber: "",
    userAddress: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const validation = validatePersonalInfo(personalInfo);

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      toast.error("Validation Error", {
        description: firstError,
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:6969/api/users/profile/1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(personalInfo),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }

      await response.json();
      toast.success("Profile Updated", {
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast.error("Update Failed", {
        description:
          error instanceof Error ? error.message : "Failed to update profile",
      });
    }
  };

  const handlePasswordUpdate = () => {
    console.log("Password update requested");
    // Here you would typically send this data to your backend using an API call
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto my-8 px-4 min-h-screen">
      <h1 className="text-xl font-bold mb-6 mx-6 text-left text-primary">
        Profile Updating
      </h1>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-primary"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-primary"
          >
            Change Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-card-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    required
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
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    required
                    className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="citizenId" className="text-card-foreground">
                  Citizen Identification Number
                </Label>
                <Input
                  id="citizenId"
                  name="citizenId"
                  value={personalInfo.citizenId}
                  onChange={handlePersonalInfoChange}
                  required
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
                  value={personalInfo.phoneNumber}
                  onChange={handlePersonalInfoChange}
                  required
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
                  value={personalInfo.userAddress}
                  onChange={handlePersonalInfoChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>

              <Button
                onClick={handleUpdate}
                className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground py-3 text-lg font-semibold transition-colors duration-200 rounded-[30px]"
              >
                UPDATE
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="currentPassword"
                  className="text-card-foreground"
                >
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  name="current"
                  type="password"
                  value={password.current}
                  onChange={handlePasswordChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-card-foreground">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  name="new"
                  type="password"
                  value={password.new}
                  onChange={handlePasswordChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-card-foreground"
                >
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirm"
                  type="password"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <Button
                onClick={handlePasswordUpdate}
                className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground py-3 text-lg font-semibold transition-colors duration-200 rounded-[30px]"
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
