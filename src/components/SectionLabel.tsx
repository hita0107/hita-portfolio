type Props = {
  children: React.ReactNode;
  index?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionLabel({ children, index, tone = "light", className = "" }: Props) {
  const line = tone === "dark" ? "bg-sage-300" : "bg-sage-500";
  const text = tone === "dark" ? "text-sage-100" : "text-sage-700";
  return (
    <p className={`t-label flex items-center gap-3 ${text} ${className}`}>
      <span aria-hidden className={`h-px w-12 ${line}`} />
      <span>{children}</span>
      {index && <span className="opacity-60">{index}</span>}
    </p>
  );
}
