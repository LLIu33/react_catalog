import load from './load';

export default function remove(req) {
  return new Promise((resolve, reject) => {
    load(req).then(data => {
      const products = data;
      const productId = req.body.productId;
      for (var i=0; i < products.length; i++){
        if (products[i].id === productId){
          products.splice(i, 1);
          req.session.products = products;
          break;
        }
      }
      resolve(products);
    }, err => {
      reject(err);
    });
  });
}
