import path from 'path';
import { fileURLToPath } from 'url';

import { ENV } from '@canadian-lawn/env';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../../../../.env'),
});

export { ENV as CONFIG };
