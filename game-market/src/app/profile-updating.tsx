"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfileUpdating() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
    city: "",
    district: "",
    phoneNumber: "",
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

  const handleUpdate = () => {
    console.log("Updated personal info:", personalInfo);
    // Here you would typically send this data to your backend using an API call
  };

  const handlePasswordUpdate = () => {
    console.log("Password update requested");
    // Here you would typically send this data to your backend using an API call
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-left text-white">
        Profile Updating
      </h1>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#2D2D2D]">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-[#106D5C] data-[state=active]:text-white text-white"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-[#106D5C] data-[state=active]:text-white text-white"
          >
            Change Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card className="bg-[#2D2D2D] text-white">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    required
                    className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    required
                    className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="citizenId" className="text-white">
                  Citizen Identification Number
                </Label>
                <Input
                  id="citizenId"
                  name="citizenId"
                  value={personalInfo.citizenId}
                  onChange={handlePersonalInfoChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white">
                    City/Province
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={personalInfo.city}
                    onChange={handlePersonalInfoChange}
                    required
                    className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district" className="text-white">
                    District, Street, Number
                  </Label>
                  <Input
                    id="district"
                    name="district"
                    value={personalInfo.district}
                    onChange={handlePersonalInfoChange}
                    required
                    className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={personalInfo.phoneNumber}
                  onChange={handlePersonalInfoChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                />
              </div>
              <Button
                onClick={handleUpdate}
                className="w-full bg-[#106D5C] hover:bg-[#0A5446] text-white py-3 text-lg font-semibold transition-colors duration-200 rounded-[30px]"
              >
                UPDATE
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="bg-[#2D2D2D] text-white">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-white">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  name="current"
                  type="password"
                  value={password.current}
                  onChange={handlePasswordChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  name="new"
                  type="password"
                  value={password.new}
                  onChange={handlePasswordChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirm"
                  type="password"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  required
                  className="bg-[#2D2D2D] text-white border-2 border-white focus:border-[#106D5C] focus:ring-[#106D5C] rounded-[30px]"
                />
              </div>
              <Button
                onClick={handlePasswordUpdate}
                className="w-full bg-[#106D5C] hover:bg-[#0A5446] text-white py-3 text-lg font-semibold transition-colors duration-200 rounded-[30px]"
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
