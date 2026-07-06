import { LawnProduct } from '@canadian-lawn/api';
import { Typography } from '@canadian-lawn/ui-kit';

import { formatPlantingPeriod } from '@/utils/months';

export const AboutLawn = ({ product }: { product?: LawnProduct }) => {
  const lawn = product?.lawn;
  const purpose = product?.categories
    ?.map((category) => category.name)
    .filter(Boolean)
    .join(', ');
  const plantingPeriod = formatPlantingPeriod(lawn?.landing);

  const DetailsItem = ({ detail, value }: { detail?: string; value?: string | number | null }) =>
    value ? (
      <div className="flex">
        <Typography color="secondary-grey" className="flex-[0.5]">
          {detail}
        </Typography>
        <Typography>{value}</Typography>
      </div>
    ) : null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-8">
        <Typography view="card-price" weight="bold">
          Описание
        </Typography>
        <Typography>{product?.description}</Typography>
      </div>
      {lawn && (
        <div className="flex">
          <div className="flex flex-[0.5] flex-col gap-8">
            <Typography view="card-price" weight="bold">
              Характеристики
            </Typography>
            <div className="flex flex-col gap-3">
              <DetailsItem detail="Назначение" value={purpose} />
              <DetailsItem detail="Сезонность" value={lawn.seasonality} />
              <DetailsItem detail="Время первых всходов, дни" value={lawn.germinition_time} />
              <DetailsItem
                detail="Время до полного покрытия участка, недели"
                value={lawn.full_cover_time}
              />
              <DetailsItem detail="Плотность (количество побегов на 1 м²)" value={lawn.density} />
              <DetailsItem detail="Теневыносливость" value={lawn.shade_tolerance} />
              <DetailsItem detail="Период высадки" value={plantingPeriod} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
