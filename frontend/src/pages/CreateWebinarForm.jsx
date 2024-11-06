import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Share, Download } from "lucide-react"; // Icons for download, share, close

export default function CreateWebinarForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  // Simulate backend response with QR code
  const handleCreateWebinar = () => {
    // Fetch QR code URL from backend here; using placeholder for now
    setQrCodeUrl("https://via.placeholder.com/150"); // Replace with backend URL
    setShowPopup(true);
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="shadow-md p-6 bg-gray-800 text-white rounded-lg w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">Create Webinar</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-gray-400 text-left">Title</Label>
              <Input id="title" placeholder="Enter webinar title" className="bg-gray-700 text-white mt-2" />
            </div>
            <div>
              <Label htmlFor="description" className="text-gray-400 text-left">Description</Label>
              <Textarea id="description" placeholder="Enter webinar description" className="bg-gray-700 text-white mt-2" />
            </div>
            <div>
              <Label htmlFor="scheduledTime" className="text-gray-400 text-left">Scheduled Time</Label>
              <Input type="datetime-local" id="scheduledTime" className="bg-gray-700 text-white mt-2" />
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full mt-4"
              onClick={(e) => {
                e.preventDefault();
                handleCreateWebinar();
              }}
            >
              Create Now
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Popup for QR Code */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
            {/* Close Button */}
            <button onClick={() => setShowPopup(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <X size={24} />
            </button>

            <h2 className="text-lg font-semibold mb-4">Webinar QR Code</h2>
            <div className="flex justify-center mb-4">
              <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
            </div>

            {/* Download and Share Buttons */}
            <div className="flex justify-between mt-4">
              <Button
                className="bg-blue-600 hover:bg-blue-500 text-white flex items-center space-x-2 px-4 py-2 rounded"
                onClick={() => window.open(qrCodeUrl, "_blank")}
              >
                <Download size={18} className="mr-1" />
                Download
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-500 text-white flex items-center space-x-2 px-4 py-2 rounded"
                onClick={() => alert("Share functionality coming soon!")}
              >
                <Share size={18} className="mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
