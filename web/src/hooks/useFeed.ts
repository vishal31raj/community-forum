import { useQuery } from "@tanstack/react-query";

import { useUser } from "./useUser";
import { getFeed } from "../api/course.api";

export function useFeed(page: number, pageSize: number) {
  const { user } = useUser();

  return useQuery({
    queryKey: ["feed", user?.id, page, pageSize],
    queryFn: () => getFeed(page, pageSize),
    enabled: !!user,
  });
}
