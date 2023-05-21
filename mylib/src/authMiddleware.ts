import type { NextMiddleware } from "next/server";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = (handler: NextMiddleware): NextMiddleware => {
  return (request, event) => {
    const req = new NextRequest("https://placeholder.com");
    const res = new NextResponse();
    console.log({ req, res });
    return handler(request, event);
  };
};
