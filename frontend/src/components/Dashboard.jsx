import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, ChevronUp, FileText, Video, PlusCircle } from "lucide-react";
import AllRequestsCard from "./AllRequestsCard";
import CreateWebinarForm from "@/pages/CreateWebinarForm";
import AllWebinarsCard from "@/pages/AllWebinarsCard";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from 'js-cookie';
import { useEffect,useState } from 'react';
import { fetchUserProfile } from "@/utils/profileService";

export function Dashboard() {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = React.useState("all-requests");
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const profile = await fetchUserProfile();
      if (profile) {
        setUserName(profile.name);
      } else {
        setUserName('Guest');
      }
    };

    getUser();
  }, []);

  const navigate = useNavigate(); // Correct usage of useNavigate
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  })


  const logout = async (e) => {
    e.preventDefault(); // Prevent default form behavior (if any)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      console.log("response", res);

      if (res.data.success === true) {
        console.log("Logout successful");
        navigate('/login'); // Correct usage of navigate
      }
    } catch (error) {
      alert("Something went wrong while logging out.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4 flex flex-col justify-between md:h-screen">
        {/* Sidebar content */}
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

        {/* Username and Dropdown at bottom */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center p-2 mt-auto bg-gray-700 rounded hover:bg-gray-600 w-full">
              <User className="mr-2" /> {userName ? userName : 'Guest'}
              <ChevronUp className="ml-auto" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="top" className="bg-gray-700 w-[--radix-popper-anchor-width]">
            <DropdownMenu.Item className="p-2 hover:bg-gray-600 rounded">Account</DropdownMenu.Item>
            <button onClick={logout}> {/* Changed to onClick */}
              <DropdownMenu.Item className="p-2 hover:bg-gray-600 rounded">Sign out</DropdownMenu.Item>
            </button>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900 text-white p-4 overflow-auto">
        {activeTab === "all-requests" && <AllRequestsCard />}
        {activeTab === "webinars" && <AllWebinarsCard />}
        {activeTab === "create-webinar" && <CreateWebinarForm />}
      </div>
    </div>
  );
}

export default Dashboard;
