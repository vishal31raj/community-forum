import { Link, useParams } from "react-router-dom";
import axios from "axios";

import MainLayout from "../components/MainLayout";
import CreateCommentForm from "../components/CreateCommentForm";
import CommentList from "../components/CommentList";

import { usePost } from "../hooks/usePost";
import { useUser } from "../hooks/useUser";
import { useLikePost } from "../hooks/useLikePost";
import { useUnlikePost } from "../hooks/useUnlikePost";

export default function PostDetailsPage() {
  const { postId } = useParams();
  const { user } = useUser();

  const id = Number(postId);

  const { data: post, isLoading, isError, error } = usePost(id);

  const likeMutation = useLikePost(id);
  const unlikeMutation = useUnlikePost(id);

  const loading = likeMutation.isPending || unlikeMutation.isPending;

  function handleLikeToggle() {
    if (post.hasLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  }

  if (isLoading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  if (isError) {
    const message = axios.isAxiosError(error)
      ? (error.response?.data?.message ?? "Something went wrong.")
      : "Something went wrong.";

    return (
      <MainLayout>
        <p className="text-red-600">{message}</p>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <p>Post not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Link
        to={`/feed`}
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      <div className="mb-8 rounded-xl bg-white p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{post.title}</h1>

        <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
          <span>By {post.author.name}</span>

          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>

        <p className="whitespace-pre-wrap text-gray-700">{post.body}</p>

        <div className="mt-6 flex gap-6 border-t pt-4 text-sm text-gray-500">
          <span>💾 {post.savesCount} Saves</span>

          <button
            onClick={handleLikeToggle}
            disabled={loading}
            className={`font-medium transition ${
              post.hasLiked
                ? "text-red-600"
                : "text-gray-500 hover:text-red-600"
            }`}
          >
            {post.hasLiked ? "❤️" : "🤍"} {post.likesCount} Likes
          </button>

          <span>💬 {post.commentsCount} Comments</span>
        </div>
      </div>

      {user?.role === "student" && <CreateCommentForm postId={id} />}

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Comments</h2>

        <CommentList postId={id} />
      </div>
    </MainLayout>
  );
}
