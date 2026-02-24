"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.jikan.moe/v4/anime/${id}`)
        .then((res) => setAnime(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!anime) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <Link href="/" className="text-purple-400 underline">
        ⬅ Back to Home
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
          <p className="mb-2">⭐ Score: {anime.score}</p>
          <p className="mb-2">📺 Episodes: {anime.episodes}</p>
          <p className="mb-2">📅 Year: {anime.year}</p>
          <p className="mb-2">
            🎭 Genres:{" "}
            {anime.genres?.map((g: any) => g.name).join(", ")}
          </p>
          <p className="mt-4 text-gray-300">{anime.synopsis}</p>
        </div>
      </div>
    </main>
  );
}