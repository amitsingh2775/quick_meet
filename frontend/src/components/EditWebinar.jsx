import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const EditWebinar = ({ webinar, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduledTime: "",
    meetingLink: "",
  });

  useEffect(() => {
    if (webinar) {
      const formattedScheduledTime = new Date(webinar.scheduledTime)
        .toISOString()
        .slice(0, 16);
      setFormData({
        title: webinar.title,
        description: webinar.description,
        scheduledTime: formattedScheduledTime,
        meetingLink: webinar.meetingLink,
      });
    }
  }, [webinar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/webinars/${webinar.id}`,
        formData,
        { withCredentials: true }
      );
      onSave(response.data.webinar); // Pass updated data to onSave
      onClose(); // Close modal after saving
    } catch (error) {
      console.error("Error saving webinar", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Webinar</h2>
      <div className="mb-4">
        <label className="block font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Scheduled Time</label>
        <input
          type="datetime-local"
          name="scheduledTime"
          value={formData.scheduledTime}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Meeting Link</label>
        <input
          type="text"
          name="meetingLink"
          value={formData.meetingLink}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-gray-700 text-white"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={handleSave} className="bg-green-500 hover:bg-green-400 text-white">
          Save
        </Button>
        <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-400 text-white">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditWebinar;
