import { Link } from "react-router-dom";

import type { ReactNode } from "react";

import Card from "./ui/Card";

import type { Post } from "../types/post";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

interface Props {
  post: Post;
  saveAction?: ReactNode;
  deleteAction?: ReactNode;
}

export default function PostCard({ post, saveAction, deleteAction }: Props) {
  return (
    <Card className="mb-5 p-6">
      <div>
        <p className="text-md font-semibold text-gray-500">
          {post.course.title}
        </p>
        <Link
          to={`/posts/${post.id}`}
          className="min-w-0 flex-1 cursor-pointer"
        >
          <h2 className="text-xl overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-gray-900 hover:text-blue-600">
            {post.title}
          </h2>
        </Link>

        <p className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap text-gray-700">
          {post.body}
        </p>

        <div className="mt-5 text-sm text-gray-500">
          <span className="text-black">{post.author.name}</span> •{" "}
          {new Date(post.createdAt).toDateString()}
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            {post.likesCount}
            <AiOutlineLike />
          </div>

          <div className="flex items-center gap-1">
            {post.commentsCount}
            <FaRegCommentDots />
          </div>

          <div className="flex items-center gap-1">
            {post.savesCount}
            {saveAction && (
              <div
                className="flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {saveAction}
              </div>
            )}
          </div>
          {deleteAction && (
            <div
              className="shrink-0 ml-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {deleteAction}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
