"use client";

import React, { useState, useMemo } from 'react';
import { products as allProducts, Product, Category } from '@/lib/products';
import { FiltersSidebar } from '@/components/filters-sidebar';
import { ProductGrid } from '@/components/product-grid';
import { AppHeader } from '@/components/header';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  
  const categories: Category[] = useMemo(() => ['Electronics', 'Clothing', 'Books', 'Home Goods'], []);
  const maxProductPrice = useMemo(() => Math.ceil(Math.max(...allProducts.map(p => p.price)) / 100) * 100, []);

  const categoryCounts = useMemo(() => {
    const counts: { [key in Category | 'all']: number } = {
      'all': allProducts.length,
      'Electronics': 0,
      'Clothing': 0,
      'Books': 0,
      'Home Goods': 0,
    };
    for (const product of allProducts) {
      counts[product.category]++;
    }
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      const matchesRating = product.rating >= minRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [searchTerm, selectedCategory, maxPrice, minRating]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container mx-auto flex flex-1 flex-col px-4 py-6 md:flex-row md:gap-8 md:px-6">
        <FiltersSidebar
          categories={categories}
          categoryCounts={categoryCounts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          maxProductPrice={maxProductPrice}
          minRating={minRating}
          setMinRating={setMinRating}
        />
        <main className="flex-1">
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
}
