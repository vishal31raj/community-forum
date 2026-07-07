import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import CourseFeedPage from "../pages/CourseFeedPage";
import SavedPostsPage from "../pages/SavedPostsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/courses/:courseId" element={<CourseFeedPage />} />

        <Route path="/saved-posts" element={<SavedPostsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
