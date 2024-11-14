import React, { useState } from 'react';
import { Edit, Linkedin, Instagram } from 'lucide-react';
import { FaTimes } from 'react-icons/fa'; // Close button icon

const UserProfilePage = ({ userProfile, onClose }) => {
  if (!userProfile) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
      <div className="bg-[#212b39] p-6 rounded-lg w-[500px] h-[500px] shadow-lg">
        {/* Profile Picture */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={userProfile.profilePicture}
            alt={userProfile.name}
            className="w-full h-full object-cover rounded-full border-4 border-[#1d2633]"
          />
          {onClose && ( // Conditionally render close button if onClose function provided
            <button className="absolute top-2 right-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 focus:outline-none" onClick={onClose}>
              <FaTimes size={16} color="#fff" />
            </button>
          )}
        </div>

        {/* Name and Username */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
          <p className="text-gray-400 text-sm">@{userProfile.username}</p>
        </div>

        {/* Bio */}
        <p className="text-gray-300 text-sm text-center mt-4 px-4 leading-relaxed">
          {userProfile.bio}
        </p>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors">
            Edit profile
          </button>
        </div>

        {/* Follower Count */}
        <div className="flex justify-center mt-4 text-gray-400 text-sm">
          <p>{userProfile.followers} followers • {userProfile.following} following</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} color="#0a66c2" />
          </a>
          <a href={userProfile.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram size={20} color="#d62976" />
          </a>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-700" />

        {/* Achievements Section */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-300">Achievements</h3>
          <div className="flex justify-center mt-2">
            {Array.isArray(userProfile.achievements) && userProfile.achievements.map((achievement, index) => (
              <img
                key={index}
                src={achievement.icon}
                alt={achievement.title}
                className="w-10 h-10 mx-1 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;