# use-update-next-params

A lightweight custom React hook for updating URL search parameters in **Next.js App Router** applications.

This hook provides a simple way to add, update, or remove query parameters while preserving existing ones.

---

## 📦 Installation

```bash
npm install use-update-next-params
```

or

```bash
yarn add use-update-next-params
```

or

```bash
pnpm add use-update-next-params
```

---

## ⚠️ Requirements

- **Next.js** 13+ (App Router only)
- **React** 18+
- Must be used inside a **Client Component**

> ❗ This hook does **not** work with the Pages Router (`next/router`).

---

## 🚀 Usage

### Basic usage

```tsx
"use client";

import useUpdateParams from "use-update-next-params";

export default function Page() {
  const updateParams = useUpdateParams();

  return (
    <button onClick={() => updateParams("page", "2")}>
      Go to page 2
    </button>
  );
}
```

---

### Update a query parameter

```ts
updateParams("sort", "asc");
```

Result:

```
?sort=asc
```

---

### Remove a query parameter

```ts
updateParams("filter", null);
```

Result:

```
?sort=asc
```

---

### Update one param and remove another

```ts
updateParams("page", "3", "filter");
```

Result:

```
?page=3
```

---

## 🧠 API

### `useUpdateParams()`

Returns a function that updates URL search parameters.

### Function signature

```ts
(key: string, value?: string | null, removeKey?: string) => void
```

### Parameters

| Parameter   | Type                | Description |
|------------|---------------------|-------------|
| `key`       | `string`            | Query parameter key to set or remove |
| `value`     | `string \| null`    | Value to set. If `null` or `undefined`, the key is removed |
| `removeKey` | `string` (optional) | Additional query key to remove |

---

## 🔍 How it works

Internally, the hook uses:

- `useRouter`
- `usePathname`
- `useSearchParams`

from `next/navigation` to construct a new query string and navigate using `router.push()`.

---

## ❗ Important Notes

- Must be used in a **Client Component**
- Uses `router.push()` (not `replace`)
- Preserves existing query parameters
- Designed for **Next.js App Router only**

---

## 🧩 Peer Dependencies

```json
{
  "react": ">=18",
  "next": ">=13"
}
```

---

## 📄 License

MIT © Shibu Dhara
