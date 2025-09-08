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
  Font,
  FontFamily,
  FontColor,
} from 'ckeditor5';

// 🔥 твой кастомный пресет
const preset = {
  name: 'canadian-lawn',
  description: 'canadian-lawn-kit',
  editorConfig: {
    licenseKey: 'GPL',
    fontFamily: {
      options: [
        'default',
        'GolosRegular, sans-serif',
        'GolosBold, sans-serif',
        'Gothic, sans-serif',
      ],
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 24, 32],
    },
    plugins: [
      Font,
      FontFamily,
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
      StrapiMediaLib,
      StrapiUploadAdapter,
      FontColor,
    ],
    toolbar: [
      'fontColor',
      'heading',
      'fontSize',
      'fontFamily',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'strapiMediaLib',
      '|',
      'undo',
      'redo',
    ],
  },
};

const myConfig = {
  presets: [preset],
};

export default {
  config: {
    // locales: ['ru', 'en'], // ✨ можно включить нужные языки
  },
  register() {
    // применяем твой кастомный пресет
    setPluginConfig(myConfig);

    console.log('✅ CKEditor настроен для Canadian Lawn');
  },
  bootstrap() {
    // тут обычно ничего не нужно
  },
};
