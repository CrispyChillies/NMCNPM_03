import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

export default function PasswordChange() {
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = async () => {
    if (password.new !== password.confirm) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode<{ id: string }>(token!);

      const response = await fetch(
        `http://localhost:6969/api/users/password/${decoded.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: password.current,
            newPassword: password.new,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update password");
      }

      toast.success("Password Updated Successfully");
      setPassword({ current: "", new: "", confirm: "" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update password"
      );
    }
  };

  return (
    <Card className="bg-card text-card-foreground mt-8">
      <CardHeader>
        <CardTitle className="text-card-foreground">Change Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currentPassword" className="text-card-foreground">
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
          <Label htmlFor="confirmPassword" className="text-card-foreground">
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
  );
}
