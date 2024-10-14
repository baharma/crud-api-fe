'use client'

import Link from 'next/link'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-stone-200 shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold text-gray-900">
            Crud Cuy
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/room"
              className={`text-gray-900 hover:text-gray-500 p-2 font-medium `}
            >
              Room
            </Link>
            <Link
              href="/calendar"
              className={`text-gray-900 hover:text-gray-500 p-2 font-medium `}
            >
              Calendar
            </Link>
            <Link
              href="/rate-plant"
              className={`text-gray-900 hover:text-gray-500 p-2 font-medium `}
            >
              Rate Plant
            </Link>
            <Link
              href="/booking"
              className={`text-gray-900 hover:text-gray-500 p-2 font-medium `}
            >
              Booking
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
