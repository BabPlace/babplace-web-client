export default function directionToSatisfaction(direction: string) {
  switch (direction) {
    // case 'up':
    //   return 1;
    // case 'down':
    //   return -1;
    case 'left':
      return 'bad';
    case 'right':
      return 'good';
    default:
      return 'good';
  }
}
