import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteComment } from "../api/comment.api";

export function useDeleteComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,

    onSuccess: () => {
      toast.success("Comment deleted");

      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },

    onError: () => {
      toast.error("Failed to delete comment");
    },
  });
}
