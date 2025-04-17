import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
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
