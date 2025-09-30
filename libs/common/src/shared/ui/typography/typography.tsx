import {E_METRICS_EVENTS, TMetricsProps} from '../../constants';
import {sendEvent} from '../../lib';
import {Typography as AntdTypography} from 'antd';
import {LinkProps} from 'antd/es/typography/Link';
import {ParagraphProps} from 'antd/es/typography/Paragraph';
import {TextProps} from 'antd/es/typography/Text';
import {TitleProps} from 'antd/es/typography/Title';

const {
  Link: AntdLink,
  Paragraph: AntdParagraph,
  Text: AntdText,
  Title: AntdTitle,
} = AntdTypography;

type TTypographyAnalyticsProps = {
  analyticProps?: TMetricsProps;
};

type TParagraphProps = ParagraphProps & TTypographyAnalyticsProps;
type TTextProps = TextProps & TTypographyAnalyticsProps;
type TTitleProps = TitleProps & TTypographyAnalyticsProps;
type TLinkProps = LinkProps & TTypographyAnalyticsProps;

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
    <AntdParagraph onClick={onClick ? handleClick : undefined} {...restProps} />
  );
};

const Text = ({analyticProps, onClick, ...restProps}: TTextProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleTypographyClick(e, onClick, analyticProps);
  };

  return (
    <AntdText onClick={onClick ? handleClick : undefined} {...restProps} />
  );
};

const Title = ({analyticProps, onClick, ...restProps}: TTitleProps) => {
  const handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    handleTypographyClick(e, onClick, analyticProps);
  };

  return (
    <AntdTitle onClick={onClick ? handleClick : undefined} {...restProps} />
  );
};

const Link = ({analyticProps, onClick, ...restProps}: TLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    handleTypographyClick(e, onClick, analyticProps);
  };

  return (
    <AntdLink onClick={onClick ? handleClick : undefined} {...restProps} />
  );
};

export const Typography = {
  Link,
  Paragraph,
  Text,
  Title,
};
