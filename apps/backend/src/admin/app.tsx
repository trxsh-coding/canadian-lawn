import './fonts.css';

import { setPluginConfig, StrapiMediaLib, StrapiUploadAdapter } from '@_sh/strapi-plugin-ckeditor';
import {
  Bold,
  Italic,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Link,
  List,
  Paragraph,
  ImageInsert,
  ImageResize,
  Style,
  GeneralHtmlSupport,
} from 'ckeditor5';

const preset = {
  name: 'canadian-lawn',
  description: 'canadian-lawn-kit',
  editorConfig: {
    licenseKey: 'GPL',
    heading: {
      options: [
        {
          model: 'paragraph',
          view: {
            name: 'p',
            classes: 'text-[12px] leading-[130%] tracking-[-4%] lg:text-sm',
          },
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: {
            name: 'h1',
            classes:
              'text-xl leading-[120%] uppercase tracking-[-4%] font-gothic lg:text-[36px] lg:leading-[117%]',
          },
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: {
            name: 'h2',
            classes: 'text-lg leading-normal uppercase font-gothic lg:text-8 lg:leading-[130%]',
          },
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: {
            name: 'h3',
            classes: 'text-sm leading-[126%] uppercase font-gothic lg:text-lg lg:leading-[130%]',
          },
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: {
            name: 'h4',
            classes: 'text-xl font-semibold lg:text-[25px]',
          },
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: {
            name: 'h5',
            classes:
              'text-lg leading-[120%] uppercase tracking-[-4%] lg:text-[33px] lg:leading-[122%]',
          },
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: {
            name: 'h6',
            classes: 'text-[10px] font-semibold lg:text-[12px] leading-none',
          },
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },

    plugins: [
      Bold,
      Italic,
      Essentials,
      Heading,
      Paragraph,
      List,
      Link,
      Image,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      ImageInsert,
      ImageResize,
      StrapiMediaLib,
      StrapiUploadAdapter,
      Style,
      GeneralHtmlSupport,
    ],
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'insertImage',
      'strapiMediaLib',
      '|',
      'undo',
      'redo',
      '|',
      'style', // 👉 сюда можно повесить свои пресеты под UI-kit
    ],
    image: {
      resizeUnit: 'px',
      resizeOptions: [
        { name: 'resizeImage:original', value: null, label: 'Original' },
        { name: 'resizeImage:500', value: '500', label: '500px' },
        { name: 'resizeImage:750', value: '750', label: '750px' },
        { name: 'resizeImage:1000', value: '1000', label: '1000px' },
      ],
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'linkImage',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        'imageStyle:side',
        '|',
        'resizeImage',
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
    },
  },
};

const myConfig = {
  presets: [preset],
};

export default {
  config: {},
  register() {
    setPluginConfig(myConfig);
  },
  bootstrap() {},
};
