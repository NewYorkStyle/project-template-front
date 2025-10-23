import {type PropsWithChildren} from 'react';

import {Helmet} from 'react-helmet';

type TProps = PropsWithChildren<{
  title: string;
}>;

export const Page = ({children, title}: TProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};
