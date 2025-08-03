export const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <section>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </section>
  );
};
