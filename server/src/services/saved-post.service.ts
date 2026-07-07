import {
  createSavedPost,
  findActiveSavedPost,
  findSavedPost,
  getSavedPosts,
  reactivateSavedPost,
  softDeleteSavedPost,
} from "../repositories/saved-post.repository";

import { findPostById } from "../repositories/post.repository";
import { httpError } from "../utils/http-error";

export async function savePostService(userId: number, postId: number) {
  const post = await findPostById(postId);

  if (!post) {
    throw httpError(404, "Post not found");
  }

  const savedPost = await findSavedPost(userId, postId);

  if (!savedPost) {
    return createSavedPost(userId, postId);
  }

  if (savedPost.deletedAt) {
    return reactivateSavedPost(savedPost.id);
  }

  return savedPost;
}

export async function unsavePostService(userId: number, postId: number) {
  const savedPost = await findActiveSavedPost(userId, postId);

  if (!savedPost) {
    return;
  }

  return softDeleteSavedPost(savedPost.id);
}

export async function getSavedPostsService(
  userId: number,
  page = 1,
  pageSize = 10,
) {
  return getSavedPosts(userId, page, pageSize);
}
