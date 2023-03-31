export default function directionToSatisfaction(direction: string) {
  switch (direction) {
    // case 'up':
    //   return 1;
    case 'down':
      return 'VERYGOOD';
    case 'left':
      return 'BAD';
    case 'right':
      return 'GOOD';
    default:
      return 'GOOD';
  }
}
