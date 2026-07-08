import { getCourses } from "../repositories/course.repository";

export async function getCoursesService(userId: number, userRole: string) {
  return getCourses(userId, userRole);
}
