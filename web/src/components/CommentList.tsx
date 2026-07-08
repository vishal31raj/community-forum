import axios from "axios";

import CommentCard, { type Comment } from "./CommentCard";

import { useComments } from "../hooks/useComments";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { useUser } from "../hooks/useUser";

interface Props {
  postId: number;
}

export default function CommentList({ postId }: Props) {
  const { user } = useUser();

  const {
    data = {
      data: [],
    },
    isLoading,
    isError,
    error,
  } = useComments(postId, 1, 20);

  const deleteMutation = useDeleteComment(postId);

  function handleDelete(commentId: number) {
    if (!window.confirm("Delete this comment?")) {
      return;
    }

    deleteMutation.mutate(commentId);
  }

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (isError) {
    const message = axios.isAxiosError(error)
      ? (error.response?.data?.message ?? "Something went wrong.")
      : "Something went wrong.";

    return <p className="text-red-600">{message}</p>;
  }

  if (data.data.length === 0) {
    return <p className="text-gray-500">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {data.data.map((comment: Comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          canDelete={
            user?.role === "moderator" || user?.id === comment.author.id
          }
          deleting={deleteMutation.isPending}
          onDelete={() => handleDelete(comment.id)}
        />
      ))}
    </div>
  );
}
