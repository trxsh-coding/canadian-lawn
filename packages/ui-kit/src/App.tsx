import ImageCard from 'assets/images/image.png';
import React from 'react';
import { toast } from 'sonner';

import { Button, ButtonGroup, CopyPaste, Icon, Toast } from '@/lib';
import { BottomSheet } from '@/lib/components/BottomSheet';
import { ButtonCounter } from '@/lib/components/ButtonCounter';
import { Checkbox } from '@/lib/components/Checkbox';
import { LawnCard } from '@/lib/components/LawnCard/LawnCard';
import { ProductCard } from '@/lib/components/ProductCard/ProductCard';
import { Progress } from '@/lib/components/Progress';
import { SliderRange } from '@/lib/components/SliderRange';
function App() {
  const [value, setValue] = React.useState<number>(0);
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState<[number, number]>([4, 10]);
  const [selectedSize, setSelectedSize] = React.useState<string>('medium');
  const [selectedColors, setSelectedColors] = React.useState<string[]>(['red']);

  const handleChange = React.useCallback((value: number) => {
    setValue(value);
  }, []);

  const handleClick = React.useCallback(
    (increment: boolean) => (value ? setValue(increment ? value + 1 : value - 1) : setValue(1)),
    [value]
  );

  const handleSliderValueChange = React.useCallback((value: [number, number]) => {
    setSliderValue(value);
  }, []);

  const handleToast = React.useCallback(() => {
    toast.success('Форма отправлена!');
  }, []);

  return (
    <div className="ui:p-section ui:bg-secondaryGrey ui:w-[100vh] ui:flex ui:flex-col ui:gap-10">
      <Icon name="common/check" className="ui:text-primary ui:h-4 ui:w-4" />
      <Toast />
      <BottomSheet
        open={bottomSheetOpen}
        onOpenChange={(value) => setBottomSheetOpen(value)}
        title="Фильтры"
        mainContent={<div className="ui:p-4">Тут форма фильтров или что-то ещё</div>}
      >
        <Button iconName="common/filter" radius="large" />
      </BottomSheet>
      <Button width="fit" color="primary" iconName="common/cart" onClick={handleToast}>
        Я primary кнопка
      </Button>
      <Button width="fit" color="secondary" iconName="common/cart" suffixIconName="common/zoom">
        Я secondary кнопка
      </Button>

      <Button
        width="fit"
        buttonType="icon"
        color="secondary"
        iconName="common/cart"
        suffixIconName="common/zoom"
      />
      <Button width="fit" inactive buttonType="icon" iconName="common/cart" />
      <Button buttonType="icon" iconName="common/cross" />
      <Button buttonType="text">Перейти</Button>

      <ButtonCounter
        onChange={handleChange}
        value={value}
        max={20231}
        min={0}
        text="Товары 265 штук"
        onClick={() => handleClick(true)}
        onSuffixIconClick={() => handleClick(true)}
        onIconClick={() => handleClick(false)}
      />
      <Progress progress={8} title="cкорость роста" />
      <Checkbox active={false} />
      <Checkbox active={true} />

      <SliderRange
        label="Время первых сходов"
        min={0}
        max={10}
        value={sliderValue}
        onChange={handleSliderValueChange}
      />

      <div>
        <CopyPaste value="123" />
      </div>

      <ProductCard
        image={ImageCard}
        title="Декоративный теневой, 20 кг"
        handleButtonChange={function (): void {
          throw new Error('Function not implemented.');
        }}
        handleButtonClick={function (): void {
          throw new Error('Function not implemented.');
        }}
        count={1}
      />

      <LawnCard
        image={ImageCard}
        name="Декоративный теневой"
        slug="dekorativnyj-tenevoj"
        resistance={7}
        growth={5}
        packages={[
          { weight: 1, price: 420, unit: 'кг' },
          { weight: 5, price: 1950, unit: 'кг' },
          { weight: 10, price: 3700, unit: 'кг' },
        ]}
        value={value}
        onTypeChange={(type) => toast.success(`Выбрана фасовка: ${type} кг`)}
        handleButtonChange={handleChange}
        handleButtonClick={() => handleClick(true)}
        handleCardClick={() => toast.success('Переход в карточку товара')}
      />

      <div className="ui:flex ui:flex-col ui:gap-4">
        <div>
          <h3 className="ui:mb-2 ui:text-lg ui:font-bold">Выбор размера (single):</h3>
          <ButtonGroup
            options={[
              { value: 'small', label: 'Маленький' },
              { value: 'medium', label: 'Средний' },
              { value: 'large', label: 'Большой' },
              { value: 'xlarge', label: 'Очень большой', disabled: true },
            ]}
            value={selectedSize}
            onChange={(value) => setSelectedSize(value as string)}
          />
        </div>

        <div>
          <h3 className="ui:mb-2 ui:text-lg ui:font-bold">Выбор цветов (multiple):</h3>
          <ButtonGroup
            multiple
            options={[
              { value: 'red', label: 'Красный' },
              { value: 'green', label: 'Зелёный' },
              { value: 'blue', label: 'Синий' },
              { value: 'yellow', label: 'Жёлтый' },
            ]}
            value={selectedColors}
            onChange={(value) => setSelectedColors(value as string[])}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
