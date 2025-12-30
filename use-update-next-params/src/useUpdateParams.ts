import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useUpdateParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (key: string, value?: string | null, removeKey?: string) => {
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

export default useUpdateParams;
