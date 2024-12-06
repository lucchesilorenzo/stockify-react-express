import { AUTH_HEADING_TEXTS } from "@/lib/constants";

type AuthHeadingProps = {
  authType: "signup" | "login";
};

export default function AuthHeading({ authType }: AuthHeadingProps) {
  return (
    <div className="grid gap-2 text-center">
      <h1 className="text-3xl font-bold">
        {AUTH_HEADING_TEXTS[authType].title}
      </h1>
      <p className="text-balance text-muted-foreground">
        {AUTH_HEADING_TEXTS[authType].description}
      </p>
    </div>
  );
}
