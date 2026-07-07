import api from "./axios";

export async function savePost(postId: number) {
  const { data } = await api.post(`/posts/${postId}/save`);
  return data;
}

export async function unsavePost(postId: number) {
  const { data } = await api.delete(`/posts/${postId}/save`);
  return data;
}

export async function getSavedPosts(page = 1, pageSize = 10) {
  const { data } = await api.get("/me/saved-posts", {
    params: {
      page,
      pageSize,
    },
  });

  return data;
}
