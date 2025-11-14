import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClientLayout from "./components/ClientLayout";

export default function Home() {
  return (
    <ClientLayout>
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full h-full">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side - Hero Image */}
            <div className="relative w-full h-full" style={{ flex: "2.5" }}>
              <Image
                src={"/heroImage.jpeg"}
                alt={"Woman doing pilates workout"}
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 80%" }}
                fill
              />

              {/* Carousel dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <div className="w-3 h-3 rounded-full bg-white/50"></div>
                <div className="w-3 h-3 rounded-full bg-white/50"></div>
                <div className="w-3 h-3 rounded-full bg-white/50"></div>
              </div>
            </div>

            {/* Right side - Content */}
            <div
              className="flex items-center px-8 md:px-12 lg:px-16 bg-white w-full"
              style={{ flex: "1.5" }}
            >
              <div className="max-w-xl space-y-10">
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight tracking-tight">
                    Твій перший крок
                    <br />у контент
                  </h1>
                </div>
                <Link
                  className="w-full max-w-sm bg-custom-sage hover:bg-[#b8a390] text-white font-medium py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                  href={"/client/quiz"}
                >
                  <span className="text-base">Почати навчання</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
