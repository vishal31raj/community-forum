import { BrowserRouter, Routes, Route } from "react-router-dom";

import FeedPage from "../pages/FeedPage";
import SavedPostsPage from "../pages/SavedPostsPage";
import RequireUser from "../components/RequireUser";
import NotFoundPage from "../pages/NotFoundPage";
import PostDetailsPage from "../pages/PostDetailsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireUser>
              <FeedPage />
            </RequireUser>
          }
        />

        <Route
          path="/feed"
          element={
            <RequireUser>
              <FeedPage />
            </RequireUser>
          }
        />

        <Route
          path="/saved-posts"
          element={
            <RequireUser>
              <SavedPostsPage />
            </RequireUser>
          }
        />

        <Route
          path="/posts/:postId"
          element={
            <RequireUser>
              <PostDetailsPage />
            </RequireUser>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
