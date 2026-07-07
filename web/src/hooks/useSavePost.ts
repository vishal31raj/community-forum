import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePost } from "../api/saved-post.api";

export function useSavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePost,

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
