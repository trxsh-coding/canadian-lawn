import { Card } from '@/lib/components/Card';
import TestImage from '@/assets/images/test2.jpeg';

function App() {
  return (
    <div className="ui:bg-secondary ui:h-[100vh] ui:w-[100vh] ui:flex ui:flex-col">
      <Card
        title="Трактор Lovol TE404 Generation 3, 2023"
        subtitle="Колёсный, полный привод, 333 моточаса, 80 л.с."
        price={1000}
        image={TestImage}
      />
    </div>
  );
}

export default App;
