import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unsavePost } from "../api/saved-post.api";

export function useUnsavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsavePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-feed"],
      });

      queryClient.invalidateQueries({
        queryKey: ["saved-posts"],
      });
    },
  });
}
