import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
    // beforeAuth: (req) => {
    //     // Execute next-intl middleware before Clerk's auth middleware
    //     console.log("beforeAuth");
    //   },
     
      // Ensure that locale specific sign-in pages are public
      publicRoutes: ["/", "/:locale/sign-in","/api/trpc/posts.getAll"],
    });
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
 