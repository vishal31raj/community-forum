import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deletePost } from "../api/post.api";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      toast.success("Post deleted");

      queryClient.invalidateQueries({
        queryKey: ["course-feed"],
      });
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? "Failed to delete post");
    },
  });
}
