import api from "./axios";

export interface CreatePostDto {
  courseId: number;
  title: string;
  body: string;
}

export const createPost = async (data: CreatePostDto) => {
  await api.post("/posts/create", data);
};

export async function deletePost(postId: number) {
  await api.delete(`/posts/${postId}`);
}

export async function getPost(postId: number) {
  const { data } = await api.get(`/posts/${postId}`);

  return data;
}

export async function likePost(postId: number) {
  const { data } = await api.post(`/posts/${postId}/like`);
  return data;
}

export async function unlikePost(postId: number) {
  const { data } = await api.delete(`/posts/${postId}/like`);
  return data;
}
