import { ethers } from "ethers";
import initializeFirebaseServer from "@/lib/initFirebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { address, signature } = await req.json();
  const message = `Sign this message to authenticate with your Ethereum address ${address}`;
  const recoveredAddress = ethers.verifyMessage(message, signature);

  if (
    !recoveredAddress ||
    recoveredAddress.toLowerCase() !== address.toLowerCase()
  ) {
    return NextResponse.error();
  }

  const { auth } = initializeFirebaseServer();
  const token = await auth.createCustomToken(address);
  return NextResponse.json({ token });
}
