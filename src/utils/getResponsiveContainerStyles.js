import { ANCHOR_LEFT } from '../constants';

export default function getResponsiveContainerStyles(
  anchorDirection,
  currentOffset,
  containerEdge,
  margin,
) {
  const windowWidth = typeof document !== 'undefined' && document.body !== 'undefined' ? document.body.clientWidth : 0;
  const calculatedOffset = anchorDirection === ANCHOR_LEFT
    ? windowWidth - containerEdge
    : containerEdge;
  const calculatedMargin = margin || 0;

  return {
    [anchorDirection]: Math.min(currentOffset + calculatedOffset - calculatedMargin, 0),
  };
}
