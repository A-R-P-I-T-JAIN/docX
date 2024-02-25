"use client";
import { useRouter } from "next/navigation";
import "./style.css";
import { useEffect, useState } from "react";
export default function Home() {

  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center">
      <div className="main flex flex-col items-center justify-center w-full h-[90vh] md:h-screen gap-4">
        <div className="w-[90%] md:w-[80%]">
          <h1 className="text-6xl md:text-9xl text-center md:text-left font-bold bg-gradient-to-r from-[#87d3e7]  to-[#268aec] text-transparent bg-clip-text">
            Elevate your
          </h1>
        </div>
        <div className="w-[80%]">
          <h1 className="text-6xl md:text-9xl text-center md:text-right font-bold bg-gradient-to-r from-[#87d3e7]  to-[#268aec] text-transparent bg-clip-text">
            documents
          </h1>
        </div>
        <div className="min-w-[80%]">
          <h1 className="text-4xl md:text-9xl text-center md:text-right font-bold bg-gradient-to-r from-[#87d3e7]  to-[#268aec] text-transparent bg-clip-text">
            through collaboration
          </h1>
        </div>
        <div className="w-[80%] flex items-center gap-2 flex-wrap">
          <div className="round"></div>
          <div className="round"></div>
          <div className="round bg-red-200"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round bg-green-400"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round bg-amber-200"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round bg-pink-400"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
          <div className="round"></div>
        </div>
      </div>
      <div className="main2 w-[90%] md:w-[80%] flex flex-col md:flex-row items-center justify-between">
        <h1 className="w-[90%] md:w-[40%] text-5xl md:text-7xl text-white text-center md:text-left">
          Seamless collaboration, from anywhere
        </h1>
        <iframe
          width={isMobile?300:600}
          height={isMobile?300:600}
          src="https://lottie.host/embed/1b6b5de8-342f-400e-9651-d538d672f69c/yAlCmT0G0Y.json"
        ></iframe>
      </div>
      <div className="main2 w-[90%] md:w-[80%] flex flex-col-reverse pt-20 md:flex-row items-center justify-between">
        <iframe
          width={isMobile?300:500}
          height={isMobile?300:500}
          src="https://lottie.host/embed/555f627d-55e4-4086-9768-ba3e8647e511/9H0QXELsKV.json"
        ></iframe>
        <h1 className="w-[90%] md:w-[40%] text-5xl md:text-7xl text-white text-center md:text-left">
          Write faster with quill integration
        </h1>
      </div>
      <div className="w-[90%] md:w-[80%] flex flex-col items-center gap-5 py-40">
        <h1 className="text-white text-4xl md:text-5xl text-center">
          Collaborate from anywhere, on any device
        </h1>
        <h2 className="text-2xl md:text-3xl text-slate-300 text-center">
          Access, create, and edit your documents wherever you are — from any
          mobile device, tablet, or computer
        </h2>
        <button
          type="button"
          className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-teal-900 dark:text-teal-500 dark:hover:text-teal-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 rounded-[10px]"
          onClick={() => router.push("/document")}
        >
          Create your first DocX
        </button>
      </div>
      <div className="w-screen h-12 bg-slate-600 text-white flex items-center justify-center" >
        CopyRight 2024 @Arpit Jain
      </div>
    </div>
  );
}
