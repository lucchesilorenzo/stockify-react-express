export default function AuthImage() {
  return (
    <div className="hidden bg-muted lg:block">
      <img
        src="/stockify-preview.jpg"
        alt="Stockify Preview"
        width="1920"
        height="1080"
        className="h-screen w-full object-cover dark:brightness-[0.8]"
      />
    </div>
  );
}
