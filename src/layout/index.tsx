'use client'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar/index'

type Props = {
  children?: ReactNode
  customClass?: string
}

const Layout = ({ children, customClass }: Props) => {
  return (
    <div className={`${customClass}`}>
      <Navbar />
      <div className="container mx-auto p-4">{children}</div>
    </div>
  )
}

export default Layout
