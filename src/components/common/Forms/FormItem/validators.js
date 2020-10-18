export const formItemRepeatingProp = (values) => {
  if (!values) return undefined

  const errorArray = [];

  let arrCopy = values.slice();


  values.forEach(current => {
    if (current.property !== "") {
      arrCopy.shift();

      if (arrCopy.some(el => el.property.id === current.property.id || el.property.name === current.property.name)) {
        errorArray.push({property: "Нельзя добавлять повторяющиеся свойства"});
      }
    } else {
      errorArray.push({property: "Свойства не могут быть пустыми"});
    }
  })

  return errorArray;
}