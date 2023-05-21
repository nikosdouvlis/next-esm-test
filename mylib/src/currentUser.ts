import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export const currentUser = async () => {
  // Log the runtime value of the imports
  console.log("currentUser runtime import values", {
    NextResponse,
    NextRequest,
    headers,
  });

  // const hdrs = headers();
  // const res = new NextResponse();
  // const req = new NextRequest("https://placeholder.com");
  // console.log({ hdrs: !!hdrs, res: !!res, req: !!req });

  return { firstName: "hello" };
};
