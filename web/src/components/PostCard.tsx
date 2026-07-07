import type { ReactNode } from "react";

import Card from "./ui/Card";

import type { Post } from "../types/post";

interface Props {
  post: Post;
  action?: ReactNode;
}

export default function PostCard({ post, action }: Props) {
  return (
    <Card className="mb-5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>

          <p className="mt-3 whitespace-pre-wrap text-gray-700">{post.body}</p>

          <div className="mt-5 flex items-center gap-6 text-sm text-gray-500">
            <span>{post.savesCount} saves</span>

            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Card>
  );
}
