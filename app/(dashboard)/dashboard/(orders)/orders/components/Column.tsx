export default function Column({
  title,
  quant,
  children,
}: {
  title: string;
  quant: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <h2 className="text-2xl">
        {title} <span className="font-light text-gray-300">({quant})</span>{" "}
      </h2>
      <div className="space-y-4 w-full mx-auto max-h-[calc(100vh-15rem)] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
