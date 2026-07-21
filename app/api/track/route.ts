import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackingNumber = searchParams.get('number');

  if (!trackingNumber) {
    return NextResponse.json({ error: 'Tracking number required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('shipments')
    .select('*')
    .eq('tracking_number', trackingNumber.toUpperCase())
    .single();

  if (error) {
    console.error('Supabase error:', error); // 👈 this will show the real reason in terminal
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ shipment: data });
}