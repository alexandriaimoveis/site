const shortsIds = [
  "PVoQZhnyxiE",
  "r84Y9rwDIO4",
  "_8TSat-pDkc",
  "uDqoKTeMIjY",
  "eY1adWgMt6k",
  "7eqX3Rz1zQE",
];

export default function Shorts() {
  return (
    <section className="relative z-20 mt-[-40px] flex flex-wrap justify-center gap-4 px-4">
      {shortsIds.map((id, index) => (
        <div
          key={`${id}-${index}`}
          className="w-48 h-80 flex-shrink-0 aspect-[9/16]"
        >
          <iframe
            className="w-full h-full rounded-2xl shadow-2xl border-4 border-white/80 hover:border-white transition-all duration-300"
            src={`https://www.youtube.com/embed/${id}?rel=0&playsinline=1`}
            title={`YouTube Shorts ${index + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </section>
  );
}
