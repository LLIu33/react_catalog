import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    load(req).then(data => {
      const products = data;
      const product = req.body;
      if (product.color === 'Green') {
        reject({
          color: 'We do not accept green widgets' // example server-side validation error
        });
      }
      if (product.id) {
        products[product.id - 1] = product;  // id is 1-based. please don't code like this in production! :-)
        req.session.products = products;
      }
      resolve(product);
    }, err => {
      reject(err);
    });
  });
}
