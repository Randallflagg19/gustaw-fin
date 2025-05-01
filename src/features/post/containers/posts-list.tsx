'use client'
import { JSX, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Post } from "@/features/post/ui/post";

export const PostsList = (): JSX.Element => {
  const [postsCount, setPostsCount] = useState(4);

  const handleAddPost = () => {
    setPostsCount((prev) => prev + 1);
  };

  return (
    <>
      <Button onClick={handleAddPost} variant="default" size="default">
        Добавить пост
      </Button>
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(postsCount)].map((_, index) => (
            <Post key={index} />
          ))}
        </div>
      </div>
    </>
  );
};
