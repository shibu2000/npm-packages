import * as react_jsx_runtime from 'react/jsx-runtime';

interface UnsavedChangesGuardProps {
    children: React.ReactNode;
    formDirty: boolean;
    saveData: () => Promise<void>;
    formErrors?: Record<string, any>;
}
declare const NextUnsavedChangesGuard: ({ children, formDirty, saveData, formErrors, }: UnsavedChangesGuardProps) => react_jsx_runtime.JSX.Element;

export { NextUnsavedChangesGuard };
