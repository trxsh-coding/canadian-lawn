import './App.css';
import { Typography } from '@/lib/components/Typography';

function App() {
  return (
    <div className="App ui:bg-secondaryRed space-y-4 p-4">
      <Typography view="heading1" color="primary" Element="h1">
        Заголовок Heading1 — primary
      </Typography>

      <Typography view="heading2" color="secondary" Element="h2">
        Заголовок Heading2 — secondary
      </Typography>

      <Typography view="regular" color="base-grey" Element="p">
        Обычный текст Regular — base-grey
      </Typography>

      <Typography view="button" color="tertiary" weight="semibold" Element="span">
        Кнопочный стиль Button — tertiary, semibold
      </Typography>

      <Typography view="card-price" color="primary" Element="div" textAlign="right">
        Цена: 999₽ — card-price, base-black, right
      </Typography>

      <Typography view="small" color="base-white" whiteSpace="nowrap" Element="label">
        Мелкий текст Small — base-white, nowrap
      </Typography>
    </div>
  );
}

export default App;
