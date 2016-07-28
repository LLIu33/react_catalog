import load from './load';

export default function create(req) {
  return new Promise((resolve, reject) => {
    load(req).then(data => {
      const products = data;
      const product = req.body;
      let maxId = 0;
      for (let index = 0; index < products.length; index++) {
        if (products[index].code === product.code) {
          reject({
            code: 'Product Code must be unique'
          });
          break;
        }
        maxId = (maxId < +products[index].id) ? +products[index].id : maxId;
      }

      if (isNaN(product.price)) {
        reject({
          price: 'Product Price must be number'
        });
      }

      product.id = maxId + 1;
      product.price = +product.price;
      products.push(product);
      req.session.products = products;

      resolve(product);
    }, err => {
      reject(err);
    });
  });
}
