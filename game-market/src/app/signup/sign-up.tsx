'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) {
      setError('Please fill in all fields');
      return;
    }
    if (!acceptTerms) {
      setError('Please accept the terms of use');
      return;
    }

    try {
      const response = await axios.post('http://localhost:6969/api/signup', { username: email, password: phone });
      alert(response.data);
    } catch (error) {
      console.error('Sign-up failed:', error);
      setError('Sign-up failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-[480px] h-[810px] bg-[#2D2D2D] px-8 py-[66px] space-y-6 bg-background rounded-[30px] shadow-md text-white border">
        <h1 className="text-4xl font-bold text-center text-foreground">SIGN UP</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="block text-left">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-[400px] h-[60px] rounded-[10px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="block text-left">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-[400px] h-[60px] rounded-[10px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-left">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[400px] h-[60px] rounded-[10px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="block text-left">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-[400px] h-[60px] rounded-[10px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms"
              checked={acceptTerms}
              onCheckedChange={() => setAcceptTerms(!acceptTerms)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            >
              I accept the terms of use
            </label>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-[400px] h-[60px] bg-[#106D5C] hover:bg-[#E75353] rounded-[10px] transition-colors duration-200 font-bold text-[20px]">Sign Up</Button>
        </form>
        <p className="text-center text-sm text-foreground">
          Already have an account?{' '}
          <a href="./signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}