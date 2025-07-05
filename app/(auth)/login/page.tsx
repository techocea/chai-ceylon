import AuthNavbar from "@/components/control-panel/AuthNavbar";
import BgGradient from "@/components/control-panel/BgGradient";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
    return (
        <>
            <AuthNavbar />
            <div className="min-h-[90vh] flex items-center justify-center relative">
                <BgGradient />
                <Card className="w-full max-w-sm lg:max-w-md shadow-xl border rounded-xl z-10 mx-4 sm:mx-0">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Admin Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login as Admin
                            </Button>
                        </form>
                      
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default LoginPage;
