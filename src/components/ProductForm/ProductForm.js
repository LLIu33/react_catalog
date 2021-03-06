import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import productValidation from './productValidation';
import * as productActions from 'redux/modules/products';

@connect(
  state => ({
    saveError: state.products.saveError
  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'product',
  fields: ['id', 'code', 'name', 'price'],
  validate: productValidation
})
export default class ProductForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const handleSubmit = (values) => {
      const {save, create} = this.props;
      if (values.id) {
        save(values)
        .then(result => {
          if (result && typeof result.error === 'object') {
            return Promise.reject(result.error);
          }
        });
      } else {
        create(values)
        .then(result => {
          if (result && typeof result.error === 'object') {
            return Promise.reject(result.error);
          }
        });
      }
    };

    const { editStop, fields: {id, code, name, price}, formKey, invalid,
      pristine, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    const styles = require('containers/Products/Products.scss');
    return (
      <tr className={submitting ? styles.saving : ''}>
        <td className={styles.idCol}>{id.value}</td>
        <td className={styles.codeCol}>
          <input type="text" className="form-control" {...code} />
          {code.error && code.touched && <div className="text-danger">{code.error}</div>}
        </td>
        <td className={styles.nameCol}>
          <input type="text" className="form-control" {...name}/>
          {name.error && name.touched && <div className="text-danger">{name.error}</div>}
        </td>
        <td className={styles.priceCol}>
          <input type="text" className="form-control" {...price}/>
          {price.error && price.touched && <div className="text-danger">{price.error}</div>}
        </td>
        <td className={styles.buttonCol}>
          <button className="btn btn-default"
                  onClick={() => editStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={() => handleSubmit(values)}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </td>
      </tr>
    );
  }
}
