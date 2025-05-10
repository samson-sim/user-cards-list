"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "qs";
import { debounce } from "lodash";
import { SEARCH_FILTER_SOURCE } from "./constants";

export const UserFilter: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSearch = searchParams.get(SEARCH_FILTER_SOURCE) || "";
  const [searchInputValue, setSearchInputValue] = useState(initialSearch);

  const debouncedSearch = useMemo(
    () =>
      debounce((search: string) => {
        const query = qs.stringify(
          { search: search || undefined },
          { skipNulls: true }
        );

        router.replace(`${pathname}${query ? `?${query}` : ""}`);
      }, 500),
    [pathname, router]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setSearchInputValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <form className="mb-8">
      <div>
        <label
          htmlFor={SEARCH_FILTER_SOURCE}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search
        </label>
        <input
          type="text"
          id={SEARCH_FILTER_SOURCE}
          name={SEARCH_FILTER_SOURCE}
          value={searchInputValue}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </form>
  );
};
