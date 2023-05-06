import { Suspense } from 'react';
import Loading from './Loading';

const LazySuspense = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default LazySuspense;
