import Image from "next/image";
import Link from "next/link";

const Card = ({
  name,
  slug,
  arabicName,
  lifespan,
  origin,
  majorWork,
  image,
}) => {
  return (
    <div className="bg-white border border-gray-400 shadow-md w-full max-w-sm rounded-lg overflow-hidden mx-auto h-full flex flex-col">
      <div className="aspect-3/2 relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 text-center flex flex-col flex-1">
        <h3 className="text-slate-900 text-xl font-semibold">
          {name}
        </h3>

        <p className="text-gray-500">{arabicName}</p>

        <p className="mt-2 text-sm text-gray-600">
          {lifespan}
        </p>

        <p className="text-sm text-gray-600">
          {origin}
        </p>

        <p className="mt-3 text-sm text-gray-500 flex-1">
          {majorWork}
        </p>

        <Link href={`/exegetes/${slug}`}>
          <button className="hover:cursor-pointer mt-6 px-6 py-2.5 rounded-lg text-white text-sm font-medium bg-primary hover:bg-hover transition-colors duration-300 w-full">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;