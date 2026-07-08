import { useState } from "react";

import Button from "./ui/Button";
import { useCreateComment } from "../hooks/useCreateComment";

interface Props {
  postId: number;
}

export default function CreateCommentForm({ postId }: Props) {
  const mutation = useCreateComment(postId);

  const [body, setBody] = useState("");

  function onSubmit(e: any) {
    e.preventDefault();

    if (!body.trim()) {
      return;
    }

    mutation.mutate(body, {
      onSuccess: () => {
        setBody("");
      },
    });
  }

  return (
    <form onSubmit={onSubmit} className="mb-6 rounded-xl bg-white p-4 shadow">
      <textarea
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a comment..."
        className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

      <Button loading={mutation.isPending}>Comment</Button>
    </form>
  );
}
