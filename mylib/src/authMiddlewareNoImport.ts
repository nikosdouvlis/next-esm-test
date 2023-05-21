import type { NextMiddleware } from "next/server";

export const authMiddlewareNoImport = (
  handler: NextMiddleware
): NextMiddleware => {
  return (request, event) => {
    console.log("authMiddlewareNoImport");
    return handler(request, event);
  };
};
