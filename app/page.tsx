import Product from "./components/Product";
import getProducts from "@/util/getProducts";

export default async function Home() {
  const products = await getProducts();
  // console.log(products); // outputs the different products as an array of objects

  return (
    <main className="grid grid-cols-fluid gap-12">
      {products.map(product => (
        <Product {...product} key={product.id} />
      ))}
    </main>
  );
}
