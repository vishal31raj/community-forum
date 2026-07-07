import { useQuery } from "@tanstack/react-query";
import { getCourseFeed } from "../api/course.api";

export function useCourseFeed(
  courseId: number,
  page: number,
  pageSize: number,
) {
  return useQuery({
    queryKey: ["course-feed", courseId, page, pageSize],
    queryFn: () => getCourseFeed(courseId, page, pageSize),
  });
}
