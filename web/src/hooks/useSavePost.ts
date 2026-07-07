import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePost } from "../api/saved-post.api";
import toast from "react-hot-toast";

export function useSavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePost,

    onSuccess: () => {
      toast.success("Post saved");

      queryClient.invalidateQueries({
        queryKey: ["course-feed"],
      });

      queryClient.invalidateQueries({
        queryKey: ["saved-posts"],
      });
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? "Failed to save post");
    },
  });
}
