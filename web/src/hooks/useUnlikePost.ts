import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { unlikePost } from "../api/post.api";

export function useUnlikePost(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unlikePost(postId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
    },

    onError: () => {
      toast.error("Failed to unlike post");
    },
  });
}
