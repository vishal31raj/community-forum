import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import MainLayout from "../components/MainLayout";
import CreateCommentForm from "../components/CreateCommentForm";
import CommentList from "../components/CommentList";

import { usePost } from "../hooks/usePost";
import { useUser } from "../hooks/useUser";
import { useLikePost } from "../hooks/useLikePost";
import { useUnlikePost } from "../hooks/useUnlikePost";
import { useSavePost } from "../hooks/useSavePost";
import { useUnsavePost } from "../hooks/useUnsavePost";
import { useDeletePost } from "../hooks/useDeletePost";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { AiFillLike, AiOutlineDelete, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { t } from "i18next";

export default function PostDetailsPage() {
  const { postId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const id = Number(postId);

  const { data: post, isLoading, isError, error } = usePost(id);

  const likeMutation = useLikePost(id);
  const unlikeMutation = useUnlikePost(id);

  const loading = likeMutation.isPending || unlikeMutation.isPending;

  const saveMutation = useSavePost();
  const unsaveMutation = useUnsavePost();
  const deleteMutation = useDeletePost();

  const saveLoading = saveMutation.isPending || unsaveMutation.isPending;

  function handleSaveToggle() {
    if (post.hasSaved) {
      unsaveMutation.mutate(post.id);
    } else {
      saveMutation.mutate(post.id);
    }
  }

  function handleDelete() {
    if (!window.confirm("Delete this post?")) return;

    deleteMutation.mutate(post.id, {
      onSuccess: () => {
        navigate("/feed");
      },
    });
  }

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
        ← {t("back")}
      </Link>

      <div className="mb-8 rounded-xl bg-white p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{post.title}</h1>

        <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
          <span>{t("by")} {post.author.name}</span>

          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>

        <p className="whitespace-pre-wrap text-gray-700">{post.body}</p>
        <div className="mt-6 flex items-center gap-8 border-t pt-4 text-gray-600">
          <button
            type="button"
            onClick={handleSaveToggle}
            disabled={saveLoading}
            className="flex items-center gap-2 transition hover:text-blue-600 disabled:opacity-50"
          >
            {post.hasSaved ? (
              <MdBookmark className="text-2xl text-blue-600" />
            ) : (
              <MdBookmarkBorder className="text-2xl" />
            )}
            <span>{post.savesCount}</span>
          </button>

          <button
            type="button"
            onClick={handleLikeToggle}
            disabled={loading}
            className="flex items-center gap-2 transition hover:text-blue-600 disabled:opacity-50"
          >
            {post.hasLiked ? (
              <AiFillLike className="text-2xl text-blue-600" />
            ) : (
              <AiOutlineLike className="text-2xl" />
            )}
            <span>{post.likesCount}</span>
          </button>

          <div className="flex items-center gap-2">
            <FaRegCommentDots className="text-xl" />
            <span>{post.commentsCount}</span>
          </div>

          {(user?.role === "moderator" || user?.id === post.author.id) && (
            <div className="ml-auto">
              <button onClick={handleDelete}>
                <AiOutlineDelete className="text-xl text-red-600 hover:cursor-pointer" />
              </button>
            </div>
          )}
        </div>
      </div>

      {user?.role === "student" && <CreateCommentForm postId={id} />}

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">{t("comments")}</h2>

        <CommentList postId={id} />
      </div>
    </MainLayout>
  );
}
