import HeroSlider from "@/components/hero-slider";
import ArticleGrid from "@/components/article-grid";
import Sidebar from "@/components/sidebar";
import { getPosts, authors } from "@/lib/data";

export default async function HomePage() {
  const posts = await getPosts();
  const authorsById = Object.fromEntries(authors.map((a) => [a.id, a]));
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      <HeroSlider posts={featured.length ? featured : posts.slice(0, 3)} authorsById={authorsById} />

      <section id="latest" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-display text-2xl text-ink">Latest stories</h2>
              <span className="text-sm text-ink-faint">{rest.length} articles</span>
            </div>
            <ArticleGrid posts={rest} authorsById={authorsById} />
          </div>

          <Sidebar recentPosts={posts} authorsById={authorsById} />
        </div>
      </section>
    </>
  );
}
