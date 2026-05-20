"use client";
import Script from "next/script";

export default function Shorts() {
  return (
    <section className="bg-[#F2C894] py-12">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-bold text-center">Novidades da Alexandria</h2>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 flex justify-center">
        <figure 
          data-behold-id="9gfERF5n5qQEwDhqwLQX" 
          className="w-full"
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