// lib/sanitize.ts
import sanitizeHtml from 'sanitize-html';

export const sanitizeConfig: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'span',
    'strong',
    'em',
    'u',
    's',
    'ul',
    'ol',
    'li',
    'br',
    'a',
    'img',
    'blockquote',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    span: ['style', 'class'],
    p: ['style', 'class'],
  },
  allowedStyles: {
    '*': {
      // Цвета
      color: [/^.*$/],
      'background-color': [/^.*$/],

      // Шрифты
      'font-family': [
        /^GolosRegular.*$/,
        /^GolosBold.*$/,
        /^Gothic.*$/,
        /^sans-serif$/,
        /^serif$/,
        /^monospace$/,
        /^.*$/, // fallback: разрешить любые
      ],
      'font-size': [/^.*$/],
      'font-weight': [/^.*$/],
      'line-height': [/^.*$/],
      'letter-spacing': [/^.*$/],
      'font-style': [/^.*$/],

      // Текст
      'text-align': [/^.*$/],
      'text-transform': [/^.*$/],
      'text-decoration': [/^.*$/],
    },
  },
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
  },
};
