"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function ShareButtons({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-10 flex gap-3 flex-wrap">

      {/* WHATSAPP */}
      <a
        href={`https://wa.me/?text=${url}`}
        target="_blank"
        className="px-4 py-2 text-sm rounded-full bg-green-500 text-white hover:opacity-90 transition"
      >
        WhatsApp
      </a>

      {/* TWITTER */}
      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        className="px-4 py-2 text-sm rounded-full bg-black text-white hover:opacity-90 transition"
      >
        Twitter
      </a>

      {/* COPY */}
      <button
        onClick={handleCopy}
        className="px-4 py-2 text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center gap-2"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied" : "Copy Link"}
      </button>

    </div>
  );
}