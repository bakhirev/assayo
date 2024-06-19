import React from 'react';
import { Link } from 'react-router-dom';

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
          to={link}
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
  text?: string | string[];
  style?: any;
  className?: string;
}

function Description({ text, style, className }: IDescriptionProps) {
  const paragraphs = !Array.isArray(text)
    ? (text || '').trim().split(/\n+/gm)
    : text;

  const items = paragraphs.map((paragraph) => {
    const prefix = paragraph.substring(0, 2);
    const mainText = paragraph.substring(2);

    if (prefix === '- ') {
      return (
        <List
          key={mainText}
          text={mainText}
          style={style}
          className={className}
        />
      );
    }

    if (prefix === '# ') {
      return (
        <Title
          key={mainText}
          text={mainText}
          style={style}
          className={className}
        />
      );
    }

    return (
      <SimpleText
        key={mainText}
        text={paragraph}
        style={style}
        className={className}
      />
    );
  });

  return (<>{items}</>);
}

Description.defaultProps = {
  text: '',
};

export default Description;
