import { Lawn } from '@canadian-lawn/api';
import { Typography } from '@canadian-lawn/ui-kit';

export const AboutLawn = ({ lawn }: { lawn?: Lawn }) => {
  const DetailsItem = ({ detail, value }: { detail?: string; value?: string | number | null }) =>
    value && (
      <div className="flex">
        <Typography color="secondary-grey" className="flex-[0.5]">
          {detail}
        </Typography>
        <Typography>{value}</Typography>
      </div>
    );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-8">
        <Typography view="card-price" weight="bold">
          Описание
        </Typography>
        <Typography>{lawn?.description}</Typography>
      </div>
      <div className="flex">
        <div className="flex flex-[0.5] flex-col gap-8">
          <Typography view="card-price" weight="bold">
            Характеристики
          </Typography>
          <div className="flex flex-col gap-3">
            <DetailsItem detail="Сезонность" value={lawn?.seasonality} />
            <DetailsItem detail="Время первых всходов,дни" value={lawn?.germinationTime} />
            <DetailsItem
              detail="Время до полного покрытия участка,недели"
              value={lawn?.fullCoverTime}
            />
            <DetailsItem detail="Плотность (количество побегов на 1 м²)" value={lawn?.density} />
            <DetailsItem detail="Морозоустойчивость" value={lawn?.frostResistance} />
            <DetailsItem detail="Жароустойчивость" value={lawn?.heat_resistance} />
          </div>
        </div>
      </div>
    </div>
  );
};
