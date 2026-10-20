import NextImage, { type ImageProps } from "next/image";
import { publicPath } from "@/lib/publicPath";

export default function SiteImage(props: ImageProps) {
  const src = typeof props.src === "string" ? publicPath(props.src) : props.src;
  return <NextImage {...props} src={src} />;
}
