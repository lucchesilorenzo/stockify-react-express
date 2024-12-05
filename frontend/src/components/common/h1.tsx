type H1Props = {
  children: React.ReactNode;
};

export default function H1({ children }: H1Props) {
  return (
    <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
      {children}
    </h1>
  );
}
