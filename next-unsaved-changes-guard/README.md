# Next Unsaved Changes Guard

A lightweight, customizable React component for Next.js 13+ (App Router) that prevents users from accidentally leaving a page with unsaved changes.

## Features

- 🛡️ **Route Guard**: Intercepts navigation attempts when determining that a form is dirty.
- 🔄 **Browser Event Handling**: Warns users when closing the tab or refreshing the window.
- 🎨 **Fully Customizable**: Override default styles easily using stable CSS class names.
- 🧩 **Next.js App Router Support**: Built specifically for `next/navigation`.

## Compatibility

| Package | Version                         |
| ------- | ------------------------------- |
| Next.js | `13.0.0` or higher (App Router) |
| React   | `18.0.0` or higher              |

> [!NOTE]
> This package utilizes `next/navigation` which is exclusive to the **Next.js App Router**. It is **not** compatible with the legacy Pages Router (`pages/` directory).

## Installation

```bash
npm install next-unsaved-changes-guard
# or
yarn add next-unsaved-changes-guard
# or
pnpm add next-unsaved-changes-guard
```

## Usage

Import the component and wrap your form or page content. Pass the `formDirty` state to control when the guard should be active.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { NextUnsavedChangesGuard } from "next-unsaved-changes-guard";

export default function MyFormPage() {
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // Example save function
  const handleSave = async () => {
    // Perform API call or form submission
    console.log("Saving data...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <NextUnsavedChangesGuard
      formDirty={isDirty}
      formErrors={errors}
      saveData={() => submitBtnRef.current?.click()}
    >
      <form
        onChange={() => setIsDirty(true)}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <h1>Edit Profile</h1>
        <input type="text" placeholder="Name" />

        {/* Hidden submit button triggered by the Guard's "Save" action */}
        <button ref={submitBtnRef} type="submit" style={{ display: "none" }} />
      </form>
    </NextUnsavedChangesGuard>
  );
}
```

### Props

| Prop         | Type                  | Default      | Description                                                                                                |
| ------------ | --------------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| `children`   | `ReactNode`           | **Required** | The content to be rendered (usually your page or form).                                                    |
| `formDirty`  | `boolean`             | **Required** | If `true`, navigation attempts will trigger the confirmation dialog.                                       |
| `saveData`   | `() => Promise<void>` | **Required** | Function called when the user clicks "Save" in the dialog.                                                 |
| `formErrors` | `Record<string, any>` | `{}`         | If provided and not empty, the dialog will prevent navigation on "Save" attempt until errors are resolved. |

## Styling

The component injects default styles, but every element has a stable CSS class name that you can target in your global CSS or CSS modules to override the look and feel.

### CSS Classes

| Class Name             | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `.nucg-ad-overlay`     | The semi-transparent backdrop covering the screen. |
| `.nucg-ad-dialog`      | The main modal container.                          |
| `.nucg-ad-title`       | The modal header title ("Unsaved Changes").        |
| `.nucg-ad-description` | The warning message text.                          |
| `.nucg-ad-footer`      | Container for the action buttons.                  |
| `.nucg-ad-btn`         | Base style shared by all buttons.                  |
| `.nucg-ad-cancel`      | The "Stay" button (Secondary).                     |
| `.nucg-ad-danger`      | The "Discard" button (Destructive).                |
| `.nucg-ad-primary`     | The "Save" button (Primary).                       |

### Example Customization

Add this to your `globals.css` to match your brand colors:

```css
/* Override the Save button color */
.nucg-ad-primary {
  background-color: #3b82f6 !important; /* Tailwind Blue-500 */
}
.nucg-ad-primary:hover {
  background-color: #2563eb !important; /* Tailwind Blue-600 */
}

/* Customize the modal radius and shadow */
.nucg-ad-dialog {
  border-radius: 16px !important;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1) !important;
}

/* Change the backdrop color */
.nucg-ad-overlay {
  background: rgba(0, 0, 0, 0.7) !important;
  backdrop-filter: blur(4px);
}
```

## License

MIT © Shibu Dhara
