import { useQuery } from "@tanstack/react-query";
import { getSavedPosts } from "../api/saved-post.api";

export function useSavedPosts(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["saved-posts", page, pageSize],
    queryFn: () => getSavedPosts(page, pageSize),
  });
}
