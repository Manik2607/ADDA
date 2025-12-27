import { Post } from "@/types";
import PostCard from "@/components/PostCard";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getPosts(): Promise<Post[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/posts`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12 py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to ADDA</h1>
        <p className="text-xl mb-2">Akhnoor District Demand Association</p>
        <p className="text-lg opacity-90">
          Your voice for progress and development
        </p>
      </section>

      {/* About Section */}
      <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">About ADDA</h2>
        <p className="text-gray-600 leading-relaxed">
          The Akhnoor District Demand Association (ADDA) is dedicated to
          representing the interests and aspirations of the people of Akhnoor.
          We work tirelessly to advocate for development, infrastructure
          improvements, and better governance in our region. Stay connected with
          us for the latest updates, news, and events.
        </p>
      </section>

      {/* Posts Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Latest Updates
        </h2>

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              No updates available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
