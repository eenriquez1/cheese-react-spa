import PropTypes from 'prop-types';

// defining the base entity shape
const categoryEntity = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

// a Prop Types definition using the base entity shape
// exported as a named export to match how we imported it in CategoriesList.js
export const categoryType = PropTypes.shape(categoryEntity);

//cheese entity
const cheeseEntity = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: categoryType.isRequired,
};
export const cheeseType = PropTypes.shape(cheeseEntity);

//Menu
const menuEntity = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
export const menuType = PropTypes.shape(menuEntity);


