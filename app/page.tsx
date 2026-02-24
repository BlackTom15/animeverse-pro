export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        🎌 AnimeVerse Pro
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Attack on Titan</h2>
          <p className="mt-2">Year: 2023</p>
          <p>⭐ IMDb: 9.1</p>
          <p>🍅 Rotten Tomatoes: 95%</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Demon Slayer</h2>
          <p className="mt-2">Year: 2022</p>
          <p>⭐ IMDb: 8.7</p>
          <p>🍅 Rotten Tomatoes: 98%</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Jujutsu Kaisen</h2>
          <p className="mt-2">Year: 2021</p>
          <p>⭐ IMDb: 8.6</p>
          <p>🍅 Rotten Tomatoes: 94%</p>
        </div>
      </div>
    </main>
  );
}