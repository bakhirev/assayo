import { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode | string | null;
  className?: string;
}
