import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    // If authenticated and on landing page
    if (auth.userId && auth.isPublicRoute) {
      // redirect to select organization
      let path = "/select-org";
      // if we have user organization id redirect to the org page
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      // redirecting
      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    // if not auth and not on public route redirect to sign in page
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: req.url, // the url the user tried to access before he was redirected
      });
    }

    // if authenticated and there is no org id and also the user not on the the select organization page
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);
      // redirect to select organization
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
