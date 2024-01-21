import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import {
  setPriceRange,
  toggleStock,
} from '@/redux/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';

export default function Products() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IProduct[]>([]);
  const { status, priceRange } = useAppSelector((state) => state.product);

  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const { toast } = useToast();

  const handleSlider = (value: number[]) => {
    // console.log(value);
    dispatch(setPriceRange(value[0]));
  };

  let productsData;

  if (status) {
    productsData = data.filter(
      (item) => item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    productsData = data.filter((item) => item.price < priceRange);
  } else {
    productsData = data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">
            <Switch
              checked={status}
              id="in-stock"
              onClick={() => dispatch(toggleStock())}
            />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[priceRange]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
