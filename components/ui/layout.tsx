/**
 * Layout Component
 * Shared layout with navigation
 */

import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/authStore';
import { authService } from '@/lib/api/auth';
import { APP_CONFIG, ROUTES } from '@/common/constants';

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
}

export function Layout({ children, title, showHeader = true }: LayoutProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      router.push(ROUTES.LOGIN);
    } catch (err) {
      console.error('Logout failed:', err);
      logout();
      router.push(ROUTES.LOGIN);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-8">
                <h1
                  className="text-2xl font-bold cursor-pointer"
                  onClick={() => router.push(ROUTES.HOME)}
                >
                  {title || APP_CONFIG.SHORT_NAME}
                </h1>
                <nav className="hidden md:flex gap-4">
                  <Button
                    variant={router.pathname === ROUTES.HOME ? 'default' : 'ghost'}
                    onClick={() => router.push(ROUTES.HOME)}
                  >
                    Home
                  </Button>
                  <Button
                    variant={router.pathname.startsWith('/records') ? 'default' : 'ghost'}
                    onClick={() => router.push(ROUTES.VIEW_RECORDS)}
                  >
                    Records
                  </Button>
                  <Button
                    variant={router.pathname.startsWith('/fees') ? 'default' : 'ghost'}
                    onClick={() => router.push(ROUTES.ADD_FEE)}
                  >
                    Fees
                  </Button>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                {user && (
                  <span className="text-sm text-gray-600 hidden sm:inline">
                    {user.name}
                  </span>
                )}
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
}
