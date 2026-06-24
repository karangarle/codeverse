import type { CheatsheetData } from "../model/types";

export const cssCheatsheet: CheatsheetData = {
  category: "CSS",
  title: "CSS Cheat Sheet",
  subtitle:
    "A CSS quick reference for selectors, box model, flexbox, grid, and common properties.",
  sections: [
    {
      id: "selectors",
      title: "Selectors",
      cards: [
        {
          id: "basic-selectors",
          title: "Basic Selectors",
          lang: "css",
          code: `/* Element selector */
h1 { color: blue; }

/* Class selector */
.card { padding: 1rem; }

/* ID selector */
#header { background: #111; }

/* Universal selector */
* { box-sizing: border-box; }

/* Attribute selector */
input[type="text"] { border: 1px solid; }`,
        },
        {
          id: "combinators",
          title: "Combinators",
          lang: "css",
          code: `/* Descendant */
.nav a { color: white; }

/* Direct child */
ul > li { list-style: none; }

/* Adjacent sibling */
h2 + p { margin-top: 0; }

/* General sibling */
h2 ~ p { color: gray; }`,
        },
        {
          id: "pseudo-classes",
          title: "Pseudo-classes",
          lang: "css",
          code: `a:hover   { color: red; }
a:visited { color: purple; }
a:focus   { outline: 2px solid blue; }

li:first-child  { font-weight: bold; }
li:last-child   { margin-bottom: 0; }
li:nth-child(2) { background: #eee; }

input:valid   { border-color: green; }
input:invalid { border-color: red; }`,
        },
      ],
    },
    {
      id: "box-model",
      title: "Box Model",
      cards: [
        {
          id: "box-model-props",
          title: "Box Model",
          lang: "css",
          code: `.box {
    width: 300px;
    height: 200px;
    padding: 20px;         /* inner space */
    border: 2px solid red; /* outline */
    margin: 10px;          /* outer space */
    box-sizing: border-box;/* total = width */
}`,
        },
        {
          id: "display",
          title: "Display",
          lang: "css",
          code: `.block  { display: block; }
.inline { display: inline; }
.flex   { display: flex; }
.grid   { display: grid; }
.hidden { display: none; }
.inline-block { display: inline-block; }`,
        },
        {
          id: "position",
          title: "Position",
          lang: "css",
          code: `.static   { position: static; }
.relative { position: relative; top: 10px; }
.absolute {
  position: absolute;
  top: 0; left: 0;
}
.fixed    { position: fixed; bottom: 0; }
.sticky   { position: sticky; top: 0; }`,
        },
      ],
    },
    {
      id: "flexbox",
      title: "Flexbox",
      cards: [
        {
          id: "flex-container",
          title: "Flex Container",
          lang: "css",
          code: `.container {
  display: flex;
  flex-direction: row;       /* or column */
  justify-content: center;   /* main axis */
  align-items: center;       /* cross axis */
  flex-wrap: wrap;
  gap: 1rem;
}`,
        },
        {
          id: "flex-item",
          title: "Flex Item",
          lang: "css",
          code: `.item {
  flex: 1;           /* grow, shrink, basis */
  flex-grow: 1;      /* take available space */
  flex-shrink: 0;    /* don't shrink */
  flex-basis: 200px; /* initial size */
  align-self: flex-start;
  order: 2;          /* reorder items */
}`,
        },
        {
          id: "justify-content",
          title: "justify-content",
          items: [
            { key: "flex-start", desc: "Items at start of container" },
            { key: "flex-end", desc: "Items at end of container" },
            { key: "center", desc: "Items at center of container" },
            { key: "space-between", desc: "Items with space between" },
            { key: "space-around", desc: "Items with space around" },
            { key: "space-evenly", desc: "Items with equal space" },
          ],
        },
      ],
    },
    {
      id: "grid",
      title: "CSS Grid",
      cards: [
        {
          id: "grid-container",
          title: "Grid Container",
          lang: "css",
          code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
  /* Named areas */
  grid-template-areas:
    "header header header"
    "sidebar main   main"
    "footer footer footer";
}`,
        },
        {
          id: "grid-item",
          title: "Grid Item",
          lang: "css",
          code: `.header { grid-area: header; }
.sidebar {
  grid-column: 1;
  grid-row: 2;
}
.main {
  grid-column: 2 / 4; /* span 2 cols */
  grid-row: 2;
}`,
        },
      ],
    },
  ],
};
