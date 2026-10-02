import connDB from '@/config/db';
import Product from '@/models/Product';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
const SECRET='cl41m-c4p1t-7q2z9';
export async function GET(request){
  const {searchParams}=new URL(request.url);
  if(searchParams.get('secret')!==SECRET) return NextResponse.json({success:false},{status:403});
  const {userId}=getAuth(request);
  if(!userId) return NextResponse.json({success:false,message:'login dulu di sitenya'});
  await connDB();
  const r=await Product.updateMany({userId:'seed_seller'},{$set:{userId}});
  return NextResponse.json({success:true,claimed:r.modifiedCount,userId});
}
