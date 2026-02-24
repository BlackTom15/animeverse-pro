"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [anime, setAnime] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchAnime = async (pageNumber: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.jikan.moe/v4/top/anime?page=${pageNumber}&limit=25`
      );

      setAnime((prev) => {
        const combined = [...prev, ...res.data.data];

        const unique = combined.filter(
          (item, index, self) =>
            index === self.findIndex((a) => a.mal_id === item.mal_id)
        );

        return unique;
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime(page);
  }, [page]);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        🎌 AnimeVerse Pro
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {anime.map((a) => (
          <Link key={a.mal_id} href={`/anime/${a.mal_id}`}>
            <div className="bg-gray-900 p-4 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer">
              <img
                src={a.images.jpg.image_url}
                alt={a.title}
                className="rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold">{a.title}</h2>
              <p>⭐ Score: {a.score || "N/A"}</p>
              <p>📅 Year: {a.year || "N/A"}</p>
              <p>📺 Status: {a.status}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => setPage(page + 1)}
          className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </main>
  );
}