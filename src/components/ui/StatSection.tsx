export default function StatsSection() {
  const stats = [
    {
      value: "₦150M",
      label: "Tax Value Filed",
      bg: "bg-[#00C7BE]",
    },
    {
      value: "250",
      label: "Active Audience",
      bg: "bg-[#FF9500]",
    },
    {
      value: "145K",
      label: "Returns Filed",
      bg: "bg-[#32ADE6]",
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} text-white flex flex-col items-center justify-center py-8`}
          >
            <h2 className="text-4xl md:text-6xl lg:text-6xl font-semibold">
              {item.value}
            </h2>

            <p className="mt-3 text-sm md:text-base opacity-90">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
