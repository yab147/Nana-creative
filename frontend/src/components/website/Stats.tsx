
const stats = [
  { value: "50+", label: "Projects Completed", icon: "▱" },
  { value: "30+", label: "Happy Clients", icon: "☺" },
  { value: "5+", label: "Years of Experience", icon: "♜" },
  { value: "100%", label: "Passion & Dedication", icon: "✎" },
];

export default function Stats() {
  return (
    <section className="relative  mx-auto  max-w-6xl px-6 pb-12">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white bg-white/90 p-8 shadow-xl shadow-gray-200/60 backdrop-blur-xl md:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 border-gray-200 md:border-r md:last:border-r-0"
          >
            <span className="text-4xl text-brand-primary">
              {stat.icon}
            </span>

            <div>
              <h3 className="text-3xl font-bold text-[#14221B]">
                {stat.value}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {stat.label}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
