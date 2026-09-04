interface HeroProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

function Hero({
  search,
  onSearchChange,
  onSearch,
}: HeroProps) {
  return (
    <section
  id="discover"
  className="fade-up flex min-h-[80vh] items-center justify-center px-6"
>
      <div className="max-w-4xl text-center">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
          Discover local food
        </p>

        <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
          Find amazing food
          <br />
          <span className="text-orange-500">
            hiding around you.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Discover street food, local stalls, home kitchens and hidden
          food spots near you.
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-3xl border border-gray-200 bg-white p-2 shadow-lg transition-all duration-300 focus-within:border-orange-300 focus-within:shadow-xl sm:flex-row sm:items-center sm:rounded-full">
  <div className="flex flex-1 items-center">
    <span className="pl-4 text-xl">🔍</span>

    <input
      type="text"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch();
        }
      }}
      placeholder="Search for food, vendors or cravings..."
      className="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-gray-400"
    />

    {search && (
      <button
        type="button"
        onClick={() => onSearchChange("")}
        className="mr-2 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        aria-label="Clear search"
      >
        ×
      </button>
    )}
  </div>

  <button
    onClick={onSearch}
    className="w-full rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-md active:scale-95 sm:w-auto"
  >
    Search
  </button>
</div>

      </div>
    </section>
  );
}

export default Hero;