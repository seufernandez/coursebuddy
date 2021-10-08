import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  matchExactHref?: boolean;
  activeClassName: string;
}

export const ActiveLink = ({
  matchExactHref = false,
  activeClassName,
  children,
  ...rest
}: ActiveLinkProps) => {
  const router = useRouter();
  const isActive = matchExactHref
    ? router.asPath === rest.href
    : router.asPath.startsWith(String(rest.href));

  const className = isActive ? activeClassName : '';

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
};
