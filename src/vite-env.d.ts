/// <reference types="vite/client" />

// vite-imagetools query imports (e.g. "logo.png?w=600&format=webp&as=srcset")
declare module '*&as=srcset' {
  const srcset: string;
  export default srcset;
}
declare module '*&format=png' {
  const src: string;
  export default src;
}
