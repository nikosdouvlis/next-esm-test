export { authMiddleware } from "./authMiddleware";
export { authMiddlewareNoImport } from "./authMiddlewareNoImport";
export { unusedFun } from "./unusedFun";
export { currentUser } from "./currentUser";
export { currentUserDefaultImport } from "./currentUserDefaultImport";

// Uncomment this export. Notice that the file that imports #crypto is located in a deeper directory.
// export { nestedCryptoTest } from "./nested/nested";

// @ts-ignore
import cryptoTest from "#crypto";

export { cryptoTest };
