import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../app";

describe("POST /api/posts/create", () => {
  it("creates a post successfully", async () => {
    const res = await request(app)
      .post("/api/posts/create")
      .set("x-user-id", "1")
      .send({
        courseId: 1,
        title: "My first post",
        body: "Hello React",
      });

    expect(res.status).toBe(201);

    expect(res.body.message).toBe("Post created successfully");

    expect(res.body.data).toMatchObject({
      title: "My first post",
      body: "Hello React",
      courseId: 1,
      userId: 1,
    });
  });

  it("returns 403 when student is not enrolled in the course", async () => {
    const res = await request(app)
      .post("/api/posts/create")
      .set("x-user-id", "1")
      .send({
        courseId: 2,
        title: "Unauthorized",
        body: "Should fail",
      });

    expect(res.status).toBe(403);

    expect(res.body.message).toBe("Not enrolled in this course");
  });
});
