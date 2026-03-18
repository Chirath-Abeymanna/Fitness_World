"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBox({
  placeholder = "Enter your placeholder",
  onSearch,
}: SearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch?.(val);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleClear();
  };

  return (
    <div
      className={`flex items-center gap-3 bg-transparent border-b px-4 py-3 w-full max-w-sm transition-colors duration-200 ${
        isFocused ? "border-[#D5A310]" : "border-white/20"
      }`}
    >
      <Search
        size={16}
        className={`shrink-0 transition-colors duration-200 ${
          isFocused ? "text-[#D5A310]" : "text-white/40"
        }`}
      />
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="bg-transparent text-white text-sm placeholder:text-white/40 outline-none w-full"
      />
      {query.length > 0 && (
        <button
          onClick={handleClear}
          className="shrink-0 text-white/30 hover:text-white/70 transition-colors duration-150"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
