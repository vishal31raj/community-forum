import { useState } from "react";
import axios from "axios";

import MainLayout from "../components/MainLayout";
import PostCard from "../components/PostCard";
import Button from "../components/ui/Button";

import { useFeed } from "../hooks/useFeed";
import { useSavePost } from "../hooks/useSavePost";
import { useUnsavePost } from "../hooks/useUnsavePost";
import { useDeletePost } from "../hooks/useDeletePost";
import { useUser } from "../hooks/useUser";

import type { Post } from "../types/post";
import Pagination from "../components/Pagination";
import Modal from "../components/ui/Modal";
import CreatePostForm from "../components/CreatePostForm";

export default function FeedPage() {
  const { user } = useUser();

  const [page, setPage] = useState(1);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const {
    data = {
      course: {
        title: "",
      },
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
      data: [],
    },
    isLoading,
    isError,
    error,
  } = useFeed(page, 10);

  const saveMutation = useSavePost();
  const unsaveMutation = useUnsavePost();
  const deleteMutation = useDeletePost();

  const [loadingPostId, setLoadingPostId] = useState<number | null>(null);

  const handleDelete = (postId: number) => {
    if (!window.confirm("Delete this post?")) {
      return;
    }

    deleteMutation.mutate(postId);
  };

  const handleSaveToggle = (post: Post) => {
    setLoadingPostId(post.id);

    const mutation = post.hasSaved ? unsaveMutation : saveMutation;

    mutation.mutate(post.id, {
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
  } else if (data?.data.length === 0) {
    content = <p className="text-gray-500">No posts found.</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.data.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            action={
              user?.role === "moderator" || user?.id === post.author.id ? (
                <Button
                  loading={deleteMutation.isPending}
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  loading={loadingPostId === post.id}
                  onClick={() => handleSaveToggle(post)}
                >
                  {post.hasSaved ? "Unsave" : "Save"}
                </Button>
              )
            }
          />
        ))}
      </div>
    );
  }

  return (
    <MainLayout>
      {!isLoading && !isError && data && (
        <div className="flex justify-between mb-8">
          {data?.data.length > 0 && <p>{data?.data.length} posts</p>}
          {user?.role === "student" && (
            <div>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowCreateModal(true)}
              >
                Create Post
              </Button>
            </div>
          )}
        </div>
      )}

      {content}
      {!isLoading && !isError && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      <Modal
        open={showCreateModal}
        title="Create Post"
        onClose={() => setShowCreateModal(false)}
      >
        <CreatePostForm onSuccess={() => setShowCreateModal(false)} />
      </Modal>
    </MainLayout>
  );
}
