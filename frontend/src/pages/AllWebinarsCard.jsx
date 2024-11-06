import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";

const webinars = [
  {
    id: 1,
    instructor: "Sofia Davis",
    topic: "Introduction to React",
    date: "2024-11-10",
    status: "Ongoing",
  },
  {
    id: 2,
    instructor: "Jackson Lee",
    topic: "Advanced JavaScript",
    date: "2024-11-15",
    status: "Upcoming",
  },
  {
    id: 3,
    instructor: "Isabella Nguyen",
    topic: "Understanding Web APIs",
    date: "2024-10-30",
    status: "Completed",
  },
];

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
                    {webinar.instructor.charAt(0)}
                  </span>
                </Avatar>
                <div>
                  <p className="font-semibold text-base md:text-lg">
                    {webinar.instructor}
                  </p>
                  <p className="text-gray-400 text-sm md:text-base">
                    {webinar.topic}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    {webinar.date} -{" "}
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
