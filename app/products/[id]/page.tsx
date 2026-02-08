import ProductDetail from "@/components/Product-Detail"
import { products } from "@/data/data"
import React from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: PageProps) => {
  const { id } = await params
  const productId = parseInt(id)
  const product = products.find(p => p.id === productId)

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Product Not Found!</h1>
      </div>
    )
  }

  return (
    <ProductDetail product={product} />
  )
}

export default page
