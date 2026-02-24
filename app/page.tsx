"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [anime, setAnime] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/anime")
      .then((res) => {
        setAnime(res.data.data.slice(0, 20));
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredAnime = anime.filter((a) => {
    const matchesSearch = a.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesYear =
      yearFilter === "All" ||
      String(a.year) === yearFilter;

    return matchesSearch && matchesYear;
  });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        🎌 AnimeVerse Pro
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
        />
      </div>

      {/* Year Filter */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "2024", "2023", "2022"].map((year) => (
          <button
            key={year}
            onClick={() => setYearFilter(year)}
            className={`px-4 py-2 rounded-lg ${
              yearFilter === year
                ? "bg-purple-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Anime Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredAnime.map((a) => (
          <div
            key={a.mal_id}
            className="bg-gray-900 p-4 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <img
              src={a.images.jpg.image_url}
              alt={a.title}
              className="rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold">{a.title}</h2>
            <p>⭐ Score: {a.score}</p>
            <p>📅 Year: {a.year || "N/A"}</p>
          </div>
        ))}
      </div>
    </main>
  );
}