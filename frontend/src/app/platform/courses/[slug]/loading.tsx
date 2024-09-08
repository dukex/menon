import PublicHeader from "@/components/PublicHeader";

export default function Loading({ params }: { params: { slug: string } }) {
  return (
    <main className=" max-w-screen-lg mx-auto">
      <h2 className="font-bold text-4xl bg-gray-200 text-gray-200 rounded-md">
        loading
      </h2>

      <p className="my-5 h-24  bg-gray-200 text-gray-200 rounded-md">loading</p>

      <div className="flex items-center text-2xl my-5">
        <div className="px-2">
          <span className="block font-bold w-14 h-10 mb-2 bg-gray-200 text-gray-200 rounded-md"></span>
          <span className="block text-base w-14 h-5 bg-gray-200 text-gray-200 rounded-md"></span>
        </div>
        <span className="block pl-5 mr-5 h-8 border-blue-900 border-r-2"></span>
        <div className="px-2">
          <span className="block font-bold w-14 h-10 mb-2 bg-gray-200 text-gray-200 rounded-md"></span>
          <span className="block text-base w-14 h-5 bg-gray-200 text-gray-200 rounded-md"></span>
        </div>
      </div>

      <div className="drop-shadow-md mb-8 bg-white rounded-3xl p-4">
        <h2 className="font-bold mb-2">Lessons</h2>

        <ol>
          <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
          <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
          <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
          <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
          <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
        </ol>
      </div>
    </main>
  );
}
