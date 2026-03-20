import { CardSmall } from "@/components/CardTest";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <div className="relative bg-[url('/kisco.jpg')] bg-center min-h-screen grid justify-center animate-slide-bg">
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>
        <h1 className="relative z-10 text-white text-8xl font-bold text-center mt-8">
          MALINHA PT.2
        </h1>
        <h1 className="relative z-10 text-white text-9xl font-bold text-center">
          FALTAM 121 DIAS
        </h1>
      </div>
      <div className="bg-gray-800 grid grid-cols-3 gap-6 pt-6">
        <CardSmall />
        <CardSmall />
        <CardSmall />
        <CardSmall />
        <CardSmall />
        <CardSmall />
      </div>
    </div>
  );
}
