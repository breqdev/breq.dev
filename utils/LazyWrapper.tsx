import React from "react";

export default function LazyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Needed to avoid using Suspense with SSR
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) {
    return <React.Suspense fallback={null}>{children}</React.Suspense>;
  } else {
    return null;
  }
}
