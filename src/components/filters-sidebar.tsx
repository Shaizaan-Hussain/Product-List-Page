"use client";

import React, { useState } from 'react';
import { type Category } from '@/lib/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { StarRating } from './star-rating';
import { suggestFilters } from '@/ai/flows/suggest-filters';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface FiltersSidebarProps {
  categories: Category[];
  categoryCounts: { [key in Category | 'all']: number };
  selectedCategory: Category | 'all';
  setSelectedCategory: (category: Category | 'all') => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  maxProductPrice: number;
  minRating: number;
  setMinRating: (rating: number) => void;
}

export function FiltersSidebar({
  categories,
  categoryCounts,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  maxProductPrice,
  minRating,
  setMinRating,
}: FiltersSidebarProps) {
  const ratingOptions = [4, 3, 2, 1];
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAiSuggest = async () => {
    setIsSuggesting(true);
    setSuggestion('');
    try {
      const currentFilters = `Category: ${selectedCategory}, Max Price: $${maxPrice}, Min Rating: ${minRating} stars.`;
      const browsingHistory = "User has viewed electronics and is interested in high-end gadgets and best-selling books.";
      const response = await suggestFilters({ 
          previousFilters: currentFilters,
          browsingHistory: browsingHistory
      });
      setSuggestion(response.suggestedFilters);
      setIsModalOpen(true);
    } catch (error) {
      console.error("AI suggestion failed:", error);
      setSuggestion("Sorry, we couldn't generate suggestions at this time.");
      setIsModalOpen(true);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <aside className="w-full md:w-72 lg:w-80">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-3 font-semibold">Category</h3>
            <RadioGroup value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category | 'all')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="cat-all" />
                <Label htmlFor="cat-all" className="flex-1 cursor-pointer">All</Label>
                <span className="text-sm text-muted-foreground">{categoryCounts['all']}</span>
              </div>
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <RadioGroupItem value={cat} id={`cat-${cat}`} />
                  <Label htmlFor={`cat-${cat}`} className="flex-1 cursor-pointer">{cat}</Label>
                  <span className="text-sm text-muted-foreground">{categoryCounts[cat]}</span>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Price Range</h3>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>$0</span>
                <span>${maxPrice}</span>
            </div>
            <Slider
              defaultValue={[maxPrice]}
              max={maxProductPrice}
              step={10}
              onValueChange={(value) => setMaxPrice(value[0])}
            />
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Rating</h3>
            <RadioGroup value={String(minRating)} onValueChange={(value) => setMinRating(Number(value))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="rating-all" />
                <Label htmlFor="rating-all" className="flex-1 cursor-pointer">All</Label>
              </div>
              {ratingOptions.map(rating => (
                 <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={String(rating)} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="flex flex-1 items-center gap-2 cursor-pointer">
                        <StarRating rating={rating} totalStars={rating} showReviewCount={false}/>
                        <span className="ml-auto">& Up</span>
                    </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Button onClick={handleAiSuggest} disabled={isSuggesting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isSuggesting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get AI Suggestions
            </Button>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> AI Filter Suggestions</DialogTitle>
            <DialogDescription>
                Based on your activity, you might also like these filters:
            </DialogDescription>
            </DialogHeader>
            <div className="prose prose-sm text-foreground whitespace-pre-wrap">{suggestion}</div>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
