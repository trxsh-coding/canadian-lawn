import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import Logo from '@/assets/img/logo.svg';
import { Typography } from '@canadian-lawn/ui-kit';
export const Footer = () => {
  return (
    <div className="bg-primary">
      <Container backgroundColor="green" className="rounded-tl-3xl rounded-tr-3xl">
        <SectionWrapper className="bg-secondary py-section rounded-t-3xl" withLink={false}>
          <div className="text-baseWhite flex w-full flex-col items-center gap-10 lg:px-10">
            <Logo className="pty-section" />
            <div className="hidden w-full justify-between lg:!flex">
              <div className="!text-baseWhite flex flex-col gap-[25px]">
                <Typography view="small" color="base-white" className="uppercase">
                  Семена
                </Typography>
                <Typography view="small">Семена Оптом</Typography>
              </div>
              <div className="flex flex-col gap-[25px] px-5">
                <Typography view="small" className="uppercase">
                  Техника
                </Typography>
                <Typography view="small">Техника для производства рулонного газона</Typography>
                <Typography view="small">Газонокосилки</Typography>
                <Typography view="small">Техника для ухода за газонами</Typography>
              </div>
              <div className="flex flex-col gap-[25px]">
                <Typography view="small">ОТЗЫВЫ</Typography>
                <Typography view="small">ПАРТНЁРЫ</Typography>
                <Typography view="small">О НАС</Typography>
              </div>
              <div className="flex flex-col gap-[25px]">
                <Typography view="small">КОНТАКТЫ</Typography>
                <Typography view="small">FAQ</Typography>
                <Typography view="small">БЛОГ</Typography>
              </div>
            </div>
            <div className="flex flex-col gap-5 text-center lg:hidden">
              <div className="flex flex-col gap-2">
                <Typography view="small">Для заявок и коммерческих запросов</Typography>
                <Typography view="large1">info@gazon-21vek.ru</Typography>
              </div>
              <div className="flex flex-col gap-2">
                <Typography view="small">Для предложений услуг и рекламы</Typography>
                <Typography view="large1">partners@gazon-21vek.ru</Typography>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-5 md:flex-row lg:w-full lg:justify-between lg:gap-2">
              <Typography className="!font-light" textAlign="center" family="golosBold">
                © Газоны канады
              </Typography>
              <Typography className="!font-light" family="golosBold" textAlign="center">
                Политика конфиденциальности
              </Typography>
            </div>
          </div>
        </SectionWrapper>
      </Container>
    </div>
  );
};
