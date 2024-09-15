export default function Importing() {
  return (
    <div className="bg-yellow-50 border-yellow-600 border p-5 rounded-md flex items-center">
      <div>
        <svg viewBox="0 0 240 240" className="inline-block loader w-32">
          <line className="loader-pointer" x1="120" y1="120" x2="120" y2="97" />
          <line className="loader-line" x1="120" y1="120" x2="135" y2="120" />
          <circle className="loader-circle" cx="120" cy="120" r="30" />
          <circle className="loader-center" cx="120" cy="120" r="5" />
        </svg>
      </div>{" "}
      <div>
        <h2 className="font-bold text-lg mb-3">Importing...</h2>
        <p className="mb-2">
          We are importing the course to you learning and enjoy with us!
        </p>
        <p>For now, take a breath, and back here soon.</p>
      </div>
    </div>
  );
}
