import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('shipments')
    .select('*');

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const activeShipments = data.filter((s) => s.status === 'in_transit');

  const uniqueCities = new Set(
    data.flatMap((s) => [s.origin_city, s.destination_city, s.current_city])
  );

  const deliveredCount = data.filter((s) => s.status === 'delivered').length;
  const delayedCount = data.filter((s) => s.status === 'delayed').length;
  const completedCount = deliveredCount + delayedCount;
  const onTimeRate = completedCount > 0
    ? (((completedCount - delayedCount) / completedCount) * 100).toFixed(1)
    : '100.0';

  const stats = {
    activeShipments: activeShipments.length,
    citiesServed: uniqueCities.size,
    onTimeRate,
  };

  return NextResponse.json({ shipments: activeShipments, stats });
}
