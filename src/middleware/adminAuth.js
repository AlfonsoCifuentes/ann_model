/**
 * ADMIN API MIDDLEWARE
 * Middleware para proteger las rutas de API del panel de administración
 */

import { NextResponse } from 'next/server';

export function adminAuthMiddleware(request) {
  // Lista de rutas que requieren autenticación
  const protectedRoutes = [
    '/api/photos/upload',
    '/api/photos/hero',
    '/api/photos/featured',
    '/api/photos/manage',
    '/api/blog' // Solo para POST, PUT, DELETE
  ];

  const { pathname } = request.nextUrl;
  
  // Verificar si la ruta requiere protección
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Para métodos que modifican datos, requerir autenticación
    const method = request.method;
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      const adminAuth = request.headers.get('x-admin-auth');
      
      if (adminAuth !== 'authenticated') {
        return NextResponse.json(
          { error: 'Acceso no autorizado' },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

// Configuración para el middleware
export const config = {
  matcher: [
    '/api/photos/:path*',
    '/api/blog/:path*'
  ]
};
