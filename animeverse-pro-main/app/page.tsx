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
  <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">

    {/* HERO SECTION */}
    <div className="h-[60vh] flex items-center justify-center bg-[url('https://images.alphacoders.com/736/736461.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <h1 className="relative text-5xl md:text-7xl font-bold text-purple-500">
        AnimeVerse
      </h1>
    </div>

    {/* GRID SECTION */}
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-6">🔥 Top Anime</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {anime.map((a) => (
          <Link key={a.mal_id} href={`/anime/${a.mal_id}`}>
            <div className="group relative cursor-pointer">

              <img
                src={a.images.jpg.image_url}
                alt={a.title}
                className="rounded-lg transform group-hover:scale-110 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4 rounded-lg">
                <h3 className="text-lg font-bold">{a.title}</h3>
                <p className="text-sm">⭐ {a.score}</p>
              </div>

            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => setPage(page + 1)}
          className="px-8 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          Load More
        </button>
      </div>

    </div>
  </main>
);
}