import { SVGProps } from 'react';

export interface HeaderProps {
  breadcrumbItems: Array<{
    title: string;
    href?: string;
    // icon?: React.ComponentType<any>;
    icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  }>;
}
