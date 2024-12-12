import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }
    // Here you would typically call your authentication API
    console.log('Sign in with', username, password)
    // For demo purposes, we'll just redirect to a success page
    // router.push('/signin-success')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[480px] h-[810px] bg-[#2D2D2D] px-8 py-[66px] space-y-6 bg-white rounded-[30px] shadow-md text-white ">
          <h1 className="text-2xl font-bold text-center">Sign In to Game Market</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="block text-left">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username, Email, or Phone number"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-[400px] h-[60px] rouded-[10px]"
              />
              <p className="text-sm text-white block text-left">Enter your user name, Email, or Phone number</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-left">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[400px] h-[60px] rouded-[10px]"
              />
              <p className="text-sm text-white block text-left">Enter your Password to sign in into Game Market</p>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-[400px] h-[60px] bg-[#106D5C] hover:bg-[#E75353] rounded-[10px] transition-colors duration-200 font-bold text-[20px]">Sign In</Button>
          </form>
          <p className="text-center text-sm">
            Don't have an account?{' '}
            <a href="/signup/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
    </div>
  )
}

