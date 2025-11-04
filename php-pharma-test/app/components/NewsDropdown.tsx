import Link from "next/link";

export default function NewsDropdown() {
  return (
    <div className="fixed left-0 right-0 top-[72px] pt-2 z-50">
      <div className="bg-white border-t-4 border-red-700 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 p-8 max-w-md mx-auto">
            {/* News List */}
            <div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/news"
                    className="text-base text-gray-700 hover:text-red-600 flex items-center gap-2"
                  >
                    <span className="text-red-600">›</span>
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="text-base text-gray-700 hover:text-red-600 flex items-center gap-2"
                  >
                    <span className="text-red-600">›</span>
                    Events
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
