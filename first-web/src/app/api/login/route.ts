// import { NextResponse } from "next/server";
// import { generateToken } from "../../../../lib/auth";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   // Demo credentials
//   if (email === "test@exampleas.com" && password === "123") {
//     const token = generateToken({ email });

//     const res = NextResponse.json({ success: true });
//     res.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       maxAge: 60 * 60, // 1 hour
//     });
//     return res;
//   }

//   return NextResponse.json(
//     { success: false, message: "Invalid credentials" },
//     { status: 401 }
//   );
// }
