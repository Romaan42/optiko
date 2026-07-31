import { Star, Shield, Eye } from 'lucide-react';
import Banner from '@/components/home/Banner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { Suspense } from 'react';
import LoadingProducts from '@/components/home/Loading';

export const dynamic = 'force-dynamic';

export default function Home() {


  return (
    <>
      <Banner />
      <Suspense fallback={<LoadingProducts />}>
        <FeaturedProducts />
      </Suspense>

      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 mb-4 text-neutral-400" />
              <h3 className="text-xl font-bold mb-2">Lifetime Warranty</h3>
              <p className="text-neutral-400 text-sm max-w-xs">Every frame is guaranteed against manufacturing defects for life.</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-10 h-10 mb-4 text-neutral-400" />
              <h3 className="text-xl font-bold mb-2">Premium Materials</h3>
              <p className="text-neutral-400 text-sm max-w-xs">Hand-polished Italian acetates and ultra-lightweight titanium alloys.</p>
            </div>
            <div className="flex flex-col items-center">
              <Eye className="w-10 h-10 mb-4 text-neutral-400" />
              <h3 className="text-xl font-bold mb-2">Free RX Lenses</h3>
              <p className="text-neutral-400 text-sm max-w-xs">Standard single-vision prescription lenses are free with every order.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}