"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [anime, setAnime] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAnime = async () => {
      const res = await fetch(
        `https://api.jikan.moe/v4/top/anime?page=${page}`
      );
      const data = await res.json();
      setAnime((prev) => [...prev, ...data.data]);
    };

    fetchAnime();
  }, [page]);

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        AnimeVerse
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {anime.map((a, index) => (
          <Link
            key={index}
            href={`/anime/${a.mal_id}`}
          >
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

      <div className="flex justify-center mt-10">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-8 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          Load More
        </button>
      </div>
    </main>
  );
}