"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [anime, setAnime] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/anime")
      .then((res) => {
        setAnime(res.data.data.slice(0, 12));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        🎌 AnimeVerse Pro
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {anime.map((a) => (
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