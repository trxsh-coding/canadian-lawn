import classNames from 'classnames';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({ prefix: 'ui' });

export default function cn(...inputs: classNames.ArgumentArray) {
  return twMerge(classNames(inputs));
}
