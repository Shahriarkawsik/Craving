import { NextResponse } from 'next/server';
// import connectDB from '@/utils/connectDB';
import dbConnect from '@/lib/dbConnect';
// import User from '@/models/User';
// import { sendResetEmail } from '@/lib/sendEmail';
// import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'ইমেইল দিন' }, { status: 400 });
    }

    // const user = await User.findOne({ email });

    // if (!user) {
    //   return NextResponse.json({ error: 'এই ইমেইলের কোনো ইউজার পাওয়া যায়নি' }, { status: 404 });
    // }

    // টোকেন তৈরি ও সেট করা
    // const token = crypto.randomBytes(32).toString('hex');
    // const expireTime = Date.now() + 1000 * 60 * 60; // 1 ঘণ্টা

    // user.resetPasswordToken = token;
    // user.resetPasswordExpire = expireTime;
    // await user.save();

    // // রিসেট লিঙ্ক পাঠানো
    // const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
    // await sendResetEmail(user.email, resetUrl);

    return NextResponse.json({ message: 'রিসেট লিঙ্ক পাঠানো হয়েছে' });
  } catch (err) {
    console.error('Reset Error:', err);
    return NextResponse.json({ error: 'সার্ভারে সমস্যা হয়েছে' }, { status: 500 });
  }
}
