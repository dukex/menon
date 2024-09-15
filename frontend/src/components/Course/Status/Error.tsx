export default function Error() {
  return (
    <div className="bg-red-50 border-red-600 border p-5 rounded-md flex items-center">
      <div className="text-5xl w-32 text-center text-red-900">!</div>
      <div>
        <h2 className="font-bold text-lg mb-3">Import error</h2>
        <p className="mb-2">We are unable to get the course!</p>
        <p>
          Make sure the playlist and the videos are public or unlisted and try
          again.
        </p>
      </div>
    </div>
  );
}
