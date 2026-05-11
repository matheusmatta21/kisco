import { SubsectionTitle } from "./SubsectionTitle";

export function PeriodGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <SubsectionTitle title={title} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {children}
      </div>
    </div>
  );
}
