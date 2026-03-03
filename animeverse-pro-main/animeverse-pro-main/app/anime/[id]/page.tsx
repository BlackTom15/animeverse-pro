"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [anime, setAnime] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchTopAnime = async () => {
    const res = await fetch(
      "https://api.jikan.moe/v4/top/anime"
    );
    const data = await res.json();
    setAnime(data.data);
  };

  const searchAnime = async (query: string) => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}`
    );
    const data = await res.json();
    setAnime(data.data);
  };

  useEffect(() => {
    fetchTopAnime();
  }, []);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (search.trim() === "") {
      fetchTopAnime();
    } else {
      searchAnime(search);
    }
  };

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        AnimeVerse
      </h1>

      {/* SEARCH BAR */}
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {anime.map((a: any) => (
          <Link key={a.mal_id} href={`/anime/${a.mal_id}`}>
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
    </main>
  );
}