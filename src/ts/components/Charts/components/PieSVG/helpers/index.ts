function polarToCartesian(x: number, y: number, r: number, degrees: number) {
  const radians = degrees * Math.PI / 180;
  return [
    x + (r * Math.cos(radians)),
    y + (r * Math.sin(radians)),
  ];
}

export function getSegmentPath(
  x: number,
  y: number,
  r0: number,
  r1: number,
  d0: number,
  d1: number,
) {
  const arc = Math.abs(d0 - d1) > 180 ? 1 : 0;
  const point = (radius: number, degree: number) =>
    polarToCartesian(x, y, radius, degree)
      .map(n => n.toPrecision(5))
      .join(',');
  return [
    `M${point(r0, d0)}`,
    `A${r0},${r0},0,${arc},1,${point(r0, d1)}`,
    `L${point(r1, d1)}`,
    `A${r1},${r1},0,${arc},0,${point(r1, d0)}`,
    'Z',
  ].join('');
}
