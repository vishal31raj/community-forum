import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../components/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import UserSelector from "../components/UserSelector";
import CourseSelector from "../components/CourseSelector";

import { useUsers } from "../hooks/useUsers";
import { useCourses } from "../hooks/useCourses";
import { useUser } from "../hooks/useUser";

export default function HomePage() {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const { data: users = [] } = useUsers();
  const { data: courses = [] } = useCourses();

  const [selectedCourse, setSelectedCourse] = useState<number | "">("");

  const handleUserChange = (userId: number) => {
    const selectedUser = users.find((u) => u.id === userId) ?? null;

    setUser(selectedUser);
  };

  const handleViewPosts = () => {
    if (!user || !selectedCourse) {
      return;
    }

    navigate(`/courses/${selectedCourse}`);
  };

  return (
    <MainLayout>
      <Card className="mx-auto max-w-lg p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Community Forum</h1>

        <UserSelector
          users={users}
          value={user?.id ?? ""}
          onChange={handleUserChange}
        />

        <CourseSelector
          courses={courses}
          value={selectedCourse}
          onChange={setSelectedCourse}
        />

        <Button
          className="mt-4 w-full"
          disabled={!user || !selectedCourse}
          onClick={handleViewPosts}
        >
          View Posts
        </Button>
      </Card>
    </MainLayout>
  );
}
