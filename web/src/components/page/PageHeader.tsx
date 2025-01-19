interface PageHeaderProps {
  title: string;
  subtitle?: string;
  toolbar?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  toolbar,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex">
      <div>
        <h1 className="text-4xl text-primary">{title}</h1>
        {!!subtitle && <h2 className="text-gray-500">{subtitle}</h2>}
      </div>
      {!!toolbar && <div className="ml-auto">{toolbar}</div>}
    </div>
  );
}
