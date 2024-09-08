export default async function Loading() {
  return (
    <div className="flex">
      <div className="w-2/12">
        <div className="p-2">
          <h3 className="text-lg font-bold border-b border-gray-200 pb-2">
            <span className="block font-bold h-10 mb-2 bg-gray-200 text-gray-500 rounded-md p-2">
              Loading...
            </span>
          </h3>
          <ol className="mt-2 overflow-y-scroll h-[calc(100vh-10rem)]">
            <li className="py-4 mb-2  bg-gray-400 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
            <li className="py-4 mb-2  bg-gray-200 text-gray-200 rounded-md h-14"></li>
          </ol>
        </div>
      </div>
      <div className="w-10/12">
        <div className="relative h-0 overflow-hidden max-w-full pb-[56%] py-2">
          <span className="block font-bold absolute top-0 left-0 w-full h-full mb-2 bg-gray-900 text-gray-200 rounded-md"></span>
        </div>
        <h4 className="text-lg font-bold mt-2">
          <span className="block font-bold w-full p-2 h-10 mb-2 bg-gray-200 text-gray-200 rounded-md"></span>
        </h4>

        <div className="mt-2">
          <span className="block font-bold w-full p-2 h-52 mb-2 bg-gray-200 text-gray-200 rounded-md"></span>
        </div>
      </div>
    </div>
  );
}
