'use client';

import { Blog } from '@canadian-lawn/api';
import { BlogCard } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import React from 'react';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { detailRoutes } from '@/config/routes';
import { useBlog } from '@/hooks/api/useBlog';

export const Blogs = () => {
  const { useHook: blogs } = useBlog();

  const router = useRouter();

  const { data, isLoading } = blogs();

  const blogsData: Blog[] | undefined = data?.data;

  const handleClick = React.useCallback(
    (slug: string) => router.push(detailRoutes.blog(slug)),
    [router]
  );

  if (isLoading) {
    return <MapleSpinner />;
  }

  return (
    <LayoutWrapper>
      <div className="flex flex-col flex-wrap gap-4 lg:flex-row lg:gap-5">
        {blogsData?.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image?.url}
            title={blog.title}
            date={blog.date}
            onClick={() => handleClick(blog.slug)}
          />
        ))}
      </div>
    </LayoutWrapper>
  );
};
