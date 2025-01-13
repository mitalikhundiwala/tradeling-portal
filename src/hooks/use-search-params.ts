"use client";

import { useSearchParams } from "next/navigation";
import { isNil, omit, omitBy } from "lodash";

const useUpdateSearchParams = () => {
  const searchParams = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (queryParams: any) => {
    const nonNilQueryParams = omitBy(queryParams, isNil);

    const existingSearchParams = {
      ...omit(Object.fromEntries(searchParams), Object.keys(queryParams)),
    };

    const updatedSearchParams = new URLSearchParams({
      ...existingSearchParams,
      ...nonNilQueryParams,
    });

    if (updatedSearchParams.toString() !== searchParams.toString()) {
      window.history.pushState(null, "", `?${updatedSearchParams.toString()}`);
    }
  };
};

export default useUpdateSearchParams;

export const useCustomSearchParams = <
  T extends Record<string, string | undefined>,
>() => {
  const searchParams = useSearchParams();

  const params = Object.fromEntries(searchParams.entries()) as T;

  return params;
};
