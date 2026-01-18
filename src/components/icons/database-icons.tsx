import type { SVGProps } from "react";

export function PostgresqlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 3.5c-3.4 3.4-3.4 8.9 0 12.3" />
      <path d="M18 20.5c-3.4-3.4-3.4-8.9 0-12.3" />
      <path d="M9.5 20.5c3.4-3.4 3.4-8.9 0-12.3" />
      <path d="M6 3.5c3.4 3.4 3.4 8.9 0 12.3" />
      <path d="M15 3h1" />
      <path d="M15 21h1" />
      <path d="M9 3h1" />
      <path d="M9 21h1" />
      <path d="M3 9v1" />
      <path d="M21 9v1" />
      <path d="M3 15v1" />
      <path d="M21 15v1" />
      <path d="M12 3v18" />
    </svg>
  );
}

export function MysqlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 14.286V21" />
      <path d="M6.918 14.89a6.419 6.419 0 0 1 9.632-3.444" />
      <path d="M6.918 9.11a6.419 6.419 0 0 1 10.164 0" />
      <path d="M17.082 9.11a6.419 6.419 0 0 0-10.164 0" />
      <path d="M14 3v2.38" />
      <path d="M17.657 5.343l-1.683 1.683" />
      <path d="M12 21a9 9 0 0 0 9-9" />
      <path d="M3 12a9 9 0 0 0 4.101 7.422" />
    </svg>
  );
}

export function FirestoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.28 2.5l-6.2 10.3c-.4.7.1 1.6.9 1.6h12.3c.7 0 1.3-.8 1-1.5L10 2.6c-.4-.8-1.3-.8-1.72 0Z" />
      <path d="m15.7 21.5 6.2-10.3c.4-.7-.1-1.6-.9-1.6H8.7c-.7 0-1.3.8-1 1.5L14 21.4c.4.8 1.3.8 1.7 0Z" />
    </svg>
  );
}
