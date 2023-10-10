'use client';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { Container, Logo, Nav, Hamburger } from './NavbarStyles';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container className="bg-gray-100">
      <Logo>
        <Link href="/">
            <img src="/logo.png" alt="Logo" height={200} width={200} />
        </Link>
      </Logo>
      <Nav isOpen={isOpen}>
        <Link href="/about" className="text-gray-600 hover:text-gray-900 font-bold">
          About
        </Link>
      </Nav>
      <Hamburger onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
        <FaBars />
      </Hamburger>
    </Container>
  );
};

export default Navbar;
