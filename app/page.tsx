"use client";

import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const heroImages = [
    "https://www.dailyexcelsior.com/wp-content/uploads/2022/02/1-13.jpg",
    "/assets/HeroImage.png",
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts", { cache: "no-store" });
        const data = await response.json();
        setPosts(data.success ? data.data : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-[500px] overflow-hidden bg-navy-900">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to ADDA
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-semibold text-primary-400">
              Akhnoor District Demand Association
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
              Your voice for progress, development, and prosperity in Akhnoor
            </p>
            <div className="flex gap-4">
              <Link
                href="/about"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition"
              >
                Learn More
              </Link>
              <Link
                href="/about#join-the-movement"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/50 px-8 py-3 rounded-lg font-semibold transition"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImage
                  ? "bg-primary-600 w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📢</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Latest Updates</div>
                <div className="text-sm text-primary-100">Stay informed</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Community Voice</div>
                <div className="text-sm text-primary-100">
                  Your concerns matter
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Development</div>
                <div className="text-sm text-primary-100">
                  Progress together
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* About Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-6 text-navy-800">
                  About ADDA
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  The Akhnoor District Demand Association (ADDA) is dedicated to
                  representing the interests and aspirations of the people of
                  Akhnoor.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We work tirelessly to advocate for development, infrastructure
                  improvements, and better governance in our region. Stay
                  connected with us for the latest updates, news, and events.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-2xl font-bold text-navy-800 mb-2">
                    Serving Akhnoor
                  </h3>
                  <p className="text-gray-600">Building a better tomorrow</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-navy-800">Latest Updates</h2>
            <div className="h-1 flex-1 ml-8 bg-gradient-to-r from-primary-600 to-transparent rounded" />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading updates...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-16 text-center">
              <div className="text-6xl mb-4">📰</div>
              <p className="text-gray-500 text-xl">
                No updates available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
