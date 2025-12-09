import { Toaster, type ToasterProps } from 'sonner';

import { Icon } from '@/lib';

export const Toast = ({ ...props }: ToasterProps) => {
  return (
    <Toaster
      className="toaster group ui:text-center"
      position="top-center"
      toastOptions={{
        classNames: {
          toast: 'ui:!bg-baseBg ui:!border-transparent',
        },
      }}
      icons={{
        success: (
          <div className="ui:flex ui:justify-center ui:border-green-700 ui:border-2 ui:w-[20px] ui:h-[20px] ui:items-center ui:rounded-full">
            <Icon name="common/check" className="ui:text-green-700 ui:h-3 ui:w-3" />
          </div>
        ),
      }}
      closeButton
      {...props}
    />
  );
};
