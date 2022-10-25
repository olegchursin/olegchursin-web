import { useEffect, useState } from 'react';

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  // read more: https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}
