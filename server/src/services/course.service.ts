import { getCourses } from "../repositories/course.repository";

export async function getCoursesService() {
  return getCourses();
}
