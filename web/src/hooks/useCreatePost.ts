import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/post.api";
import toast from "react-hot-toast";

export function useCreatePost(courseId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      toast.success("Post created");

      queryClient.invalidateQueries({
        queryKey: ["course-feed", courseId],
      });
    },

    onError: () => {
      toast.error("Failed to create post");
    },
  });
}
