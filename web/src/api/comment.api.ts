import api from "./axios"; // Adjust the import to match your project

export async function getComments(postId: number, page = 1, pageSize = 10) {
  const { data } = await api.get(`/posts/${postId}/comments`, {
    params: {
      page,
      pageSize,
    },
  });

  return data;
}

export async function createComment(postId: number, body: string) {
  const { data } = await api.post(`/posts/${postId}/comments`, {
    body,
  });

  return data;
}

export async function deleteComment(commentId: number) {
  const { data } = await api.delete(`/comments/${commentId}`);

  return data;
}
