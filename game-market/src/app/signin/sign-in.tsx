import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:6969/api/signin', { username, password });
      alert(response.data);
    } catch (error) {
      console.error('Sign-in failed:', error);
      setError('Sign-in failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-[480px] h-[810px] bg-[#2D2D2D] px-8 py-[66px] space-y-6 bg-background rounded-[30px] shadow-md text-white border">
        <h1 className="text-4xl font-bold text-foreground text-center">SIGN IN</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="block text-left">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[400px] h-[60px] rounded-[10px] text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="block text-left">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[400px] h-[60px] rounded-[10px] text-foreground"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-[400px] h-[60px] bg-[#106D5C] hover:bg-[#E75353] rounded-[10px] transition-colors duration-200 font-bold text-[20px]">Sign In</Button>
        </form>
      </div>
    </div>
  );
}