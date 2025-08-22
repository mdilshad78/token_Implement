"use client";
import React from "react";
import { useProtectRoute } from "../../../hook/useProtectRoute";

export default function DashboardPage() {
  const { isChecking, user } = useProtectRoute(); // 👈 destructure properly

  if (isChecking) {
    return <p>Checking session...</p>; // loader placeholder
  }

  if (!user) {
    // already redirected by hook
    return null;
  }

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>Logged in as: {user.email}</p> {/* ✅ decoded user info */}
    </div>
  );
}
