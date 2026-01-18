import { Logo } from "@/components/logo";

export function Brand() {
  return (
    <div className="flex items-center gap-2">
      <Logo />
      <h1 className="font-headline text-lg font-bold text-white">SourceWise</h1>
    </div>
  );
}
