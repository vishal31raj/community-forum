import api from "./axios";

export async function deletePost(postId: number) {
  await api.delete(`/posts/${postId}`);
}
