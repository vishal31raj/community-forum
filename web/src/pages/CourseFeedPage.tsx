import { useParams } from "react-router-dom";
import { useState } from "react";

import PostCard from "../components/PostCard";

import { useCourseFeed } from "../hooks/useCourseFeed";
import { useSavePost } from "../hooks/useSavePost";
import { useUnsavePost } from "../hooks/useUnsavePost";
import type { Post } from "../types/post";
import axios from "axios";

export default function CourseFeedPage() {
  const { courseId } = useParams();

  const [page] = useState(1);

  const { data, isLoading, isError, error } = useCourseFeed(
    Number(courseId),
    page,
    10,
  );

  const saveMutation = useSavePost();
  const unsaveMutation = useUnsavePost();

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    let message = "Something went wrong.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? message;
    }

    return (
      <div>
        <h1>Course Feed</h1>

        <p style={{ color: "red" }}>{message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-header">Course Feed</h1>

      {data?.data.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
          action={
            post.hasSaved ? (
              <button
                onClick={() => unsaveMutation.mutate(post.id)}
                disabled={unsaveMutation.isPending}
              >
                Unsave
              </button>
            ) : (
              <button
                onClick={() => saveMutation.mutate(post.id)}
                disabled={saveMutation.isPending}
              >
                Save
              </button>
            )
          }
        />
      ))}
    </div>
  );
}
