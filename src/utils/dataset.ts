import { Dataset } from '@teamapdan/weirdchart';
import { Satisfaction, RestaurantSatisfaction } from '@/pages/interfaces';
import { Theme } from '@mui/material';

export default function makeDataset(restaurantSatisfaction: RestaurantSatisfaction, theme: Theme): Dataset[] {
  const dataset: Dataset[] = [];
  const satisfactions: Satisfaction[] = ['good', 'bad', 'verygood', 'verybad'];
  satisfactions.forEach((satisfaction) => {
    if (restaurantSatisfaction[satisfaction] !== undefined) {
      dataset.push({
        label: satisfaction,
        value: restaurantSatisfaction[satisfaction]?.length ?? 0,
        color: theme.myPalette.light[satisfaction],
      });
    }
  });
  return dataset;
}
