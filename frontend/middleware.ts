import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // This is a simplified middleware. In production, you'd verify the token server-side
    // For now, we'll let the client-side AuthContext handle redirects
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
