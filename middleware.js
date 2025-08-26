/**
 * NEXT.JS MIDDLEWARE
 * Middleware global para manejar autenticación y protección de rutas
 */

import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Proteger rutas de API administrativas
  const adminApiRoutes = [
    '/api/photos/upload',
    '/api/photos/hero', 
    '/api/photos/featured',
    '/api/photos/manage'
  ];

  const isBlogApiRoute = pathname.startsWith('/api/blog');
  const isAdminApiRoute = adminApiRoutes.some(route => pathname.startsWith(route));

  // Para rutas de API que modifican datos, verificar autenticación
  if (isAdminApiRoute || (isBlogApiRoute && request.method !== 'GET')) {
    const adminAuth = request.headers.get('x-admin-auth');
    
    if (adminAuth !== 'authenticated') {
      return NextResponse.json(
        { error: 'Acceso no autorizado', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/photos/:path*',
    '/api/blog/:path*'
  ]
};
