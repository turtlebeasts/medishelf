// src/layouts/GuestLayout.jsx
import { Outlet } from "react-router-dom";
import GuestNavbar from "../components/GuestNavbar";

export default function GuestLayout() {
  return (
    <>
      <GuestNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
