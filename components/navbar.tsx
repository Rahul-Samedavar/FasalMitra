"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageSquare, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cultivation Process", path: "/cultivation-process" },
    { name: "Services", path: "/services" },
    { name: "Chatbot", path: "/chatbot", icon: <MessageSquare size={18} /> },
  ]

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-primary-green text-white shadow-md py-2" : "bg-background-light text-primary-green py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-accent-beige flex items-center justify-center">
              <span className="text-primary-green font-bold text-xl">CD</span>
            </div>
            <span className="font-bold text-xl md:text-2xl">CropGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "nav-link flex items-center space-x-1",
                  pathname === link.path ? "active font-semibold" : "",
                )}
              >
                {link.icon && link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden text-primary-green" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "block py-2 nav-link flex items-center space-x-2",
                  pathname === link.path ? "active font-semibold" : "",
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.icon && link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
