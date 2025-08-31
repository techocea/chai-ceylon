"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import BgGradient from "@/components/control-panel/BgGradient";
import AuthNavbar from "@/components/control-panel/AuthNavbar";
import { authFormSchema, AuthFormValues } from "@/lib/zodSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = async (data: AuthFormValues) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth", data);
      if (res.status === 200) {
        alert("Logged in successfully!");
        router.push("/control-panel");
      } else {
        alert("Logged in Failed!");
      }
    } catch (error) {
      console.log("Error in ADMIN LOGIN:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AuthNavbar />
      <div className="min-h-[85vh] flex items-center justify-center">
        <BgGradient />
        <Card className="w-full max-w-sm lg:max-w-md shadow-xl border z-10 mx-4 sm:mx-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="tetx-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="tetx-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <div>
                    <Loader2 className="animate-spin transition-all" />
                  </div>
                ) : (
                  "Login as Admin"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
