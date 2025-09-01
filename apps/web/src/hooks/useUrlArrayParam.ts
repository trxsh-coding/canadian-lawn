'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParams = React.useMemo(() => {
    const params: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      if (params[key]) {
        if (Array.isArray(params[key])) {
          (params[key] as string[]).push(value);
        } else {
          params[key] = [params[key] as string, value];
        }
      } else {
        params[key] = value;
      }
    });
    return params;
  }, [searchParams]);

  const updateUrlIfChanged = React.useCallback(
    (newUrl: URL) => {
      const next = `${newUrl.pathname}${newUrl.search}`;
      const now = `${window.location.pathname}${window.location.search}`;

      if (next !== now) {
        router.replace(next, { scroll: false });
      }
    },
    [router]
  );

  const getNumericArrayParam = React.useCallback(
    (key: string): number[] => {
      const param = searchParams.get(key);
      if (!param) return [];

      return param
        .split(',')
        .map(Number)
        .filter((n) => !isNaN(n));
    },
    [searchParams]
  );

  const setNumericArrayParam = React.useCallback(
    (key: string, values: number[]) => {
      const url = new URL(window.location.href);

      if (values.length > 0) {
        url.searchParams.set(key, values.join(','));
      } else {
        url.searchParams.delete(key);
      }

      updateUrlIfChanged(url);
    },
    [updateUrlIfChanged]
  );

  const updateQuery = React.useCallback(
    (updates: Record<string, number[]>) => {
      const url = new URL(window.location.href);

      Object.entries(updates).forEach(([key, values]) => {
        if (values?.length > 0) {
          url.searchParams.set(key, values.join(','));
        } else {
          url.searchParams.delete(key);
        }
      });

      updateUrlIfChanged(url);
    },
    [updateUrlIfChanged]
  );

  return {
    getNumericArrayParam,
    setNumericArrayParam,
    updateQuery,
    pageParams,
  };
}
