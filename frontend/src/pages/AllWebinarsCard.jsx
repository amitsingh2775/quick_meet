import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";

function getStatusColor(status) {
  switch (status) {
    case "Ongoing":
      return "text-green-500";
    case "Completed":
      return "text-red-500";
    default:
      return "text-gray-400";
  }
}

function AllWebinarsCard() {
  const [webinars, setWebinars] = useState([]);

  // Fetch webinars when the component mounts
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/webinars/all', {
          withCredentials: true,  // Include cookies in the request
        }); // Update with your API endpoint
        setWebinars(response.data.webinars);
        //  console.log("res is ",response.data.webinars);

      } catch (error) {
        console.error("Error fetching webinars", error);
      }
    };
    fetchWebinars();
  }, []);

  return (
    <Card className="shadow-md p-4 bg-gray-800 text-white rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">All Webinars</CardTitle>
        <p className="text-gray-400 text-sm">List of ongoing and completed webinars</p>
      </CardHeader>
      <CardContent>
        <ul>
          {webinars.map((webinar) => (
            <li
              key={webinar.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b border-gray-700 space-y-4 md:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center">
                 
                  <span className="text-lg font-semibold">
                    {webinar.name && typeof webinar.name === 'string'
                      ? webinar.name.charAt(0)
                      : 'N'}
                  </span>

                </Avatar>
                <div>
                  <p className="font-semibold text-base md:text-lg">
                    {/* Display fallback text if instructor is missing */}
                    {webinar.name || 'Unknown Instructor'}
                  </p>
                  <p className="text-gray-400 text-sm md:text-base">
                    {webinar.title}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    {new Date(webinar.scheduledTime).toLocaleDateString()} -{" "}
                    <span className={getStatusColor(webinar.status)}>
                      {webinar.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                <Button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md text-sm w-full md:w-auto">
                  View Details
                </Button>
                <Button className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md text-sm w-full md:w-auto">
                  Cancel
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default AllWebinarsCard;
