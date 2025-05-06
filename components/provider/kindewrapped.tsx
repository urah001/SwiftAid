// components/providers/kinde-wrapper.tsx
"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

export const KindeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <KindeProvider>
      {children}
    </KindeProvider>
  );
};
