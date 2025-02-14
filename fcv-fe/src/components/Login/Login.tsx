import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const Login: React.FC<{ loginAction: any }> = ({ loginAction }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={loginAction}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
