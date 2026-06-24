import { htmlCheatsheet } from "./html.cheatsheet";
import { javascriptCheatsheet } from "./javascript.cheatsheet";
import { cssCheatsheet } from "./css.cheatsheet";
import { reactCheatsheet } from "./react.cheatsheet";
import type { CheatsheetData } from "../model/types";

export const CHEATSHEETS: Record<string, CheatsheetData> = {
  HTML: htmlCheatsheet,
  JavaScript: javascriptCheatsheet,
  CSS: cssCheatsheet,
  React: reactCheatsheet,
};
