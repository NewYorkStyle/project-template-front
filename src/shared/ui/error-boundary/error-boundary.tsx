import {ErrorBoundary as ReactErrorBoundary} from 'react-error-boundary';

import {ErrorFallback} from './error-fallback';

type TProps = {
  children: React.ReactNode;
};

export const ErrorBoundary: React.FC<TProps> = ({children}) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};
