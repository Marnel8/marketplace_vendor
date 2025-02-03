import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center bg-white transition-all duration-500 ease-out dark:bg-black">
      <Image
        src="/images/loader/spartan-loader.gif"
        alt="loader"
        width={500}
        height={500}
        className="dark:bg-boxdark-2"
      />
    </div>
  );
}
