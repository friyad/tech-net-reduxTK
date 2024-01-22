import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetSignleProductQuery } from '@/redux/features/product/productAPI';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSignleProductQuery(id);

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={data?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.name}</h1>
          <p className="text-xl">Rating: {data?.rating}</p>
          <ul className="space-y-1 text-lg">
            {data?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={id || ' '} />
    </>
  );
}
