import { Outlet } from "react-router-dom";
import NavBar from "../components/features/NavBar";
import Footer from "../components/features/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
        <NavBar/>
              <div className="pt-8">
                <Outlet/>
              </div>
        <Footer/>
    </div>
  )
}
