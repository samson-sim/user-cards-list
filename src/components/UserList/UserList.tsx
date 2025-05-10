"use client";

import { FC, useMemo } from "react";

import { useUsers } from "@/hooks/useUsers";
import { LoadingSpinner } from "../LoadingSpinner";
import { ErrorMessage } from "../ErrorMessage";
import { UserFilter } from "../UserFilter";
import { UserCard } from "../UserCard";
import { useSearchParams } from "next/navigation";
import { SEARCH_FILTER_SOURCE } from "../UserFilter/constants";

export const UserList: FC = () => {
  const { data: users = [], isLoading, isError, error } = useUsers();
  const searchParams = useSearchParams();
  const search = searchParams.get(SEARCH_FILTER_SOURCE) || "";

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const stringFields = [
        user.name,
        user.username,
        user.email,
        user.phone,
        user.website,
        user.address.street,
        user.address.suite,
        user.address.city,
        user.address.zipcode,
        user.company.name,
        user.company.catchPhrase,
        user.company.bs,
      ];

      return stringFields.some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, users]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Users List</h1>
      <UserFilter />
      {isError ? (
        <ErrorMessage message={error.message} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {users.length === 0
              ? "No users found"
              : "No users match your search"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
