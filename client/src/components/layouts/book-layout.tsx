type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const BookLayout = ({ title, children }: LayoutProps) => {
  return (
    <section className="bg-green-200">
      <h1>{title}</h1>
      <div>{children}</div>
    </section>
  );
};
