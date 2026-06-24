// ─── Cheatsheet domain types ─────────────────────────────────────────────────

export interface CheatItem {
  key: string;
  desc: string;
}

export interface CheatCard {
  id: string;
  title: string;
  code?: string;
  lang?: "html" | "js" | "jsx" | "css" | "bash" | "text";
  desc?: string;
  note?: string;
  items?: CheatItem[];
}

export interface CheatSection {
  id: string;
  title: string;
  cards: CheatCard[];
}

export interface CheatsheetData {
  category: string;
  title: string;
  subtitle: string;
  sections: CheatSection[];
}
