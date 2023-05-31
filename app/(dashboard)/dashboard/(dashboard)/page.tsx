import Link from "next/link";

export default () => {
  return (
    <div className="min-h-screen w-full text-white items-center">
      <div className="p-6">
        <h2 className="text-xl">
          Check out this blog post on how to use the demo for dister{" "}
          <Link
            href="/"
            className="orangeText underline p-2 bg-white text-black m-2 rounded-xl"
          >
            Tutorial
          </Link>
        </h2>
      </div>
    </div>
  );
};
