import { useQuery } from "@tanstack/react-query";

import { getCourses } from "../api/course.api";
import { useUser } from "./useUser";

export function useCourses() {
  const { user } = useUser();

  return useQuery({
    queryKey: ["courses", user?.id],
    queryFn: getCourses,
    enabled: !!user,
  });
}
