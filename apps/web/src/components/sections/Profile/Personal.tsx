import { User } from '@canadian-lawn/api';
import { Button, Typography } from '@canadian-lawn/ui-kit';
import { useForm } from 'react-hook-form';

import { FormInput } from '@/components/layout/FormInput';
import { FORM_FIELDS, FormValues } from '@/components/sections/Profile/const';

type PersonalProps = {
  user?: User;
};

export const Personal = ({ user }: PersonalProps) => {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone?.toString() || '',
    },
  });
  const onSubmit = async () => null;

  return (
    <div className="bg-baseWhite rounded-sm p-4 lg:my-[25px] lg:p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-5">
          <Typography view="large1" weight="bold">
            Контакты
          </Typography>
          {Object.entries(FORM_FIELDS).map(([name, { placeholder, rules }]) => (
            <FormInput
              key={name}
              name={name as keyof FormValues}
              control={control}
              rules={rules}
              placeholder={placeholder}
              errorMessage={errors[name as keyof FormValues]?.message}
            />
          ))}
        </div>
        <div className="p-4">
          <Button disabled={!isDirty} className="w-full" type="submit">
            {!isDirty ? 'Не сохранять' : 'Сохранять'}
          </Button>
        </div>
      </form>
    </div>
  );
};
