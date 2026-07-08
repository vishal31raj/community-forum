import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import CourseFeedPage from "../pages/CourseFeedPage";
import SavedPostsPage from "../pages/SavedPostsPage";
import RequireUser from "../components/RequireUser";
import NotFoundPage from "../pages/NotFoundPage";
import PostDetailsPage from "../pages/PostDetailsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/courses/:courseId"
          element={
            <RequireUser>
              <CourseFeedPage />
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
