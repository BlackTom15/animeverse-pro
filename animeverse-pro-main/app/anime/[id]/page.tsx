async function getAnime(id: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.data;
}

export default async function AnimeDetail(props: any) {
  const { id } = await props.params;   // 🔥 THIS IS THE FIX

  const anime = await getAnime(id);

  if (!anime) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        Anime not found
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <img
          src={anime.images?.jpg?.image_url}
          alt={anime.title}
          className="rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {anime.title}
          </h1>

          <p className="text-yellow-400 mb-2">
            ⭐ {anime.score ?? "N/A"}
          </p>

          <p className="text-gray-300 mb-4">
            {anime.synopsis ?? "No description"}
          </p>

          <p>
            <strong>Episodes:</strong>{" "}
            {anime.episodes ?? "N/A"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {anime.status ?? "N/A"}
          </p>

          <p>
            <strong>Year:</strong>{" "}
            {anime.year ?? "N/A"}
          </p>
        </div>
      </div>
    </main>
  );
}