## Setup
1. Build and publish `mylib` locally using yalc
```
cd mylib
npm i 
npm run build:yalc
```
2. Setup next app
```
npm i
npm run yalc:install
```


## Issue 1 - next/og bundling
This example uses a sample `mylib` package. Its source code is located in `./mylib`. It's a hybrid ESM/CJS package and it should be completely treeshakable. 
### Test 1 - middleware uses mock authMiddleware that imports NextResponse and NextRequest from 'next/server'
Open `src/middleware.ts` and follow the instructions.
Building the app while using `authMiddleware` will result in the following:
```
- info Creating an optimized production build ..<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (659kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
...
ƒ Middleware                               180 kB
```

### Test 2 - middleware uses mock authMiddlewareNoImport that uses no imports from 'next/server'
Open `src/middleware.ts` and follow the instructions.
Building the app while using `authMiddlewareNoImport` will result in the following:
```
- info Creating an optimized production build ..<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (659kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
...
ƒ Middleware                               17.5 kB
```
(Notice the warnings still exist BUT the middleware size is different)





## Issue 2 - defining `"type": "module"` in the lib's package.json affects ESM/CJS interopability
This example uses the mock `currentUser` and `currentUserDefaultImport`  functions from the `mylib` package. Thess functions simply import `NextRequest`, `NextResponse` from `next/server` as well as `headers` from `next/headers` and simply log their runtime values.

`currentUser` imports the helpers using the recommended approach: 
```ts
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
```
Logging the actual runtime values, however, results in: 
```
currentUser runtime import values {
  NextResponse: { default: [Getter] },
  NextRequest: { default: [Getter] },
  headers: [Function: headers]
}
```
(notice that NextResponse is the default export instead of the named NextResponse function)

On the other hand, `currentUserDefaultImport` imports the helpers using the recommended approach:
```ts
import def, { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
```
The actual runtime values are:
```
currentUserDefaultImport runtime import values {
  def: {
    NextRequest: [class NextRequest extends Request],
    NextResponse: [class NextResponse extends Response],
    ImageResponse: [class ImageResponse],
    userAgentFromString: [Function: userAgentFromString],
    userAgent: [Function: userAgent]
  },
  NextResponse: [class NextResponse extends Response],
  NextRequest: [class NextRequest extends Request],
  headers: [Function: headers]
}
```
(notice that NextResponse is the named export)

In order to test this, please see the instructions in `src/layout.tsx`. Notice that this happens when the imported lib defined `"type": "module"`. Feel free to remove the corresponding lines from `mylib/package.esm.json`, rebuild, and see the difference. 