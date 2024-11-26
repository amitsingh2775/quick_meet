import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from "@/utils/profileService";
import axios from 'axios';
import { X, Edit, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserProfile({ onClose, onEdit }) {
  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState("Guest");
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({
    name: '',
    email: '',
    bio: '',
    experience: '',
    techstack: '',
  });

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

  const updateProfile = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/update', editableProfile, {
        withCredentials: true,
      });
      setUserProfile(response.data.user);  // Assuming the updated profile is returned
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditableProfile({
      name: userProfile?.name || '',
      email: userProfile?.email || '',
      bio: userProfile?.bio || '',
      experience: userProfile?.experience || '',
      techstack: userProfile?.techstack || '',
    });
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-lg bg-gray-800 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold">Edit Profile</h1>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label htmlFor="name" className="text-lg font-semibold">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editableProfile.name || ''}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="text-lg font-semibold">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={editableProfile.bio || ''}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="experience" className="text-lg font-semibold">Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={editableProfile.experience || ''}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="techstack" className="text-lg font-semibold">Tech Stacks</label>
              <input
                type="text"
                id="techstack"
                name="techstack"
                value={editableProfile.techstack || ''}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md"
              />
            </div>
            <button
              onClick={updateProfile}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg bg-gray-800 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">{userProfile?.name || "User Profile"}</h1>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 border-4 border-blue-500">
              <AvatarImage
                src={userProfile?.avatarUrl || "https://img.freepik.com/premium-photo/web-developer-digital-avatar-generative-ai_934475-9048.jpg"}
                alt="User"
              />
              <AvatarFallback>{userProfile?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-2xl font-bold">{userProfile?.name || "User"}</h2>
            <p className="text-gray-400">{userProfile?.email || "No email provided"}</p>
          </div>

          <div className="text-center mb-6">
            <button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              Edit Profile
              <Edit className="inline-block ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Bio</h3>
            <p className="mt-2 text-gray-300 text-sm">
              {userProfile?.bio || "No bio available"}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Webinar Ratings</h3>
            <div className="flex items-center mt-2">
              {Array.from({ length: userProfile?.rating || 0 }).map((_, index) => (
                <Star key={index} className="h-6 w-6 text-yellow-500" />
              ))}
              {userProfile?.rating ? (
                <p className="text-sm text-gray-400 ml-2">({userProfile.rating} out of 5)</p>
              ) : null}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Tech Stack</h3>
            <ul className="mt-2 flex flex-wrap gap-3">
              {Array.isArray(userProfile?.techstack) && userProfile?.techstack.map((tech, index) => (
                <li key={index} className="px-3 py-1 bg-gray-700 rounded-md text-sm">{tech}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Badges</h3>
            <ul className="mt-2 flex gap-3">
              {Array.isArray(userProfile?.badges) && userProfile?.badges.map((badge, index) => (
                <li key={index} className="px-3 py-1 bg-gray-700 rounded-md text-sm">{badge}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
