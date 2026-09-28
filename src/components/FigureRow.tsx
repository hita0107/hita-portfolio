import { images, type ImageId } from "@/content/images";
import { Figure } from "./Figure";

type Props = {
  ids: ImageId[];
  sizes: string;
  className?: string;
};

/** Lays images out in one row at a shared height: each item grows in proportion to its aspect ratio. */
export function FigureRow({ ids, sizes, className = "" }: Props) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      {ids.map((id) => (
        <div key={id} className="min-w-0" style={{ flex: `${images[id].w / images[id].h} 1 0%` }}>
          <Figure id={id} group={ids} sizes={sizes} />
        </div>
      ))}
    </div>
  );
}
