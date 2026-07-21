// Simple equirectangular projection: converts real coordinates to
// percentage position on a flat map div
export function projectToXY(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

export function modeIcon(mode: string) {
  switch (mode) {
    case 'ocean': return { icon: '🚢', label: 'Ocean Freight' };
    case 'air': return { icon: '✈️', label: 'Air Freight' };
    case 'truck': return { icon: '🚛', label: 'Last Mile Delivery' };
    default: return { icon: '📦', label: 'Shipment In Transit' };
  }
}
