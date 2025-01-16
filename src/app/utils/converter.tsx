/**
 * Hàm chuyển đổi tên tiếng Việt sang Katakana và Romaji
 * @param name Tên tiếng Việt
 * @returns Object chứa tên gốc, Katakana, và cách đọc Romaji
 */
export const convertName = (name: string) => {
  // Chuẩn hóa: loại bỏ dấu tiếng Việt
  const normalized = removeVietnameseAccents(name);

  // Chuyển đổi tên thành các phần (first name, middle name, last name)
  const nameParts = normalized.split(" ");

  const katakanaParts: string[] = [];
  const romajiParts: string[] = [];

  // Chuyển từng phần tên sang Katakana và Romaji
  nameParts.forEach(part => {
    const katakana = convertToKatakana(part);
    const romaji = convertToRomaji(part);

    katakanaParts.push(katakana);
    romajiParts.push(romaji);
  });

  // Ghép kết quả lại
  const katakana = katakanaParts.join("・");
  const romaji = romajiParts.join("/");

  return {
    original: name,
    katakana,
    romaji,
  };
};

/**
 * Loại bỏ dấu tiếng Việt khỏi chuỗi
 * @param text Chuỗi tiếng Việt
 * @returns Chuỗi không dấu
 */
const removeVietnameseAccents = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

/**
 * Chuyển đổi một từ sang Katakana
 * @param word Từ cần chuyển đổi
 * @returns Katakana tương ứng
 */
const convertToKatakana = (word: string) => {
  // Mẫu chuyển từ tiếng Việt sang Katakana
  const katakanaMap: { [key: string]: string } = {
    "a": "ア", "b": "ビ", "c": "シ", "d": "ディ", "e": "エ", "f": "エフ", "g": "ジ", 
    "h": "エイチ", "i": "イ", "j": "ジェイ", "k": "ケイ", "l": "エル", "m": "エム", 
    "n": "エヌ", "o": "オ", "p": "ピー", "q": "キュー", "r": "アール", "s": "エス", 
    "t": "ティ", "u": "ウ", "v": "ヴイ", "w": "ダブリュー", "x": "エックス", "y": "ワイ", 
    "z": "ゼット", 
    // Thêm các trường hợp phổ biến khác
  };

  // Chuyển đổi từng chữ cái sang Katakana
  return word.split('').map(char => katakanaMap[char.toLowerCase()] || char).join('');
};

/**
 * Chuyển đổi một từ sang Romaji
 * @param word Từ cần chuyển đổi
 * @returns Romaji tương ứng
 */
const convertToRomaji = (word: string) => {
  // Chuyển đổi các từ tiếng Việt thành Romaji
  const romajiMap: { [key: string]: string } = {
    "a": "a", "b": "b", "c": "c", "d": "d", "e": "e", "f": "f", "g": "g", 
    "h": "h", "i": "i", "j": "j", "k": "k", "l": "l", "m": "m", "n": "n", 
    "o": "o", "p": "p", "q": "q", "r": "r", "s": "s", "t": "t", "u": "u", 
    "v": "v", "w": "w", "x": "x", "y": "y", "z": "z", 
    // Cần bổ sung các quy tắc chuyển từ tiếng Việt sang Romaji
  };

  return word.split('').map(char => romajiMap[char.toLowerCase()] || char).join('');
};
