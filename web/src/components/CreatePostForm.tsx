import { useState, type FormEvent } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import Button from "./ui/Button";

interface Props {
  courseId: number;
  onSuccess: () => void;
}

export default function CreatePostForm({ courseId, onSuccess }: Props) {
  const mutation = useCreatePost(courseId);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(e);

    mutation.mutate(
      {
        courseId,
        title,
        body,
      },
      {
        onSuccess: () => {
          setTitle("");
          setBody("");
          onSuccess();
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full mb-3 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        placeholder="Write here..."
        className="w-full mb-3 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

      <Button disabled={mutation.isPending}>Create Post</Button>
    </form>
  );
}
