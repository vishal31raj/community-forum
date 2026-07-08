import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createPost } from "../api/post.api";
import { useUser } from "./useUser";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      toast.success("Post created");

      queryClient.invalidateQueries({
        queryKey: ["feed", user?.id],
      });
    },

    onError: () => {
      toast.error("Failed to create post");
    },
  });
}
