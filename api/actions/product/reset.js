export default function reset(req) {
  req.session.products = null;
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}