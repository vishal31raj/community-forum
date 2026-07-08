import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { savePost } from "../api/saved-post.api";
import toast from "react-hot-toast";

export function useSavePost() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: savePost,

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

      toast.success("Post saved");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? "Failed to remove post");
    },
  });
}
