import { useState, type FormEvent } from "react";

import Button from "./ui/Button";
import CourseSelector from "./CourseSelector";

import { useCourses } from "../hooks/useCourses";
import { useCreatePost } from "../hooks/useCreatePost";

interface Props {
  onSuccess: () => void;
}

export default function CreatePostForm({ onSuccess }: Props) {
  const mutation = useCreatePost();

  const { data: courses = [] } = useCourses();

  const [courseId, setCourseId] = useState<number | "">("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!courseId) {
      return;
    }

    mutation.mutate(
      {
        courseId,
        title,
        body,
      },
      {
        onSuccess: () => {
          setCourseId("");
          setTitle("");
          setBody("");
          onSuccess();
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <CourseSelector
        courses={courses}
        value={courseId}
        onChange={setCourseId}
      />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        placeholder="Write here..."
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

      <Button disabled={mutation.isPending || !courseId}>Create Post</Button>
    </form>
  );
}
