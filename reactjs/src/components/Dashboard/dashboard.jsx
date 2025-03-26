import React, { useState } from "react";
import AuthUser from "../Authentication/AuthUser";
import AdminDashboard from "./admin_dashboard";
import Home from "../Authentication/home";

export default function Dashboard() {
    const { user } = AuthUser();

    if (user.role == "admin") {
        return <AdminDashboard />
        }
    else if (user.role == "user"){
        return <Home />
            }
    else {
        return (
            <div>
                <h1>Starter</h1>
            </div>
        )
}
}