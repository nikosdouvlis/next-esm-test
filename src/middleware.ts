// Case 1:
// Uncomment the following lines and run `npm run build:yalc` after following the setup in README
// The middleware function will be 180KB
// This is  using 'next/server'

import { authMiddleware } from "mylib";

export default authMiddleware((request, event) => {
  console.log("hello from authmiddleware");
});

// Case 2:
// Uncomment the following lines and run `npm run build:yalc` after following the setup in README
// The middleware function will be 17KB
// This is not using 'next/server'

// import { authMiddlewareNoImport } from "mylib";
//
// export default authMiddlewareNoImport((request, event) => {
//   console.log("hello from authmiddleware");
// });
