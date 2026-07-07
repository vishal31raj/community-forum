import type { Course } from "../api/course.api";
import { useCourses } from "../hooks/useCourses";

interface Props {
  value: number | "";
  onChange: (courseId: number) => void;
}

export default function CourseSelector({ value, onChange }: Props) {
  const { data: courses, isLoading, isError } = useCourses();

  if (isLoading) return <p>Loading courses...</p>;

  if (isError) return <p>Failed to load courses.</p>;

  return (
    <div>
      <label>Course</label>

      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        <option value="">Select a course</option>

        {courses?.map((course: Course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>
    </div>
  );
}
