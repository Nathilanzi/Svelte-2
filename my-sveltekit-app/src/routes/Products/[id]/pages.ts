import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  return {
    product: await res.json()
  };
};