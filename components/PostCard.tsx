"use client";

import Image from "next/image";
import { Post } from "@/types";
import { useState } from "react";

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <article className="w-full bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 mb-8">
      <div
        className={`grid md:grid-cols-2 gap-0 ${isEven ? "" : "md:grid-flow-dense"}`}
      >
        {/* Media Section */}
        <div
          className={`relative w-full h-[400px] md:h-[500px] bg-gray-200 ${isEven ? "" : "md:col-start-2"}`}
        >
          {post.mediaType === "image" ? (
            <Image
              src={post.mediaUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
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

        {/* Content Section */}
        <div
          className={`p-8 md:p-12 flex flex-col justify-center ${isEven ? "" : "md:col-start-1 md:row-start-1"}`}
        >
          <p className="text-sm text-primary-600 font-semibold mb-3 uppercase tracking-wider">
            {post.createdAt instanceof Date
              ? post.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Recently posted"}
          </p>

          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
            {post.title}
          </h3>

          <p
            className={`text-gray-700 text-lg leading-relaxed ${
              !isExpanded && "line-clamp-6"
            }`}
          >
            {post.description}
          </p>

          {post.description.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700 font-semibold mt-6 inline-flex items-center gap-2 transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Read less</span>
                  <span className="text-xl">↑</span>
                </>
              ) : (
                <>
                  <span>Read more</span>
                  <span className="text-xl">→</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
