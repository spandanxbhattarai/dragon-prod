import { Book, ChevronDown, GraduationCap, Search, ShoppingCart } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <header className="bg-white text-gray-700 py-4">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Book className="w-8 h-8 text-[#1A73E8]" />
                        <span className="text-2xl font-bold">EduMon</span>
                    </div>

                    {/* Category Button */}
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
                        <GraduationCap className="w-5 h-5" />
                        <span>Category</span>
                    </button>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <a href="#" className="font-medium hover:text-[#1A73E8]">Home</a>
                        <div className="flex items-center gap-1 cursor-pointer group">
                            <span className="font-medium">Courses</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer group">
                            <span className="font-medium">Pages</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer group">
                            <span className="font-medium">Blog</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <a href="#" className="font-medium hover:text-[#1A73E8]">Contact</a>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Search className="w-5 h-5" />
                        </button>
                        <div className="relative">
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
                        </div>
                        <button className="bg-[#1A73E8] text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
                            Login / Register
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
