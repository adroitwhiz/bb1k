# bb1k

**bb1k** is a BBCode parser/renderer that weighs <1kb minified. Why? BBcause I can!

## Usage
After including the script in your page, simply pass the `bbparse` function a string of BBCode, and it'll return an HTML element that you can add into the page:
```js
bbparse("This is [i]BBCode[/i]");
```

## Supported features
Being only 1kb in size, bb1k only supports a subset of BBCode. The supported tags are:
- `[b]` (bold)
- `[i]` (italics)
- `[u]` (underline)
- `[s]` (strikethrough)
- `[size={number}]` (font size)
- `[color={string}]` (font color)
- `[url]` and `[url={url}]` (unnamed and named links)
- `[img]` (images)
- `[ul]`, `[ol]`, and `[list]` (lists)
- `[li]` and `[*]` (list elements + shorthand)
- `[code]` and `[pre]` (preformatted text)