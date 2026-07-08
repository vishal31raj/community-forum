import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { unsavePost } from "../api/saved-post.api";
import toast from "react-hot-toast";

export function useUnsavePost() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: unsavePost,

    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({
        queryKey: ["feed", user?.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["saved-posts", user?.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });

      toast.success("Post unsaved");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? "Failed to remove post");
    },
  });
}
