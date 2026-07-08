import { useQuery } from "@tanstack/react-query";

import { getComments } from "../api/comment.api";

export function useComments(postId: number, page: number, pageSize: number) {
  return useQuery({
    queryKey: ["comments", postId, page, pageSize],
    queryFn: () => getComments(postId, page, pageSize),
    enabled: postId > 0,
  });
}
