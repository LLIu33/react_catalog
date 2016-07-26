const initialProducts = [
  {id: 1, code: 'Red', name: 'John', price: 7},
  {id: 2, code: 'Taupe', name: 'George', price: 1},
  {id: 3, code: 'Green', name: 'Ringo', price: 8},
  {id: 4, code: 'Blue', name: 'Paul', price: 2}
];

export function getWidgets(req) {
  let products = req.session.products;
  if (!products) {
    products = initialProducts;
    req.session.products = products;
  }
  return products;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    resolve(getWidgets(req));
  });
}