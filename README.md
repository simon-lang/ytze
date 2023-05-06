# CSS Layouts

Melbourne / March 2023 / Simon Lang

## Dev Setup

This repository contains a minimal boilerplate required to get started with Vite + React + Tailwind created with:

```
yarn create vite
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add to tailwind.config.cjs

```
content: ["./src/**/*.{html,css,tsx}"],
```

Add to index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Links

[Interactive guide to flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)

[LazyVim Tailwind Support](https://www.youtube.com/watch?v=_NiWhZeR-MY)

Add Links:
- headlessui
- twin.macro
- tamagui
- vanilla-extract
- konsta

...
