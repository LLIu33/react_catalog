import load from './load';

export default function remove(req) {
  return new Promise((resolve, reject) => {
    load(req).then(data => {
      const products = data;
      const productId = req.body;

      // add validation
      // if (product.color === 'Green') {
      //   reject({
      //     color: 'We do not accept green widgets' // example server-side validation error
      //   });
      // }

      for(var i=0; i < products.length; i++){
        if(products[i].id == productId){
            products.splice(i, 1);  //removes 1 element at position i
            req.session.products = products;
            break;
        }
      }

      resolve(product);
    }, err => {
      reject(err);
    });
  });
}
