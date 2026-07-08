import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createComment } from "../api/comment.api";

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: string) => createComment(postId, body),

    onSuccess: () => {
      toast.success("Comment added");

      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },

    onError: () => {
      toast.error("Failed to add comment");
    },
  });
}
