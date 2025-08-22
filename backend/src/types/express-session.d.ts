import "express-session";

declare module "express-session" {
  interface SessionData {
    userToken?: string;
    userId?: string; // ya number, jo bhi aapka User ID ka type ho
  }
}
