import React from 'react';

import { Button } from '@/lib';
import { ButtonCounter } from '@/lib/components/ButtonCounter';
import { Checkbox } from '@/lib/components/Checkbox';
import { Progress } from '@/lib/components/Progress';
import { SliderRange } from '@/lib/components/SliderRange';

function App() {
  const [value, setValue] = React.useState<number>(0);

  const [sliderValue, setSliderValue] = React.useState<[number, number]>([4, 10]);

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

  return (
    <div className="ui:p-section ui:bg-secondaryGrey ui:w-[100vh] ui:flex ui:flex-col ui:gap-10">
      <Button width="fit" color="primary" iconName="common/cart">
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
    </div>
  );
}

export default App;
