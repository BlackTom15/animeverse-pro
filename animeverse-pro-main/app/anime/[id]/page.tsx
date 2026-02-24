async function getAnime(id: string) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.data;
}

export default async function AnimeDetail({
  params,
}: {
  params: { id: string };
}) {
  const anime = await getAnime(params.id);

  return (
    <main className="bg-black min-h-screen text-white p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {anime.title}
          </h1>

          <p className="text-yellow-400 mb-2">
            ⭐ Score: {anime.score ?? "N/A"}
          </p>

          <p className="text-gray-300 mb-4">
            {anime.synopsis}
          </p>

          <p>
            <strong>Episodes:</strong> {anime.episodes ?? "N/A"}
          </p>

          <p>
            <strong>Status:</strong> {anime.status}
          </p>

          <p>
            <strong>Year:</strong> {anime.year ?? "N/A"}
          </p>
        </div>
      </div>
    </main>
  );
}