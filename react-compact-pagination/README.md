# React Compact Pagination

A lightweight, windowed pagination component for React with a compact UI and predictable behavior.
Designed to work seamlessly with Next.js, React Router, and URL-based pagination.

## ✨ Features

- 📄 **Compact, windowed pagination** (no clutter)
- ⚡ **Lightweight & dependency-free**
- 🎯 **Fully controlled component**
- 🎨 **Styleable via plain CSS**
- 🧩 **Works with Next.js App Router & Pages Router**
- 🧠 **No Tailwind, no CSS-in-JS, no magic**
- 🔗 **Perfect for URL / query-param driven pagination**

## 📦 Installation

```bash
npm install react-compact-pagination
```

or

```bash
yarn add react-compact-pagination
```

or

```bash
pnpm add react-compact-pagination
```

## 🎨 Import Styles (Required)

This package does not auto-load CSS by design. You must import the stylesheet once in your app.

### React / Vite / CRA

```javascript
import "react-compact-pagination/styles.css";
```

### Next.js (App Router)

`app/layout.tsx`

```tsx
import "react-compact-pagination/styles.css";

export default function RootLayout({ children }) {
  return <>{children}</>;
}
```

### Next.js (Pages Router)

`pages/_app.tsx`

```tsx
import "react-compact-pagination/styles.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## 📌 Basic Usage

```tsx
import { ReactCompactPagination } from "react-compact-pagination";
import "react-compact-pagination/styles.css";

<ReactCompactPagination
  totalPages={10}
  currentPage={1}
  onPageChange={(page) => console.log(page)}
/>;
```

## 🔗 URL / Query Parameter Pagination (Recommended)

Works perfectly with URL-based pagination (Next.js, React Router, etc.).

### Example with query params

```tsx
import { ReactCompactPagination } from "react-compact-pagination";
import "react-compact-pagination/styles.css";
// Example hook (use your own implementation or library)
import useUpdateNextParams from "use-update-next-params";

const MyComponent = () => {
  // ... logic to get current page from URL ...

  return (
    <ReactCompactPagination
      totalPages={10}
      currentPage={1} // Pass current page from URL
      onPageChange={(page) => updateParams("page", page.toString())}
    />
  );
};
```

This makes pagination:

- Shareable
- Bookmarkable
- SEO-friendly

## ⚙️ Props

| Prop              | Type                     | Required | Description                                 |
| ----------------- | ------------------------ | :------: | ------------------------------------------- |
| `totalPages`      | `number`                 |    ✅    | Total number of pages                       |
| `currentPage`     | `number`                 |    ✅    | Currently active page                       |
| `onPageChange`    | `(page: number) => void` |    ✅    | Callback when page changes                  |
| `maxVisiblePages` | `number`                 |    ❌    | Max visible page buttons (default: 5)       |
| `prevLabel`       | `ReactNode`              |    ❌    | Custom previous button label (default: "‹") |
| `nextLabel`       | `ReactNode`              |    ❌    | Custom next button label (default: "›")     |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Shibu Dhara
