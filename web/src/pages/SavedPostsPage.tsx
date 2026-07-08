import { useState } from "react";
import axios from "axios";

import MainLayout from "../components/MainLayout";
import PostCard from "../components/PostCard";

import { useSavedPosts } from "../hooks/useSavedPosts";
import { useUnsavePost } from "../hooks/useUnsavePost";
import type { Post } from "../types/post";
import { MdBookmark } from "react-icons/md";

import { useTranslation } from "react-i18next";

export default function SavedPostsPage() {
  const { t } = useTranslation();
  const { data = [], isLoading, isError, error } = useSavedPosts(1, 10);

  const unsaveMutation = useUnsavePost();

  const [loadingPostId, setLoadingPostId] = useState<number | null>(null);

  const handleUnsave = (postId: number) => {
    setLoadingPostId(postId);

    unsaveMutation.mutate(postId, {
      onSettled: () => setLoadingPostId(null),
    });
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    const message = axios.isAxiosError(error)
      ? (error.response?.data?.message ?? "Something went wrong.")
      : "Something went wrong.";

    content = <p className="text-red-600">{message}</p>;
  } else if (data.length === 0) {
    content = <p className="text-gray-500">{t("no_saved_posts")}</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {data.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
            saveAction={
              <button
                type="button"
                onClick={() => handleUnsave(post.id)}
                disabled={loadingPostId === post.id}
                className="disabled:opacity-50"
                aria-label="Unsave post"
              >
                <MdBookmark className="text-xl text-blue-600 hover:text-blue-700" />
              </button>
            }
          />
        ))}
      </div>
    );
  }

  return (
    <MainLayout>
      <h1 className="mb-8 text-3xl font-bold">{t("savedPosts")}</h1>

      {content}
    </MainLayout>
  );
}
