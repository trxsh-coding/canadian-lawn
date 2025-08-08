import { useRef, useState, useEffect, useCallback } from 'react';

import { Input } from '@/lib';

type Props = {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (val: [number, number]) => void;
};

export const SliderRange: React.FC<Props> = ({ label, min, max, value, onChange }) => {
  const [minVal, maxVal] = value;
  const [dragging, setDragging] = useState<null | 'left' | 'right'>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const percent = useCallback((val: number) => ((val - min) / (max - min)) * 100, [min, max]);

  const setValueFromPosition = useCallback(
    (clientX: number, targetThumb?: 'left' | 'right') => {
      if (!trackRef.current) return;
      const { left, width } = trackRef.current.getBoundingClientRect();
      const x = clientX - left;
      const ratio = Math.max(0, Math.min(1, x / width));
      const val = Math.round(min + ratio * (max - min));

      const moveThumb =
        targetThumb ?? (Math.abs(val - minVal) < Math.abs(val - maxVal) ? 'left' : 'right');

      if (moveThumb === 'left') {
        onChange([Math.min(val, maxVal - 1), maxVal]);
      } else {
        onChange([minVal, Math.max(val, minVal + 1)]);
      }
    },
    [min, max, minVal, maxVal, onChange]
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (dragging) setValueFromPosition(e.clientX, dragging);
    };
    const stop = () => setDragging(null);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stop);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', stop);
    };
  }, [dragging, setValueFromPosition]);

  const handleMinInputChange = (val: string) => {
    const num = Number(val);
    if (!isNaN(num)) {
      const clamped = Math.min(Math.max(num, min), maxVal - 1);
      onChange([clamped, maxVal]);
    }
  };

  const handleMaxInputChange = (val: string) => {
    const num = Number(val);
    if (!isNaN(num)) {
      const clamped = Math.max(Math.min(num, max), minVal + 1);
      onChange([minVal, clamped]);
    }
  };

  return (
    <div className="ui:p-4 ui:rounded-lg">
      <label className="ui:block ui:mb-2 ui:font-semibold ui:select-none">{label}</label>

      <div
        ref={trackRef}
        className="ui:relative ui:h-6 ui:w-full ui:cursor-pointer"
        onMouseDown={(e) => setValueFromPosition(e.clientX)}
      >
        <div className="ui:absolute ui:top-1/2 ui:left-0 ui:h-1 ui:w-full ui:-translate-y-1/2 ui:bg-baseSilvery ui:rounded" />

        <div
          className="ui:absolute ui:top-1/2 ui:h-1 ui:bg-tertiary ui:rounded ui:-translate-y-1/2 ui:z-10"
          style={{
            left: `${percent(minVal)}%`,
            width: `${percent(maxVal - minVal)}%`,
          }}
        />

        <div
          className="ui:absolute ui:top-1/2 ui:w-6 ui:h-6 ui:bg-tertiary ui:rounded-full ui:z-20 ui:cursor-pointer ui:-translate-x-1/2 ui:-translate-y-1/2"
          style={{ left: `${percent(minVal)}%` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging('left');
          }}
        />

        <div
          className="ui:absolute ui:top-1/2 ui:w-6 ui:h-6 ui:bg-tertiary ui:rounded-full ui:z-20 ui:cursor-pointer ui:-translate-x-1/2 ui:-translate-y-1/2"
          style={{ left: `${percent(maxVal)}%` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging('right');
          }}
        />
      </div>

      <div className="ui:mt-4 ui:flex ui:justify-between ui:gap-4">
        <Input
          value={minVal.toString()}
          min={min}
          max={maxVal - 1}
          inputType="numeric-deferred"
          onChangeValue={handleMinInputChange}
        />
        <Input
          value={maxVal.toString()}
          min={minVal + 1}
          max={max}
          inputType="numeric-deferred"
          onChangeValue={handleMaxInputChange}
        />
      </div>
    </div>
  );
};
