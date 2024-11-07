import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Share, Download } from "lucide-react";

export default function CreateWebinarForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    meetingLink: '',
    scheduledTime: ''
  });
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCreateWebinar = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to the backend with withCredentials to send cookies
      const response = await axios.post(
        'http://localhost:5000/api/webinars/create', // Replace with your actual endpoint
        formData,
        {
          withCredentials: true, // Ensures cookies (like JWT) are sent with the request
        }
      );

      // Assume backend sends back the QR code URL
      setQrCodeUrl(response.data.qrCode);
      setShowPopup(true);
    } catch (error) {
      console.error("Error creating webinar:", error);
      alert("Failed to create webinar. Please try again.");
    }
  };

  // Share Functions
  const handleShareClick = () => {
    setShowShareOptions(true);
  };

  const handleShareToWhatsApp = () => {
    window.open(`https://wa.me/?text=Check%20out%20this%20webinar%20QR%20Code%3A%20${encodeURIComponent(qrCodeUrl)}`, "_blank");
  };

  const handleShareToTwitter = () => {
    // Assuming qrCodeUrl is the URL of the QR code image.
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(qrCodeUrl)}&text=Check%20out%20this%20webinar!`, "_blank");
  };

  const handleShareToInstagram = () => {
    alert("Instagram sharing is not supported directly. Please open Instagram and paste the URL manually.");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrCodeUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="shadow-md p-6 bg-gray-800 text-white rounded-lg w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">Create Webinar</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleCreateWebinar}>
            <div>
              <Label htmlFor="title" className="text-gray-400 text-left">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter webinar title"
                className="bg-gray-700 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-gray-400 text-left">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter webinar description"
                className="bg-gray-700 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="meetingLink" className="text-gray-400 text-left">Meeting Link</Label>
              <Input
                id="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
                placeholder="Enter meeting link"
                className="bg-gray-700 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="scheduledTime" className="text-gray-400 text-left">Scheduled Time</Label>
              <Input
                type="datetime-local"
                id="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleInputChange}
                className="bg-gray-700 text-white mt-2"
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full"
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
            <button onClick={() => setShowPopup(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Webinar QR Code</h2>
            <div className="flex justify-center mb-4">
              <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
            </div>

            {/* Download and Share Buttons in Row */}
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
                onClick={handleShareClick}
              >
                <Share size={18} className="mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Share Options Popup */}
      {showShareOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
            <button onClick={() => setShowShareOptions(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Share Webinar</h2>

            <div className="space-y-4">
              <Button onClick={handleShareToWhatsApp} className="w-full bg-green-600 hover:bg-green-500">
                Share on WhatsApp
              </Button>
              <Button onClick={handleShareToTwitter} className="w-full bg-blue-500 hover:bg-blue-400">
                Share on Twitter
              </Button>
              <Button onClick={handleShareToInstagram} className="w-full bg-purple-500 hover:bg-purple-400">
                Share on Instagram
              </Button>
              <Button onClick={handleCopyLink} className="w-full bg-gray-600 hover:bg-gray-500">
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
