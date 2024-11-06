import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";

function AllRequestsCard() {
  return (
    <Card className="shadow-md p-4 bg-gray-800 text-white rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">All Requests</CardTitle>
        <p className="text-gray-400 text-sm">All requests from students for webinars</p>
      </CardHeader>
      <CardContent>
        <ul>
          {/* User 1 */}
          <li className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-700 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center">
                <span className="text-lg font-semibold">S</span>
              </Avatar>
              <div>
                <p className="font-semibold text-base md:text-lg">Sofia Davis</p>
                <p className="text-gray-400 text-xs md:text-sm">m@example.com</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
              <Button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md text-sm w-full md:w-auto">
                Accept
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md text-sm w-full md:w-auto">
                Reject
              </Button>
            </div>
          </li>

          {/* User 2 */}
          <li className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-700 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center">
                <span className="text-lg font-semibold">J</span>
              </Avatar>
              <div>
                <p className="font-semibold text-base md:text-lg">Jackson Lee</p>
                <p className="text-gray-400 text-xs md:text-sm">p@example.com</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
              <Button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md text-sm w-full md:w-auto">
                Accept
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md text-sm w-full md:w-auto">
                Reject
              </Button>
            </div>
          </li>

          {/* User 3 */}
          <li className="flex flex-col md:flex-row items-center justify-between p-4 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center">
                <span className="text-lg font-semibold">I</span>
              </Avatar>
              <div>
                <p className="font-semibold text-base md:text-lg">Isabella Nguyen</p>
                <p className="text-gray-400 text-xs md:text-sm">i@example.com</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
              <Button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md text-sm w-full md:w-auto">
                Accept
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md text-sm w-full md:w-auto">
                Reject
              </Button>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default AllRequestsCard;
