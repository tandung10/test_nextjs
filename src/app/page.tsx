'use client';

import React, { useState } from "react";
import { convertName } from "../app/utils/converter";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{
    original: string;
    katakana: string;
    romaji: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    if (name.trim()) {
      try {
        const converted = convertName(name.trim());
        setResult(converted);
        setError(null);
      } catch {       
        setError("Có lỗi xảy ra trong quá trình chuyển đổi.");
        setResult(null);
      }
    } else {
      setError("Vui lòng nhập tên.");
      setResult(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chuyển đổi Tên sang Katakana và Romaji</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập tên tiếng Việt"
        style={{ padding: "10px", width: "300px" }}
      />
      <button onClick={handleConvert} style={{ padding: "10px 20px", marginLeft: "10px" }}>
        Chuyển đổi
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Kết quả:</h2>
          <p><strong>Tên:</strong> {result.original}</p>
          <p><strong>Katakana:</strong> {result.katakana}</p>
          <p><strong>Cách đọc:</strong> {result.romaji}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
