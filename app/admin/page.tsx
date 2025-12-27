"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Post } from "@/types";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [message, setMessage] = useState("");
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState("");
  const [uploadedMediaType, setUploadedMediaType] = useState<"image" | "video">(
    "image"
  );

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  const fetchPosts = async () => {
    try {
      console.log("Fetching posts from MongoDB...");
      const response = await fetch("/api/posts");
      const data = await response.json();

      if (data.success) {
        console.log("✅ Posts fetched:", data.data.length);
        setPosts(data.data);
      } else {
        console.error("Error fetching posts:", data.error);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== UPLOAD STARTED ===");

    if (!uploadedMediaUrl) {
      setMessage("Please upload an image or video first");
      return;
    }

    console.log("Media URL:", uploadedMediaUrl);
    setUploading(true);
    setMessage("");

    try {
      console.log("Saving post data to MongoDB...");
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          mediaUrl: uploadedMediaUrl,
          mediaType: uploadedMediaType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ Post saved to MongoDB with ID:", data.data.id);
        setMessage("Post uploaded successfully!");
        setTitle("");
        setDescription("");
        setUploadedMediaUrl("");
        setUploadedMediaType("image");

        console.log("Refreshing posts list...");
        fetchPosts();
        console.log("=== UPLOAD COMPLETE ===");
      } else {
        throw new Error(data.error || "Failed to save post");
      }
    } catch (error: any) {
      console.error("❌ ERROR during upload:", error);
      console.error("Error message:", error.message);
      setMessage(`Error: ${error.message || "Please try again."}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      console.log("Deleting post:", postId);
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ Post deleted");
        setMessage("Post deleted successfully");
        fetchPosts();
      } else {
        throw new Error(data.error || "Failed to delete post");
      }
    } catch (error: any) {
      console.error("Error deleting post:", error);
      setMessage("Error deleting post: " + error.message);
    }
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Upload New Post</h2>

        {message && (
          <div
            className={`mb-4 p-4 rounded ${
              message.includes("Error") || message.includes("Please")
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Enter post description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image or Video
            </label>

            <CldUploadWidget
              uploadPreset="adda_uploads"
              onSuccess={(result: any) => {
                console.log("Upload Success:", result);
                setUploadedMediaUrl(result.info.secure_url);
                setUploadedMediaType(
                  result.info.resource_type === "video" ? "video" : "image"
                );
                setMessage("");
              }}
              onError={(error: any) => {
                console.error("Upload Error:", error);
                setMessage("Error uploading file. Please try again.");
              }}
            >
              {({ open }) => (
                <div>
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-primary-500 transition text-gray-600 hover:text-primary-600"
                  >
                    {uploadedMediaUrl
                      ? "✓ File Uploaded - Click to change"
                      : "Click to upload image or video"}
                  </button>
                  {uploadedMediaUrl && (
                    <div className="mt-4">
                      {uploadedMediaType === "image" ? (
                        <img
                          src={uploadedMediaUrl}
                          alt="Preview"
                          className="max-h-48 rounded"
                        />
                      ) : (
                        <video
                          src={uploadedMediaUrl}
                          controls
                          className="max-h-48 rounded"
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </CldUploadWidget>
          </div>

          <button
            type="submit"
            disabled={uploading || !uploadedMediaUrl}
            className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {uploading ? "Uploading..." : "Upload Post"}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Manage Posts</h2>

        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">
            No posts yet. Upload your first post above!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  {post.mediaType === "image" ? (
                    <Image
                      src={post.mediaUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={post.mediaUrl}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
