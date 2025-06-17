import { usePartners } from '@/hooks/usePartners';
import { featureFilter, partnerLimit } from '@/utils/filters';
import { Container } from '@/components/layout/Container';
import { PartnerCard } from '@canadian-lawn/ui-kit';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { getImageUrl } from '@/utils/image';

export const Partners: React.FunctionComponent = () => {
  const { useHook: partners } = usePartners({
    limit: partnerLimit,
    filter: featureFilter,
  });
  const { data: partnersData } = partners();

  console.log('partnersData', partnersData);

  return (
    <Container backgroundColor="light-green">
      <SectionWrapper
        backgroundColor="light-green"
        headline="Более 100 бизнес-клиентов Уже доверяют нам"
        className="text-baseWhite"
      >
        <div className="flex w-full flex-col gap-3 md:flex-row md:gap-5">
          {partnersData?.data.map(({ name, logo }) => (
            <PartnerCard
              className="flex-1 grow"
              title={name}
              image={getImageUrl(logo?.url || '')}
            />
          ))}
        </div>
      </SectionWrapper>
    </Container>
  );
};
