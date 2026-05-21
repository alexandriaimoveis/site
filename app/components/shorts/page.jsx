"use client";
import Script from "next/script";

export default function Shorts() {
  return (
    <section className="bg-[#1e293b] py-20 border-b border-slate-800/50">
      
      <div className="flex flex-col items-center mb-16 px-4">
        <h2 className="text-4xl font-extrabold text-center text-white tracking-tight">
          Novidades da Alexandria
        </h2>
        <span className="block mt-3 h-1 w-24 bg-[#F29829] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 flex justify-center">
        <figure 
          data-behold-id="9gfERF5n5qQEwDhqwLQX" 
          className="w-full rounded-2xl overflow-hidden shadow-xl"
        ></figure>
      </div>

      <Script 
        src="https://w.behold.so/widget.js" 
        type="module"
        strategy="afterInteractive"
      />
    </section>
  );
}