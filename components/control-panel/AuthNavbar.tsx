import Image from "next/image";
import Link from "next/link";

const AuthNavbar = () => {
  return (
    <header className="px-4 py-6 sm:px-4 sm:py-5 lg:px-12 bg-primary">
      <div className="lg:max-w-6xl w-full mx-auto">
        <div className="flex items-end justify-between w-full">
          <div>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Chaiyo Ceylon"
                width={150}
                height={75}
              />
            </Link>
          </div>
          <div className="text-white font-bold text-2xl">
            <h2 className="flex sm:hidden">CMS</h2>
            <h2 className="hidden sm:flex">Content Management System</h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;
