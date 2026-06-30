
export interface FooterProps {}

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-16 right-0 w-[calc(100%-4rem)] pb-base flex justify-center text-center px-md z-20 pointer-events-none">
      <p className="font-body-sm text-body-sm text-on-surface-variant pb-md opacity-60">
        AI can make mistakes. Please double-check responses.
      </p>
    </footer>
  );
}
