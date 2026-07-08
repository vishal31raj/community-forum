import { Link } from "react-router-dom";

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
        <Link to={`/posts/${post.id}`} className="flex-1 cursor-pointer">
          <p className="text-md font-semibold text-gray-500">
            {post.course.title}
          </p>
          <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
            {post.title}
          </h2>

          <p className="mt-3 whitespace-pre-wrap text-gray-700">{post.body}</p>

          <div className="mt-5 text-sm text-gray-500">
            <span className="text-black">{post.author.name}</span> •{" "}
            {new Date(post.createdAt).toDateString()}
          </div>

          <div className="flex gap-3">
            <div>{post.savesCount} saves</div>•
            <div>{post.likesCount} likes</div>•
            <div>{post.commentsCount} comments</div>
          </div>
        </Link>

        {action && (
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            {action}
          </div>
        )}
      </div>
    </Card>
  );
}
