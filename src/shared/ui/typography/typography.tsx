import {
  Typography as BaseTypography,
  type TParagraphProps as TBaseParagraphProps,
  type TTextProps as TBaseTextProps,
  type TTitleProps as TBaseTitleProps,
  type TLinkProps as TBaseLinkProps,
} from '@new_york_style/project-template-ui';

import {E_METRICS_EVENTS, sendEvent, type TMetricsProps} from '../../lib';

const {
  Link: BaseLink,
  Paragraph: BaseParagraph,
  Text: BaseText,
  Title: BaseTitle,
} = BaseTypography;

type TTypographyAnalyticsProps = {
  analyticProps?: TMetricsProps;
};

type TParagraphProps = TBaseParagraphProps & TTypographyAnalyticsProps;
type TTextProps = TBaseTextProps & TTypographyAnalyticsProps;
type TTitleProps = TBaseTitleProps & TTypographyAnalyticsProps;
type TLinkProps = TBaseLinkProps & TTypographyAnalyticsProps;

const handleTypographyClick = (
  e: React.MouseEvent<HTMLDivElement>,
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void,
  analyticProps?: TMetricsProps
) => {
  if (onClick) {
    onClick(e);
  }

  if (analyticProps) {
    sendEvent({
      event: E_METRICS_EVENTS.CLICK,
      label: analyticProps.label,
      namespace: analyticProps.namespace,
    });
  }
};

const Paragraph = ({analyticProps, onClick, ...restProps}: TParagraphProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleTypographyClick(e, onClick, analyticProps);
  };

  return (
    <BaseParagraph onClick={onClick ? handleClick : undefined} {...restProps} />
  );
};

const Text = ({analyticProps, onClick, ...restProps}: TTextProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleTypographyClick(e, onClick, analyticProps);
  };

  return (
    <BaseText onClick={onClick ? handleClick : undefined} {...restProps} />
  );
};

const Title = ({analyticProps, onClick, ...restProps}: TTitleProps) => {
  const handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    handleTypographyClick(e, onClick, analyticProps);
  };

  return (
    <BaseTitle onClick={onClick ? handleClick : undefined} {...restProps} />
  );
};

const Link = ({analyticProps, onClick, ...restProps}: TLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    handleTypographyClick(e, onClick, analyticProps);
  };

  return (
    <BaseLink onClick={onClick ? handleClick : undefined} {...restProps} />
  );
};

export const Typography = {
  Link,
  Paragraph,
  Text,
  Title,
};
