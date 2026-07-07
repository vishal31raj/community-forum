import axios from "axios";
import PostCard from "../components/PostCard";

import { useSavedPosts } from "../hooks/useSavedPosts";
import { useUnsavePost } from "../hooks/useUnsavePost";
import type { Post } from "../types/post";

export default function SavedPostsPage() {
  const { data, isLoading, isError, error } = useSavedPosts(1, 10);

  const unsaveMutation = useUnsavePost();

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    let message = "Something went wrong.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? message;
    }

    return <p>{message}</p>;
  }

  return (
    <div>
      <h1>Saved Posts</h1>

      {data && !data.length && <p>No saved posts.</p>}

      {data?.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
          action={
            <button
              onClick={() => unsaveMutation.mutate(post.id)}
              disabled={unsaveMutation.isPending}
            >
              Unsave
            </button>
          }
        />
      ))}
    </div>
  );
}
