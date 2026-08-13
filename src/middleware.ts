import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isApi = pathname.startsWith("/api");
  const isFile = PUBLIC_FILE.test(pathname);
  const isAuth = pathname.startsWith("/auth");

  if (!isApi && !isFile && !isAuth) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && serviceKey) {
      try {
        const supabase = createClient(url, serviceKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        await supabase.from("page_views").insert({
          path: pathname,
          referrer: request.headers.get("referer")?.slice(0, 2048) ?? null,
          user_agent: request.headers.get("user-agent")?.slice(0, 512) ?? null,
        });
      } catch (e) {
        console.error("page view log error:", e);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
