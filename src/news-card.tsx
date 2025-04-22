// components/NewsCard.tsx
import React, { useState } from "react";

interface NewsCardProps {
  title: string;
  body: string;
  longBody?: string;
  date: string;
}

export default function NewsCard({ title, body, longBody, date }: NewsCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col justify-between h-64 shadow-[0_2px_4px_rgba(0,0,0,0.05)] border-b border-gray-200 px-4 py-4 w-full">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      <div className="flex-1 flex items-center justify-center overflow-hidden h-36">
        <div className="text-sm text-gray-700 overflow-y-auto max-h-24">
          {expanded && longBody ? longBody : body}
        </div>
      </div>

      <div className="relative mt-auto text-xs text-gray-400 h-5">
        <span className="absolute left-0">{date}</span>
        <span
          className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer select-none underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Short" : "Expand"}
        </span>
        <span className="absolute right-0 underline">
          <a className="text-gray-400" href="https://finance.yahoo.com/news/tesla-inc-tsla-ai-vision-171822988.html">Yahoo</a>
        </span>
      </div>
    </div>
  );
}