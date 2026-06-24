import type { CheatsheetData } from "../model/types";

export const htmlCheatsheet: CheatsheetData = {
  category: "HTML",
  title: "HTML Cheat Sheet",
  subtitle:
    "This HTML quick reference cheat sheet lists the common HTML and HTML5 tags in readable layout.",
  sections: [
    // ── Getting Started ──────────────────────────────────────────────────
    {
      id: "getting-started",
      title: "Getting Started",
      cards: [
        {
          id: "boilerplate",
          title: "hello.html",
          lang: "html",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible"
          content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>HTML5 Boilerplate</title>
</head>
<body>
    <h1>Hello world, hello QuickRef.ME!</h1>
</body>
</html>`,
        },
        {
          id: "comment",
          title: "Comment",
          lang: "html",
          code: `<!-- this is a comment -->

<!--
    Or you can comment out a
    large number of lines.
-->`,
        },
        {
          id: "paragraph",
          title: "Paragraph",
          lang: "html",
          code: `<p>I'm from QuickRef.ME</p>
<p>Share quick reference cheat sheet.</p>`,
        },
        {
          id: "html-link",
          title: "HTML link",
          lang: "html",
          code: `<a href="https://quickref.me">QuickRef</a>
<a href="mailto:jack@abc.com">Email</a>
<a href="tel:+12345678">Call</a>
<a href="sms:+12345678&body=ha%20ha">Msg</a>`,
          items: [
            { key: "href", desc: "The URL that the hyperlink points to" },
            { key: "rel", desc: "Relationship of the linked URL" },
            {
              key: "target",
              desc: "Link target location: _self, _blank, _top, _parent",
            },
          ],
        },
        {
          id: "image",
          title: "Image Tag",
          lang: "html",
          code: `<img loading="lazy"
    src="https://xxx.png"
    alt="Describe image here"
    width="400"
    height="400">`,
          items: [
            { key: "src", desc: "Required, Image location (URL | Path)" },
            { key: "alt", desc: "Describe of the image" },
            { key: "width", desc: "Width of the image" },
            { key: "height", desc: "Height of the image" },
            { key: "loading", desc: "How the browser should load" },
          ],
        },
        {
          id: "text-formatting",
          title: "Text Formatting Tags",
          lang: "html",
          code: `<b>Bold Text</b>
<strong>This text is important</strong>
<i>Italic Text</i>
<em>This text is emphasized</em>
<u>Underline Text</u>
<pre>Pre-formatted Text</pre>
<code>Source code</code>
<del>Deleted text</del>
<mark>Highlighted text (HTML5)</mark>
<ins>Inserted text</ins>
<sup>Makes text superscripted</sup>
<sub>Makes text subscripted</sub>
<small>Makes text smaller</small>
<kbd>Ctrl</kbd>
<blockquote>Text Block Quote</blockquote>`,
        },
        {
          id: "headings",
          title: "Headings",
          lang: "html",
          code: `<h1> This is Heading 1 </h1>
<h2> This is Heading 2 </h2>
<h3> This is Heading 3 </h3>
<h4> This is Heading 4 </h4>
<h5> This is Heading 5 </h5>
<h6> This is Heading 6 </h6>`,
          note: "You should only have one h1 on your page",
        },
        {
          id: "section-divs",
          title: "Section Divisions",
          desc: "These are the tags used to divide your page up into sections",
          items: [
            { key: "<div></div>", desc: "Division or Section of Page Content" },
            { key: "<span></span>", desc: "Section of text within other content" },
            { key: "<p></p>", desc: "Paragraph of Text" },
            { key: "<br>", desc: "Line Break" },
            { key: "<hr>", desc: "Basic Horizontal Line" },
          ],
        },
        {
          id: "js-in-html",
          title: "JavaScript in HTML",
          lang: "html",
          code: `<script type="text/javascript">
    let text = "Hello QuickRef.ME";
    alert(text);
</script>`,
        },
        {
          id: "ext-js",
          title: "External JavaScript",
          lang: "html",
          code: `<body>
    ...
    <script src="app.js"></script>
</body>`,
        },
        {
          id: "css-in-html",
          title: "CSS in HTML",
          lang: "html",
          code: `<style type="text/css">
    h1 {
        color: purple;
    }
</style>`,
        },
        {
          id: "ext-css",
          title: "External Stylesheet",
          lang: "html",
          code: `<head>
...
<link rel="stylesheet" href="style.css"/>
</head>`,
        },
        {
          id: "iframe",
          title: "Inline Frame",
          lang: "html",
          code: `<iframe title="New York"
    width="342"
    height="306"
    id="gmap_canvas"
    src="https://maps.google.com/maps?q=..."
    scrolling="no">
</iframe>`,
        },
      ],
    },

    // ── HTML5 Tags ───────────────────────────────────────────────────────
    {
      id: "html5-tags",
      title: "HTML5 Tags",
      cards: [
        {
          id: "document",
          title: "Document",
          lang: "html",
          code: `<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <h1>QuickRef.ME</h1>
  </main>
  <footer>
    <p>©2023 QuickRef.ME</p>
  </footer>
</body>`,
        },
        {
          id: "header-nav",
          title: "Header Navigation",
          lang: "html",
          code: `<header>
  <nav>
    <ul>
      <li><a href="#">Edit Page</a></li>
      <li><a href="#">Twitter</a></li>
      <li><a href="#">Facebook</a></li>
    </ul>
  </nav>
</header>`,
        },
        {
          id: "html5-tags-table",
          title: "HTML5 Tags",
          items: [
            { key: "article", desc: "Content that's independent" },
            { key: "aside", desc: "Secondary content" },
            { key: "audio", desc: "Embeds a sound, or an audio stream" },
            { key: "canvas", desc: "Draw graphics via JavaScript" },
            { key: "data", desc: "Machine readable content" },
            { key: "datalist", desc: "A set of pre-defined options" },
            { key: "details", desc: "Additional information" },
            { key: "dialog", desc: "A dialog box or sub-window" },
            { key: "embed", desc: "Embeds external application" },
            { key: "figcaption", desc: "A caption or legend for a figure" },
            { key: "figure", desc: "A figure illustrated" },
            { key: "footer", desc: "Footer or least important" },
            { key: "header", desc: "Masthead or important information" },
            { key: "main", desc: "The main content of the document" },
            { key: "mark", desc: "Text highlighted" },
            { key: "nav", desc: "A section of navigation links" },
            { key: "output", desc: "The result of a calculation" },
            { key: "progress", desc: "The completion progress of a task" },
            { key: "section", desc: "A group in a series of related content" },
            { key: "summary", desc: "A summary for the <details> element" },
            { key: "time", desc: "A time or date" },
            { key: "video", desc: "Embeds video" },
            { key: "wbr", desc: "A line break opportunity" },
          ],
        },
        {
          id: "html5-video",
          title: "HTML5 Video",
          lang: "html",
          code: `<video controls="" width="100%">
    <source
        src="https://example.com/flower.mp4"
        type="video/mp4">
    Sorry, your browser doesn't support
    embedded videos.
</video>`,
        },
        {
          id: "html5-audio",
          title: "HTML5 Audio",
          lang: "html",
          code: `<audio controls
    src="https://example.com/t-rex-roar.mp3">
    Your browser does not support
    the audio element.
</audio>`,
        },
        {
          id: "html5-ruby",
          title: "HTML5 Ruby",
          lang: "html",
          code: `<ruby>
  汉 <rp>(</rp><rt>hàn</rt><rp>)</rp>
  字 <rp>(</rp><rt>zì</rt><rp>)</rp>
</ruby>`,
        },
        {
          id: "html5-progress",
          title: "HTML5 progress",
          lang: "html",
          code: `<progress value="50" max="100"></progress>`,
        },
        {
          id: "html5-mark",
          title: "HTML5 mark",
          lang: "html",
          code: `<p>I Love <mark>QuickRef.ME</mark></p>`,
        },
      ],
    },

    // ── HTML Tables ──────────────────────────────────────────────────────
    {
      id: "tables",
      title: "HTML Tables",
      cards: [
        {
          id: "table-example",
          title: "Table Example",
          lang: "html",
          code: `<table>
    <thead>
        <tr>
            <td>name</td>
            <td>age</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Roberta</td>
            <td>39</td>
        </tr>
        <tr>
            <td>Oliver</td>
            <td>25</td>
        </tr>
    </tbody>
</table>`,
        },
        {
          id: "table-tags",
          title: "HTML Table Tags",
          items: [
            { key: "<table>", desc: "Defines a table" },
            { key: "<th>", desc: "Defines a header cell in a table" },
            { key: "<tr>", desc: "Defines a row in a table" },
            { key: "<td>", desc: "Defines a cell in a table" },
            { key: "<caption>", desc: "Defines a table caption" },
            { key: "<colgroup>", desc: "Defines a group of columns" },
            { key: "<col>", desc: "Defines a column within a table" },
            { key: "<thead>", desc: "Groups the header content" },
            { key: "<tbody>", desc: "Groups the body content" },
            { key: "<tfoot>", desc: "Groups the footer content" },
          ],
        },
        {
          id: "td-attrs",
          title: "<td> Attributes",
          items: [
            { key: "colspan", desc: "Number of columns a cell should span" },
            { key: "headers", desc: "One or more header cells a cell is related to" },
            { key: "rowspan", desc: "Number of rows a cell should span" },
          ],
        },
        {
          id: "th-attrs",
          title: "<th> Attributes",
          items: [
            { key: "colspan", desc: "Number of columns a cell should span" },
            { key: "headers", desc: "One or more header cells a cell is related to" },
            { key: "rowspan", desc: "Number of rows a cell should span" },
            { key: "abbr", desc: "Description of the cell's content" },
            { key: "scope", desc: "The header element relates to" },
          ],
        },
      ],
    },

    // ── HTML Lists ───────────────────────────────────────────────────────
    {
      id: "lists",
      title: "HTML Lists",
      cards: [
        {
          id: "unordered",
          title: "Unordered list",
          lang: "html",
          code: `<ul>
    <li>I'm an item</li>
    <li>I'm another item</li>
    <li>I'm another item</li>
</ul>`,
        },
        {
          id: "ordered",
          title: "Ordered list",
          lang: "html",
          code: `<ol>
    <li>I'm the first item</li>
    <li>I'm the second item</li>
    <li>I'm the third item</li>
</ol>`,
        },
        {
          id: "definition",
          title: "Definition list",
          lang: "html",
          code: `<dl>
    <dt>A Term</dt>
    <dd>Definition of a term</dd>
    <dt>Another Term</dt>
    <dd>Definition of another term</dd>
</dl>`,
        },
      ],
    },

    // ── HTML Forms ───────────────────────────────────────────────────────
    {
      id: "forms",
      title: "HTML Forms",
      cards: [
        {
          id: "form-tags",
          title: "Form tags",
          lang: "html",
          code: `<form method="POST" action="api/login">
  <label for="mail">Email: </label>
  <input type="email" id="mail" name="mail">
  <br/>
  <label for="pw">Password: </label>
  <input type="password" id="pw" name="pw">
  <br/>
  <input type="submit" value="Login">
  <br/>
  <input type="checkbox" id="ck" name="ck">
  <label for="ck">Remember me</label>
</form>`,
        },
        {
          id: "form-attrs",
          title: "Form Attribute",
          items: [
            { key: "name", desc: "Name of form for scripting" },
            { key: "action", desc: "URL of form script" },
            { key: "method", desc: "HTTP method, POST / GET (default)" },
            { key: "enctype", desc: "Media type, See enctype" },
            { key: "onsubmit", desc: "Runs when the form was submit" },
            { key: "onreset", desc: "Runs when the form was reset" },
          ],
        },
        {
          id: "label",
          title: "Label tags",
          lang: "html",
          code: `<!-- Nested label -->
<label>Click me
  <input type="text" id="user" name="name"/>
</label>

<!-- 'for' attribute -->
<label for="user">Click me</label>
<input id="user" type="text" name="name"/>`,
          note: "for in a label references an input's id attribute",
        },
        {
          id: "radio",
          title: "Radio Buttons",
          lang: "html",
          code: `<input type="radio" name="gender" id="m">
<label for="m">Male</label>
<input type="radio" name="gender" id="f">
<label for="f">Female</label>`,
          note: "Radio buttons are used to let the user select exactly one",
        },
        {
          id: "checkbox",
          title: "Checkboxes",
          lang: "html",
          code: `<input type="checkbox" name="s" id="soc">
<label for="soc">Soccer</label>
<input type="checkbox" name="s" id="bas">
<label for="bas">Baseball</label>`,
          note: "Checkboxes allows the user to select one or more",
        },
        {
          id: "select",
          title: "Select tags",
          lang: "html",
          code: `<label for="city">City:</label>
<select name="city" id="city">
    <option value="1">Sydney</option>
    <option value="2">Melbourne</option>
    <option value="3">Cromwell</option>
</select>`,
          note: "A select box is a dropdown list of options",
        },
        {
          id: "textarea",
          title: "Textarea tags",
          lang: "html",
          code: `<textarea rows="2" cols="30"
    name="address"
    id="address">
</textarea>`,
          note: "Textarea is a multiple-line text input control",
        },
        {
          id: "fieldset",
          title: "Fieldset tags",
          lang: "html",
          code: `<fieldset>
    <legend>Your favorite monster</legend>
    <input type="radio" id="kra" name="m">
    <label for="kraken">Kraken</label><br/>
    <input type="radio" id="sas" name="m">
    <label for="sas">Sasquatch</label>
</fieldset>`,
        },
        {
          id: "submit-reset",
          title: "Submit and Reset Buttons",
          lang: "html",
          code: `<form action="register.php" method="post">
  <label for="foo">Name:</label>
  <input type="text" name="name" id="foo">
  <input type="submit" value="Submit">
  <input type="reset" value="Reset">
</form>`,
          note: "Submit the data to server; Reset to default values",
        },
      ],
    },

    // ── HTML input Tags ──────────────────────────────────────────────────
    {
      id: "input-tags",
      title: "HTML input Tags",
      cards: [
        {
          id: "input-example",
          title: "Input Attributes",
          lang: "html",
          code: `<input type="text" name="?"
       value="?" minlength="6" required />`,
          items: [
            { key: 'type="…"', desc: "The type of data that is being input" },
            { key: 'value="…"', desc: "Default value" },
            { key: 'name="…"', desc: "Used to describe this data in the HTTP request" },
            { key: 'id="…"', desc: "Unique identifier that other HTML elements" },
            { key: "readonly", desc: "Stops the user from modifying" },
            { key: "disabled", desc: "Stops any interaction" },
            { key: "checked", desc: "The radio or checkbox select or not" },
            { key: "required", desc: "Being compulsory" },
            { key: 'placeholder="…"', desc: "Adds a temporary hint" },
            { key: 'autocomplete="off"', desc: "Disable auto completion" },
            { key: 'maxlength="…"', desc: "Maximum number of characters" },
            { key: 'minlength="…"', desc: "Minimum number of characters" },
            { key: 'pattern="…"', desc: "Specifies a Regular expression" },
            { key: "autofocus", desc: "Be focused" },
            { key: "multiple", desc: "Whether to allow multiple values" },
          ],
        },
        {
          id: "input-types",
          title: "Input types",
          items: [
            { key: 'type="checkbox"', desc: "Checkbox input" },
            { key: 'type="radio"', desc: "Radio button" },
            { key: 'type="file"', desc: "File upload" },
            { key: 'type="hidden"', desc: "Hidden field" },
            { key: 'type="text"', desc: "Text input (default)" },
            { key: 'type="password"', desc: "Password (masked)" },
            { key: 'type="submit"', desc: "Submit button" },
            { key: 'type="reset"', desc: "Reset button" },
            { key: 'type="button"', desc: "Clickable button" },
            { key: 'type="color"', desc: "Color picker (HTML5)" },
            { key: 'type="date"', desc: "Date picker (HTML5)" },
            { key: 'type="time"', desc: "Time picker (HTML5)" },
            { key: 'type="email"', desc: "Email input (HTML5)" },
            { key: 'type="tel"', desc: "Telephone input (HTML5)" },
            { key: 'type="url"', desc: "URL input (HTML5)" },
            { key: 'type="number"', desc: "Numeric input (HTML5)" },
            { key: 'type="search"', desc: "Search input (HTML5)" },
            { key: 'type="range"', desc: "Range slider (HTML5)" },
          ],
        },
      ],
    },

    // ── HTML meta Tags ───────────────────────────────────────────────────
    {
      id: "meta-tags",
      title: "HTML meta Tags",
      cards: [
        {
          id: "meta",
          title: "Meta tags",
          lang: "html",
          code: `<meta charset="utf-8">

<!-- title -->
<title>···</title>
<meta property="og:title"  content="···">
<meta name="twitter:title" content="···">

<!-- url -->
<link rel="canonical" href="https://···">

<!-- description -->
<meta name="description"        content="···">
<meta property="og:description" content="···">

<!-- viewport -->
<meta name="viewport" content="width=device-width">
<meta name="viewport" content="width=1024">`,
        },
        {
          id: "open-graph",
          title: "Open Graph",
          lang: "html",
          code: `<meta property="og:type" content="website">
<meta property="og:locale" content="en_CA">
<meta property="og:title" content="HTML cheatsheet">
<meta property="og:url" content="https://quickref.me/html">
<meta property="og:image" content="https://xxx.com/image.jpg">
<meta property="og:site_name" content="Name of your website">
<meta property="og:description" content="Description">`,
          note: "Used by Facebook, Instagram, Pinterest, LinkedIn, etc.",
        },
        {
          id: "twitter-cards",
          title: "Twitter Cards",
          lang: "html",
          code: `<meta name="twitter:card"        content="summary">
<meta name="twitter:site"        content="@FechinLi">
<meta name="twitter:title"       content="HTML cheatsheet">
<meta name="twitter:url"         content="https://quickref.me/html">
<meta name="twitter:description" content="Description">
<meta name="twitter:image"       content="https://xxx.com/image.jpg">`,
        },
        {
          id: "geotagging",
          title: "Geotagging",
          lang: "html",
          code: `<meta name="ICBM"
      content="45.416667,-75.7">
<meta name="geo.position"
      content="45.416667;-75.7">
<meta name="geo.region"
      content="ca-on">
<meta name="geo.placename"
      content="Ottawa">`,
        },
      ],
    },
  ],
};
