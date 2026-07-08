import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { likePost } from "../api/post.api";

export function useLikePost(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likePost(postId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
    },

    onError: () => {
      toast.error("Failed to like post");
    },
  });
}
