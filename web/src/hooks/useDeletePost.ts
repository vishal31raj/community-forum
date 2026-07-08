import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deletePost } from "../api/post.api";
import { useUser } from "./useUser";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      toast.success("Post deleted");

      queryClient.invalidateQueries({
        queryKey: ["feed", user?.id],
      });
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? "Failed to delete post");
    },
  });
}
