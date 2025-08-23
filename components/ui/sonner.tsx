"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      richColors
      closeButton
      duration={4000}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "#f0fdf4",
          "--success-text": "#166534",
          "--success-border": "#bbf7d0",
          "--error-bg": "#fef2f2",
          "--error-text": "#dc2626",
          "--error-border": "#fecaca",
          "--warning-bg": "#fffbeb",
          "--warning-text": "#d97706",
          "--warning-border": "#fed7aa",
          "--info-bg": "#eff6ff",
          "--info-text": "#2563eb",
          "--info-border": "#bfdbfe",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          background: 'var(--normal-bg)',
          color: 'var(--normal-text)',
          border: '1px solid var(--normal-border)',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          fontSize: '14px',
          fontWeight: '500',
          padding: '16px',
          maxWidth: '400px',
          zIndex: 9999,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
