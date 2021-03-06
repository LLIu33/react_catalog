// Fetch Product
const LOAD = 'redux-example/products/LOAD';
const LOAD_SUCCESS = 'redux-example/products/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/products/LOAD_FAIL';

// Edit Product
const EDIT_START = 'redux-example/products/EDIT_START';
const EDIT_STOP = 'redux-example/products/EDIT_STOP';
const SAVE = 'redux-example/products/SAVE';
const SAVE_SUCCESS = 'redux-example/products/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/products/SAVE_FAIL';

// Create Product
const CREATE_START = 'redux-example/products/CREATE_START';
const CREATE = 'redux-example/products/CREATE';
const CREATE_SUCCESS = 'redux-example/products/CREATE_SUCCESS';
const CREATE_FAIL = 'redux-example/products/CREATE_FAIL';


// Delete Product
const DELETE = 'redux-example/products/DELETE';
const DELETE_SUCCESS = 'redux-example/products/DELETE_SUCCESS';
const DELETE_FAIL = 'redux-example/products/DELETE_FAIL';

function deleteEmptyProduct(products) {
  for (let index = 0; index < products.length; index++) {
    if (!products[index].id) {
      products.splice(index, 1);
    }
  }
  return products;
}

function getIndexById(id, products) {
  let result;
  for (let index = 0; index < products.length; index++) {
    if (products[index].id === id) {
      result = index;
      break;
    }
  }
  return result;
}

const initialState = {
  loaded: false,
  editing: {},
  saveError: {},
  deleteError: {}
};

export default function reducer(state = initialState, action = {}) {
  let data;
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      data = deleteEmptyProduct([...state.data]);
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case CREATE_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      data = deleteEmptyProduct([...state.data]);
      data[getIndexById(action.result.id, data)] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case CREATE:
      return state; // 'saving' flag handled by redux-form
    case CREATE_SUCCESS:
      data = deleteEmptyProduct([...state.data]);
      data.push(action.result);
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case CREATE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case DELETE:
      return state;
    case DELETE_SUCCESS:
      return {
        ...state,
        data: action.result,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        deleteError: {
          ...state.deleteError,
          [action.id]: null
        }
      };
    case DELETE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        deleteError: {
          ...state.deleteError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.products && globalState.products.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/product/load') // params not used, just shown as demonstration
  };
}

export function save(product) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: product.id,
    promise: (client) => client.post('/product/update', {
      data: product
    })
  };
}

export function create(product) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/product/create', {
      data: product
    })
  };
}

export function remove(productId) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    id: productId,
    promise: (client) => client.post('/product/remove', {
      data: { productId: productId }
    })
  };
}


export function createStart() {
  return { type: CREATE_START };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
