import { withAuth } from "next-auth/middleware";

// A bare `export { default } from "next-auth/middleware"` would redirect
// unauthenticated visitors to NextAuth's default /api/auth/signin page —
// this points it at our own styled /login page instead.
export default withAuth({
  pages: {
    signIn: "/login"
  }
});

export const config = {
  matcher: ["/dashboard/:path*"]
};
