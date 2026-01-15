import localFont from "next/font/local";

export const notoSansMyanmar = localFont({
  variable: "--font-noto",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Noto_Sans_Myanmar/NotoSansMyanmar-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Noto_Sans_Myanmar/NotoSansMyanmar-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Noto_Sans_Myanmar/NotoSansMyanmar-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const pyidaungsu = localFont({
  variable: "--font-pyidaungsu",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Pyidaungsu/Pyidaungsu-2.5.3_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Pyidaungsu/Pyidaungsu-2.5.3_Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
});
