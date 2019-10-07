const filterList = (list, value) => list.filter(item => item.name.includes(value));
const findIndexById = (list, currId) => list.findIndex(item => item._id === currId);

export { filterList };
export { findIndexById };
