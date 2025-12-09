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
    'figure',
    'figcaption',
    'pre',
    'code',
    'hr',
    'table',
    'thead',
    'tbody',
    'tr',
    'td',
    'th',
    'col',
    'colgroup',
    'caption',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel', 'class'],
    img: ['src', 'alt', 'title', 'width', 'height', 'srcset', 'sizes', 'class', 'style'],
    figure: ['class', 'style'],
    figcaption: ['class', 'style'],
    p: ['class', 'style'],
    span: ['class', 'style'],
    td: ['colspan', 'rowspan', 'class', 'style'],
    th: ['colspan', 'rowspan', 'class', 'style'],
    '*': ['class', 'style'], // общий fallback
  },
  allowedStyles: {
    '*': {
      // Цвета
      color: [/^.*$/],
      'background-color': [/^.*$/],

      // Шрифты
      'font-family': [/^.*$/],
      'font-size': [/^.*$/],
      'font-weight': [/^.*$/],
      'line-height': [/^.*$/],
      'letter-spacing': [/^.*$/],
      'font-style': [/^.*$/],

      // Текст
      'text-align': [/^.*$/],
      'text-transform': [/^.*$/],
      'text-decoration': [/^.*$/],

      // Размеры
      width: [/^.*$/],
      height: [/^.*$/],
      'max-width': [/^.*$/],
      'min-width': [/^.*$/],
    },
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel', 'data'],
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
  },
};
