import type { Metadata } from 'next';

import { siteUrl } from './seo';

export const socialImage = {
  url: new URL('/git-hygiene-og.png', `${siteUrl}/`).toString(),
  width: 1280,
  height: 640,
  alt: 'git-hygiene zero-dependency metadata validator for modern Git workflows',
} as const;

interface PageMetadataInput {
  title: string;
  description: string;
  path: `/${string}`;
  absoluteTitle?: boolean;
}

function absoluteUrl(path: `/${string}`) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      type: 'website',
      url,
      siteName: 'git-hygiene',
      title,
      description,
      locale: 'en_US',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
