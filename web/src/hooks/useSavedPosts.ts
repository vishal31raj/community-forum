import { useQuery } from "@tanstack/react-query";

import { useUser } from "./useUser";
import { getSavedPosts } from "../api/saved-post.api";

export function useSavedPosts(page: number, pageSize: number) {
  const { user } = useUser();

  return useQuery({
    queryKey: ["saved-posts", user?.id, page, pageSize],
    queryFn: () => getSavedPosts(page, pageSize),
    enabled: !!user,
  });
}
