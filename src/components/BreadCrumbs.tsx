import { ReactNode } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
type BreadCrumbsProps = {
  children?: ReactNode;
  pathList?: { label: string; path: string }[];
};

export default function BreadCrumbs({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  pathList = [{ label: `Home`, path: `/` }],
}: BreadCrumbsProps) {
  return (
    <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
      {pathList.map(({ label, path }) => (
        <BreadcrumbItem key={path + label}>
          <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
