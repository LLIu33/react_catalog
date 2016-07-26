import {createValidator, required, maxLength, integer} from 'utils/validation';

const productValidation = createValidator({
  code: [required],
  name: [required, maxLength(30)],
  price: [required, integer]
});
export default productValidation;
