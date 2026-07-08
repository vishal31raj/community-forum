import { beforeEach, describe, expect, it, vi } from "vitest";

import * as postRepository from "../repositories/post.repository";
import * as savedPostRepository from "../repositories/saved-post.repository";

import {
  savePostService,
  unsavePostService,
} from "../services/saved-post.service";

describe("saved-post.service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("savePostService", () => {
    it("creates a save when none exists", async () => {
      vi.spyOn(postRepository, "findPostById").mockResolvedValue({
        id: 1,
      } as any);

      vi.spyOn(savedPostRepository, "findSavedPost").mockResolvedValue(null!);

      const createSpy = vi
        .spyOn(savedPostRepository, "createSavedPost")
        .mockResolvedValue({
          id: 100,
          userId: 1,
          postId: 1,
          createdAt: new Date(),
          deletedAt: null,
        } as any);

      await savePostService(1, 1);

      expect(createSpy).toHaveBeenCalledWith(1, 1);
    });

    it("reactivates a soft deleted save", async () => {
      vi.spyOn(postRepository, "findPostById").mockResolvedValue({
        id: 1,
      } as any);

      vi.spyOn(savedPostRepository, "findSavedPost").mockResolvedValue({
        id: 5,
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        deletedAt: new Date(),
      } as any);

      const reactivateSpy = vi
        .spyOn(savedPostRepository, "reactivateSavedPost")
        .mockResolvedValue({} as any);

      await savePostService(1, 1);

      expect(reactivateSpy).toHaveBeenCalledWith(5);
    });

    it("returns existing save if already active", async () => {
      vi.spyOn(postRepository, "findPostById").mockResolvedValue({
        id: 1,
      } as any);

      const existing = {
        id: 5,
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        deletedAt: null,
      };

      vi.spyOn(savedPostRepository, "findSavedPost").mockResolvedValue(
        existing as any,
      );

      const createSpy = vi.spyOn(savedPostRepository, "createSavedPost");

      const result = await savePostService(1, 1);

      expect(result).toEqual(existing);
      expect(createSpy).not.toHaveBeenCalled();
    });

    it("throws if post does not exist", async () => {
      vi.spyOn(postRepository, "findPostById").mockResolvedValue(null!);

      await expect(savePostService(1, 1)).rejects.toThrow("Post not found");
    });
  });

  describe("unsavePostService", () => {
    it("soft deletes an active save", async () => {
      vi.spyOn(savedPostRepository, "findActiveSavedPost").mockResolvedValue({
        id: 7,
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        deletedAt: null,
      } as any);

      const deleteSpy = vi
        .spyOn(savedPostRepository, "softDeleteSavedPost")
        .mockResolvedValue({} as any);

      await unsavePostService(1, 1);

      expect(deleteSpy).toHaveBeenCalledWith(7);
    });

    it("does nothing if post is not saved", async () => {
      vi.spyOn(savedPostRepository, "findActiveSavedPost").mockResolvedValue(
        null!,
      );

      const deleteSpy = vi.spyOn(savedPostRepository, "softDeleteSavedPost");

      const result = await unsavePostService(1, 1);

      expect(result).toBeUndefined();
      expect(deleteSpy).not.toHaveBeenCalled();
    });
  });
});
