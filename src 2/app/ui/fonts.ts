import localFont from 'next/font/local';

// Fonts are self-hosted (woff2 files committed under ./fonts/files) so the
// build/dev compile never reaches out to Google Fonts at compile time.
// This removes the network dependency that previously made `next dev`/`next build`
// hang for minutes (or fail entirely) when Google Fonts was unreachable.

export const ebGaramond = localFont({
  src: [
    {
      path: './fonts/files/EBGaramond-latin.woff2',
      weight: '400 800',
      style: 'normal',
    },
    {
      path: './fonts/files/EBGaramond-italic-latin.woff2',
      weight: '400 800',
      style: 'italic',
    },
  ],
  variable: '--font-garamond',
  display: 'swap',
});

export const spaceGrotesk = localFont({
  src: './fonts/files/SpaceGrotesk-latin.woff2',
  weight: '300 700',
  style: 'normal',
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const inter = localFont({
  src: './fonts/files/Inter-latin.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-inter',
  display: 'swap',
});
