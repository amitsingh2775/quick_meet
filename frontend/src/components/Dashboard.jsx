import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { User, ChevronUp, FileText, Video, PlusCircle } from "lucide-react";
import { fetchUserProfile } from "@/utils/profileService";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import UserProfile from "@/pages/UserProfileModal";
import AllRequestsCard from "./AllRequestsCard";
import CreateWebinarForm from "@/pages/CreateWebinarForm";
import AllWebinarsCard from "@/pages/AllWebinarsCard";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("all-requests");
  const [userName, setUserName] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const getUser = async () => {
      const profile = await fetchUserProfile();
      if (profile) {
        setUserName(profile.name);
        setUserProfile(profile);
      } else {
        setUserName("Guest");
      }
    };

    getUser();
  }, []);

  // Check if token exists, else redirect to login
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const logout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      alert("Something went wrong while logging out.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4 flex flex-col justify-between md:h-screen">
        <div>
          <h2 className="text-xl font-bold text-center border-b border-gray-700">Quik_Meet</h2>
          <Tabs defaultValue="all-requests" onValueChange={setActiveTab} className="mt-6 md:mt-20">
            <TabsList className="flex flex-col md:space-y-2">
              <TabsTrigger value="all-requests" className="p-2 hover:bg-gray-700 rounded flex items-center border-b border-gray-700">
                <FileText className="mr-2" /> All Requests
              </TabsTrigger>
              <TabsTrigger value="webinars" className="p-2 hover:bg-gray-700 rounded flex items-center border-b border-gray-700">
                <Video className="mr-2" /> Webinars
              </TabsTrigger>
              <TabsTrigger value="create-webinar" className="p-2 hover:bg-gray-700 rounded flex items-center border-b border-gray-700">
                <PlusCircle className="mr-2" /> Create Webinar
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Username and Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center p-2 mt-auto bg-gray-700 rounded hover:bg-gray-600 w-full">
              <User className="mr-2" /> {userName || "Guest"}
              <ChevronUp className="ml-auto" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="top" className="bg-gray-700 w-[--radix-popper-anchor-width]">
            <DropdownMenu.Item className="p-2 hover:bg-gray-600 rounded" onClick={() => setIsModalOpen(true)}>
              Account
            </DropdownMenu.Item>
            <DropdownMenu.Item className="p-2 hover:bg-gray-600 rounded" onClick={logout}>
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900 text-white p-4 overflow-auto">
        {activeTab === "all-requests" && <AllRequestsCard />}
        {activeTab === "webinars" && <AllWebinarsCard />}
        {activeTab === "create-webinar" && <CreateWebinarForm />}
      </div>

      {/* User Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <UserProfile userProfile={userProfile} onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
