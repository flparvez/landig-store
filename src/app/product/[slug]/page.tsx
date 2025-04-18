import ProductDetailPage from '@/components/ProductDetailPage';

import React from 'react'

const ProductPage = async ({params}: {params : Promise<{slug: string}>}) => {
const {slug} = (await params)

  return (
    <div>
      <h2>Test</h2>
      <ProductDetailPage slug = {slug} />
    </div>
  )
}

export default ProductPage
