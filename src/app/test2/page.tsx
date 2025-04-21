import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-[#2d2d3b] to-[#1e1e2f] min-h-screen flex flex-col items-center justify-center text-slate-100 text-center px-6 py-16">
      <div className="max-w-3xl text-center">
        <Image
          src="/gustaw1.jpg"
          alt="Густав – король пушистиков"
          width={250}
          height={250}
          className="mx-auto rounded-full border-4 border-purple-600 shadow-xl transform transition duration-500 hover:scale-110"
        />
        <h1 className="text-5xl md:text-6xl font-bold mt-8 text-shadow-xl text-purple-400">
          Густав — ласковый и пушистый
        </h1>
        <p className="mt-4 text-xl text-slate-300">
          Этот сайт посвящён самому важному существу в этой галактике.
        </p>
        <div className="mt-6">
          <a
            href="#stories"
            className="inline-block px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold transition transform hover:scale-105 shadow-lg"
          >
            Смотреть сторис
          </a>
        </div>
      </div>
    </section>
  );
}
