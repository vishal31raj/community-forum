import { useQuery } from "@tanstack/react-query";

import { getPost } from "../api/post.api";
import { useUser } from "./useUser";

export function usePost(postId: number) {
  const { user } = useUser();

  return useQuery({
    queryKey: ["post", postId, user?.id],
    queryFn: () => getPost(postId),
    enabled: !!user,
  });
}
