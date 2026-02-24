"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [anime, setAnime] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchTopAnime = async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${page}`
    );
    const data = await res.json();
    setAnime((prev) => {
  const combined = [...prev, ...data.data];

  const unique = combined.filter(
    (item, index, self) =>
      index ===
      self.findIndex((t) => t.mal_id === item.mal_id)
  );

  return unique;
});
  };

  const searchAnime = async (query: string) => {
    if (!query) return;
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}`
    );
    const data = await res.json();
    setAnime(data.data);
  };

  useEffect(() => {
    if (!search) fetchTopAnime();
  }, [page]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    searchAnime(search);
  };

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        AnimeVerse
      </h1>

      {/* 🔍 SEARCH BAR */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8"
      >
        <input
          type="text"
          placeholder="Search anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-72 text-black rounded-l-lg outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 rounded-r-lg hover:bg-purple-700"
        >
          Search
        </button>
      </form>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {anime.map((a) => (
          <Link key={`${a.mal_id}-${index}`} href={`/anime/${a.mal_id}`}>
            <div className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
              <img
                src={a.images?.jpg?.image_url}
                alt={a.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-3">
                <h2 className="text-sm font-semibold">
                  {a.title}
                </h2>
                <p className="text-yellow-400 text-sm">
                  ⭐ {a.score ?? "N/A"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* LOAD MORE only if not searching */}
      {!search && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-8 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}