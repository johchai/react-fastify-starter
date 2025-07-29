type LayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: LayoutProps) => {
  return (
    <section className="bg-green-200">
      <div>{children}</div>
    </section>
  );
};
