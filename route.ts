import { NextResponse } from 'next/server';
import { verifyCloudProof } from '@worldcoin/idkit';

export async function POST(req: Request){
  const proof = await req.json();
  try{
    const verifyRes = await verifyCloudProof(proof, { action: process.env.NEXT_PUBLIC_WORLD_ACTION!, app_id: process.env.NEXT_PUBLIC_WORLD_APP_ID! });
    if(verifyRes.success) return NextResponse.json({ verified: true });
    return NextResponse.json({ verified: false });
  }catch(e){
    console.error('verify error', e);
    return NextResponse.json({ verified: false, error: 'Verification failed' });
  }
}
