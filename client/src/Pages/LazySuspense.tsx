import { lazy, Suspense, ComponentType } from "react";
import { LoadableOptions } from "../types/lazySuspense";

type ImportFunc = () => Promise<{ default: ComponentType<any> }>;

const LazySuspense = (
  importFunc: ImportFunc,
  { fallback = null }: LoadableOptions = { fallback: null }
) => {
  const LazyComponent = lazy(importFunc);

  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default LazySuspense;
