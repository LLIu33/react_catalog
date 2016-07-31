import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import { expect} from 'chai';
import { Products } from 'containers';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';

const ReactTestUtils = require('react-addons-test-utils');
const client = new ApiClient();

describe('Product', () => {
  const mockStore = {
    "routing": {},
    "reduxAsyncConnect": {},
    "auth": {},
    "form": {},
    "products": {
      "loaded": true,
      "editing": {},
      "saveError": {},
      "deleteError": {},
      "loading": false,
      "data": [{
        "id": 1,
        "code": "Red",
        "name": "John",
        "price": 7
      }, {
        "id": 4,
        "code": "Blue",
        "name": "Paul",
        "price": 2
      }, {
        "code": "Yellow",
        "name": "John",
        "price": 12,
        "id": 5
      }, {
        "code": "Test",
        "name": "123",
        "price": 324,
        "id": 6
      }],
      "error": null
    }
  };
  const product = {
    "id": 1,
    "code": "Red",
    "name": "John",
    "price": 7
  };
  const store = createStore(browserHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <Products />
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render cell code with correct value', () => {
    const value = dom.querySelectorAll('tbody tr td')[1].textContent;
    expect(value).to.equal(product.code);
  });

  it('should render cell name with with correct value', () => {
    const value = dom.querySelectorAll('tbody tr td')[2].textContent;
    expect(value).to.equal(product.name);
  });

  it('should render cell price with with correct value', () => {
    const value = dom.querySelectorAll('tbody tr td')[3].textContent;
    expect(value).to.equal(String(product.price));
  });

  it('should render Edit button', () => {
    const text = dom.querySelector('tbody tr .btn-primary').textContent.trim();
    expect(text).to.equal('Edit');
  });

  it('should render Cancel button after click by Edit', () => {
    const row = dom.querySelector('tbody tr');
    const editBtn = row.querySelector('.btn-primary');
    // ReactTestUtils.Simulate.click(editBtn);
    editBtn.click();
    const targetBtn = dom.querySelector('tbody tr button');
    expect(targetBtn.textContent.trim()).to.equal('Cancel');
  });

});
