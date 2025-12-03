import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'ts/components/Translation';
import localization from 'ts/helpers/Localization';
import cssStyle from './index.module.scss';

interface ICommonProps {
  text: string;
  style: any;
  className?: string;
}

function getTextWithLink(text: string, className?: string) {
  const parts = (text || '')
    .split(/(\[[^\]]+\])/gim)
    .map((value: string) => {
      if (value?.[0] !== '[') return value;
      const [ title, link ] = value.replace(/\[|\]/gim, '').split('|');
      return (
        <Link
          key={value}
          target="_blank"
          rel="noreferrer"
          className={className || ''}
          to={link || ''}
        >
          {title}
        </Link>
      );
    });
  return (<>{parts}</>) ;
}

export function getTextWithStyle(text: string, className?: string) {
  const parts = (text || '')
    .split('*')
    .map((value: string, index: number) => (index % 2
      ? (<b key={value}>{getTextWithLink(value, className)}</b>)
      : (<span key={value}>{getTextWithLink(value, className)}</span>)
    ));
  return (<>{parts}</>) ;
}

function List({ text, style, className }: ICommonProps) {
  return (
    <p
      style={style || {}}
      className={`${cssStyle.description_list} ${className || ''}`}
    >
      {getTextWithStyle(text, className)}
    </p>
  );
}

function Title({ text, style, className }: ICommonProps) {
  return (
    <h6
      style={style || {}}
      className={`${cssStyle.description_title} ${className || ''}`}
    >
      {getTextWithStyle(text, className)}
    </h6>
  );
}

function SimpleText({ text, style, className }: ICommonProps) {
  return (
    <p
      style={style || {}}
      className={`${cssStyle.description_text} ${className || ''}`}
    >
      {getTextWithStyle(text)}
    </p>
  );
}

interface IDescriptionProps {
  text?: string;
  style?: any;
  className?: string;
  translationId?: string;
}

function Description({ text, style, className, translationId }: IDescriptionProps) {
  const { wrapper } = useTranslation();
  const translation = text || localization.get(translationId);
  const paragraphs = !Array.isArray(translation)
    ? (translation || '').trim().split(/\n+/gm)
    : translation;

  const items = paragraphs.map((paragraph, index: number) => {
    const prefix = paragraph.substring(0, 2);
    const mainText = paragraph.substring(2);
    const key = `${mainText}${index}`;

    if (prefix === '- ') {
      return (
        <List
          key={key}
          text={mainText}
          style={style}
          className={className}
        />
      );
    }

    if (prefix === '# ') {
      return (
        <Title
          key={key}
          text={mainText}
          style={style}
          className={className}
        />
      );
    }

    return (
      <SimpleText
        key={key}
        text={paragraph}
        style={style}
        className={className}
      />
    );
  });

  return translationId
    ? wrapper(translationId, items) as ReactElement
    : (<>{items}</>);
}

Description.defaultProps = {
  text: '',
};

export default Description;
