import { Card } from '@/lib/components/Card';
import TestImage from '@/assets/images/test2.jpeg';
import { Input } from '@/lib/components/Input';
import React from 'react';
import { Button } from '@/lib';
import { PartnerCard } from '@/lib/components/PartnerCard';

function App() {
  const [value, setValue] = React.useState('');

  const onChange = React.useCallback(
    (value: string) => {
      setValue(value);
    },
    [setValue]
  );

  return (
    <div className="ui:h-[100vh] ui:bg-secondaryGrey ui:w-[100vh] ui:flex ui:flex-col">
      <Card
        title="Трактор Lovol TE404 Generation 3, 2023"
        subtitle="Колёсный, полный привод, 333 моточаса, 80 л.с."
        price={1000}
        image={TestImage}
      />
      <Button color="secondary" buttonType="button">
        Отправить
      </Button>
      <Input
        value={value}
        errorMessage="ЭЭЭ"
        clearable
        inputType="default"
        searchable
        onChangeValue={onChange}
      />

      <PartnerCard title="Газоны" image={TestImage} />
    </div>
  );
}

export default App;
