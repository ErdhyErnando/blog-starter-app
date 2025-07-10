import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-20 mt-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight flex items-center">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <nav className="mt-4 md:mt-0">
        <Link
          href="/dynamic-testing"
          className="text-sm md:text-base font-medium hover:underline text-blue-600 dark:text-blue-400"
        >
          Dynamic Testing
        </Link>
      </nav>
    </div>
  );
};

export default Header;
