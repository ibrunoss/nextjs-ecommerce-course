import { NextResponse, NextRequest } from "next/server";
import auth from "next-auth";

import { authConfig } from "@/auth.config";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth(authConfig).auth();

  console.log(session);
  // Check for session cart cookie
  if (!request.cookies.get("sessionCartId")) {
    // Generate new session cart id cookie
    const sessionCartId = crypto.randomUUID();

    // Clone the req headers
    const newRequestHeaders = new Headers(request.headers);

    // Create new response and add the new headers
    const response = NextResponse.next({
      request: {
        headers: newRequestHeaders,
      },
    });

    // Set newly generated sessionCartId in the response cookies
    response.cookies.set("sessionCartId", sessionCartId);
    return response;
  }
  return NextResponse.next();
}
