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
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-cocktail-hero font-display from-primary to-secondary bg-gradient-to-r bg-clip-text font-bold text-transparent">
          {title}
        </h1>
        {!!subtitle && (
          <h2 className="text-recipe-instruction text-foreground/70 font-sans tracking-wide">
            {subtitle}
          </h2>
        )}
      </div>
      {!!toolbar && <div className="ml-6 flex-shrink-0">{toolbar}</div>}
    </div>
  );
}
