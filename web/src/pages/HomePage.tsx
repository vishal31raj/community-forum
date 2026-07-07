import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserSelector from "../components/UserSelector";
import CourseSelector from "../components/CourseSelector";
import { useUser } from "../hooks/useUser";

export default function HomePage() {
  const navigate = useNavigate();

  const { user } = useUser();

  const [courseId, setCourseId] = useState<number | "">("");

  return (
    <div>
      <h1 className="page-header">Community Forum</h1>

      <UserSelector />

      <br />

      <CourseSelector value={courseId} onChange={setCourseId} />

      <br />

      <button
        disabled={!user || !courseId}
        onClick={() => navigate(`/courses/${courseId}`)}
      >
        View Posts
      </button>

      <button onClick={() => navigate("/saved-posts")} disabled={!user}>
        Saved Posts
      </button>
    </div>
  );
}
