import Stripe from "stripe";
import Product from "./components/Product";

// fetch products from stripe
const getProducts = async () => {
  // initiate stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15"
  });
  // get the products from stripe
  const products = await stripe.products.list();
  // console.log(products); // outputs all the products created in stripe

  // gets a product' price
  const productWithPrices = await Promise.all(
    products.data.map(async product => {
      const prices = await stripe.prices.list({ product: product.id });

      const features = product.metadata.features || ""; // Extract features from metadata

      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { features }
      };
    })
  );
  return productWithPrices;
};

export default async function Home() {
  // get the data from 'getProducts' function created above
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
