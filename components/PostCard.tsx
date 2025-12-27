"use client";

import Image from "next/image";
import { Post } from "@/types";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-64 bg-gray-200">
        {post.mediaType === "image" ? (
          <Image
            src={post.mediaUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <video
            src={post.mediaUrl}
            className="w-full h-full object-cover"
            controls
            preload="metadata"
          />
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>

        <p className="text-sm text-gray-500 mb-4">
          {post.createdAt instanceof Date
            ? post.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Recently posted"}
        </p>

        <p
          className={`text-gray-600 leading-relaxed ${
            !isExpanded && "line-clamp-3"
          }`}
        >
          {post.description}
        </p>

        {post.description.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-600 hover:text-primary-700 font-medium mt-2"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </article>
  );
}
