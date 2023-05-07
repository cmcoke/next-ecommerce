import Stripe from "stripe";

// fetch products from stripe
export default async function getProducts() {
  // initiate stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15"
  });
  // get the products from stripe
  const products = await stripe.products.list();
  // console.log(products); // outputs all the products created in stripe

  const productWithPrices = await Promise.all(
    products.data.map(async product => {
      // gets a product' price
      const prices = await stripe.prices.list({ product: product.id });

      // extract features from metadata
      const features = product.metadata.features || "";

      // get properties associated with products
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
}
