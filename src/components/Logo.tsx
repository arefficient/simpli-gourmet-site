import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-block ${className}`}>
      <Image
        src="/logo.png"
        alt="Simpli Gourmet"
        width={756}
        height={314}
        className="h-10 w-auto object-contain transition-opacity group-hover:opacity-90 md:h-12"
        priority
      />
    </Link>
  );
}
