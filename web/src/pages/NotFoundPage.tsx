import { Link } from "react-router-dom";

import MainLayout from "../components/MainLayout";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <div className="mb-6 text-8xl">🔍</div>

        <h1 className="mb-2 text-5xl font-bold text-gray-900">404</h1>

        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Page not found
        </h2>

        <p className="mb-8 max-w-md text-gray-500">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </MainLayout>
  );
}
