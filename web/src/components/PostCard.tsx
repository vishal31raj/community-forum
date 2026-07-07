import type { ReactNode } from "react";

import type { Post } from "../types/post";

interface Props {
  post: Post;
  action?: ReactNode;
}

export default function PostCard({ post, action }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <h3>{post.title}</h3>

      <p>{post.body}</p>

      <small>{new Date(post.createdAt).toLocaleString()}</small>

      <p>
        <strong>{post.savesCount}</strong> saves
      </p>

      {action}
    </div>
  );
}
