import React from 'react';
import { Link } from 'react-router-dom';

import cssStyle from './index.module.scss';

interface ICommonProps {
  text: string;
  style: any;
}

function getTextWithLink(text: string) {
  const parts = (text || '')
    .split(/(\[[^\]]+\])/gim)
    .map((value: string) => {
      if (value?.[0] !== '[') return value;
      const [ title, link ] = value.replace(/\[|\]/gim, '').split('|');
      return (
        <Link
          key={value}
          target="_blank"
          to={link}>
          {title}
        </Link>
      );
    });
  return (<>{parts}</>) ;
}

function getTextWithStyle(text: string) {
  const parts = (text || '')
    .split('*')
    .map((value: string, index: number) => (index % 2
      ? (<b key={value}>{getTextWithLink(value)}</b>)
      : (<span key={value}>{getTextWithLink(value)}</span>)
    ));
  return (<>{parts}</>) ;
}

function List({ text, style }: ICommonProps) {
  return (
    <p
      className={cssStyle.description_list}
      style={style || {}}
    >
      {getTextWithStyle(text)}
    </p>
  );
}

function Title({ text, style }: ICommonProps) {
  return (
    <h6
      className={cssStyle.description_title}
      style={style || {}}
    >
      {getTextWithStyle(text)}
    </h6>
  );
}

function SimpleText({ text, style }: ICommonProps) {
  return (
    <p
      className={cssStyle.description_text}
      style={style || {}}
    >
      {getTextWithStyle(text)}
    </p>
  );
}

interface IDescriptionProps {
  text?: string | string[];
  style?: any;
}

function Description({ text, style }: IDescriptionProps) {
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
        />
      );
    }
    if (prefix === '# ') {
      return (
        <Title
          key={mainText}
          text={mainText}
          style={style}
        />
      );
    }
    return (
      <SimpleText
        key={mainText}
        text={paragraph}
        style={style}
      />
    );
  });

  return (<>{items}</>);
}

Description.defaultProps = {
  text: '',
};

export default Description;
