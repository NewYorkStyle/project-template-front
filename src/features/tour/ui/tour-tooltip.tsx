import type {FC} from 'react';

import {Flex, Icon} from '@new_york_style/project-template-ui';
import type {TooltipRenderProps} from 'react-joyride';

import {Button, Typography} from '@shared';

import style from './tour-tooltip.module.scss';

export const TourTooltip: FC<TooltipRenderProps> = ({
  backProps,
  closeProps,
  continuous,
  controls: _controls,
  index,
  primaryProps,
  skipProps,
  step,
  tooltipProps,
}) => {
  const buttons = step.buttons ?? [];
  const showSkip = buttons.includes('skip');
  const showBack = continuous && index > 0 && buttons.includes('back');
  const showPrimary = buttons.includes('primary');
  const showClose = buttons.includes('close');
  const showFooter = showSkip || showBack || showPrimary;

  const {title: _closeTitle, ...closeButtonRest} = closeProps;

  return (
    <div
      {...tooltipProps}
      className={`${style.root} ${showClose ? style.rootWithClose : ''}`}
    >
      {showClose ? (
        <Button {...closeButtonRest} className={style.closeButton} type='text'>
          <Icon name='cross' size={20} />
        </Button>
      ) : null}
      <Flex vertical gap={8}>
        {step.title ? (
          <Typography.Title className={style.title} level={5}>
            {step.title}
          </Typography.Title>
        ) : null}
        {step.content ? (
          <Typography.Text className={style.content}>
            {step.content}
          </Typography.Text>
        ) : null}
      </Flex>
      {showFooter ? (
        <Flex
          align='center'
          className={style.footer}
          gap={8}
          justify='space-between'
          wrap='wrap'
        >
          <div className={style.footerLeft}>
            {showSkip ? (
              <Button {...skipProps}>{skipProps.title}</Button>
            ) : null}
          </div>
          <Flex align='center' gap={8} wrap='wrap'>
            {showPrimary ? (
              <Button type='primary' {...primaryProps}>
                {primaryProps.title}
              </Button>
            ) : null}
            {showBack ? (
              <Button {...backProps}>{backProps.title}</Button>
            ) : null}
          </Flex>
        </Flex>
      ) : null}
    </div>
  );
};
