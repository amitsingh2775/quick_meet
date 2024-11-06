import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, ChevronUp, FileText, Video, PlusCircle } from "lucide-react";
import AllRequestsCard from "./AllRequestsCard";
import CreateWebinarForm from "@/pages/CreateWebinarForm";
import AllWebinarsCard from "@/pages/AllWebinarsCard";

export function Dashboard() {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = React.useState("all-requests");

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
              <User className="mr-2" /> Username
              <ChevronUp className="ml-auto" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="top" className="bg-gray-700 w-[--radix-popper-anchor-width]">
            <DropdownMenu.Item className="p-2 hover:bg-gray-600 rounded">Account</DropdownMenu.Item>
            <DropdownMenu.Item className="p-2 hover:bg-gray-600 rounded">Sign out</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900 text-white p-4 overflow-auto">
        {activeTab === "all-requests" && (
          <AllRequestsCard />
        )}

        {activeTab === "webinars" && (
          <AllWebinarsCard />
        )}

        {activeTab === "create-webinar" && (
          <CreateWebinarForm />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
