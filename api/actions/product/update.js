import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    load(req).then(data => {
      const products = data;
      const product = req.body;

      for (let index = 0; index < products.length; index++) {
        if (products[index].code === product.code && products[index].id !== product.id) {
          reject({
            code: 'Product Code must be unique'
          });
          break;
        }
      }

      if (isNaN(product.price)) {
        reject({
          price: 'Product Price must be number'
        });
      }
      product.price = +product.price;

      for (let index = 0; index < products.length; index++) {
        if (products[index].id === product.id) {
          products[index] = product;
        }
      }
      req.session.products = products;
      resolve(product);
    }, err => {
      reject(err);
    });
  });
}
