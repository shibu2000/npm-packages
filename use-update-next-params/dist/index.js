// src/useUpdateParams.ts
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
var useUpdateParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateParams = useCallback(
    (key, value, removeKey) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (removeKey) {
        params.delete(removeKey);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );
  return updateParams;
};
var useUpdateParams_default = useUpdateParams;
export {
  useUpdateParams_default as default
};
