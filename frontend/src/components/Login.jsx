import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", // Replace with your backend login URL
        { email, password },
        { withCredentials: true } // Ensures cookies are included
      );

      if (response.data.success) {
        // Handle successful login (store token in localStorage or context if needed)
        navigate("/"); // Navigate to a protected route on successful login
      }
    } catch (err) {
      // Display error if login fails
      setError(err.response?.data?.msg || "Login failed, please try again.");
    }
  };

  return (
    <Card
      className="max-w-sm w-full mx-auto bg-cover bg-no-repeat bg-center shadow-md rounded-md mt-20"
      style={{ backgroundImage: "url(path/to/your/image.jpg)" }}
    >
      <CardHeader className="bg-white text-black ">
        <CardTitle>Login to Your Account</CardTitle>
        <CardDescription>Access your account using your email and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-left text-black">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-left text-black">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center bg-white text-black">
        <Button className="w-full mb-2" onClick={handleLogin}>
          Login
        </Button>
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <Link to="/signup" className="w-full">
          <Button variant="outline" className="w-full">
            Sign Up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default LoginCard;
