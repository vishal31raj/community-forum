import type { ChangeEvent } from "react";

import type { Course } from "../types/course";
import { t } from "i18next";

interface Props {
  courses: Course[];
  value: number | "";
  onChange: (courseId: number) => void;
}

export default function CourseSelector({ courses, value, onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {t("select_course")}
      </label>

      <select
        value={value}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      >
        <option value="">{t("choose_a_course")}</option>

        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>
    </div>
  );
}
