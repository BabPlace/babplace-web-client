import { Dataset } from '@teamapdan/weirdchart';
import { RestaurantSatisfaction, SatisfactionResponse } from '@/interfaces';
import { myPalette } from '@/theme';

export default function makeDataset(restaurantSatisfaction: RestaurantSatisfaction): Dataset[] {
  const dataset: Dataset[] = [];
  const satisfactions: SatisfactionResponse[] = ['good', 'bad', 'veryGood', 'veryBad'];
  satisfactions.forEach((satisfaction) => {
    if (restaurantSatisfaction[satisfaction] !== undefined) {
      dataset.push({
        label: satisfaction,
        value: restaurantSatisfaction[satisfaction]?.length ?? 0,
        color: myPalette.light[satisfaction],
      });
    }
  });
  return dataset;
}
