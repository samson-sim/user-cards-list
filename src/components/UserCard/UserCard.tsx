"use client";
import { FC } from "react";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
}

export const UserCard: FC<UserCardProps> = (props) => {
  const { user } = props;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Website:</span>{" "}
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {user.website}
            </a>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span>{" "}
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Company:</span> {user.company.name}
          </p>
        </div>
      </div>
    </div>
  );
};
