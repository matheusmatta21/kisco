export function FallbackBody({ message }: { message: string }) {
  return (
    <div className="flex h-14 items-center text-xs text-white/50">
      {message}
    </div>
  );
}
