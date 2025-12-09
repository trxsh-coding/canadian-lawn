import { Icon } from '@canadian-lawn/ui-kit';
import { Toaster, type ToasterProps } from 'sonner';

export const Toast = ({ ...props }: ToasterProps) => {
  return (
    <Toaster
      className="toaster group text-center"
      position="top-center"
      toastOptions={{
        classNames: {
          toast: '!bg-baseBg !border-transparent',
        },
      }}
      icons={{
        success: (
          <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-green-700">
            <Icon name="common/check" className="h-3 w-3 text-green-700" />
          </div>
        ),
      }}
      closeButton
      {...props}
    />
  );
};
