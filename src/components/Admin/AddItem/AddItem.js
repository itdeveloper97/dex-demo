import React, {useState, useEffect} from "react";
import {withNotAuthRedirect} from "../../../hoc/withNotAuthRedirect";
import {compose} from "redux";
import s from "./AddItem.module.css";
import BackBtn from "../../common/BackBtn/BackBtn";
import btn from "../../../assets/commonStyles/Button.module.css";
import minus from "../../../assets/img/icons8-minus-64.png";
import {connect} from "react-redux";
import {addProductTC, editProductTC, getProductTC} from "../../../redux/thunk-creators/catalog-thunk-creators";
import {withRouter} from "react-router-dom";
import swal from "sweetalert";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

function AddItem(props) {

  const [name, changeName] = useState('');
  const [price, changePrice] = useState('');
  const [image, changeImage] = useState('');
  const [description, changeDescription] = useState('');
  const [dateOfChange, changeDateOfChange] = useState('')
  const [itemProps, pushItemProps] = useState([]);

  const forceUpdate = useForceUpdate();

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');
  const [propsError, setPropsError] = useState('');

  useEffect(() => {
    if (props.match.params.productID) {
      props.getProductTC(props.match.params.productID).then((response) => {
        let product = response.data;
        changeName(product.name);
        changePrice(product.price);
        changeImage(product.image);
        changeDescription(product.description);
        pushItemProps(product.properties);
      });
    }


    let Data = new Date(),
      FullYear = Data.getFullYear(),
      Month = Data.getMonth() + 1,
      MonthNumber = Data.getDate()

    changeDateOfChange(`${MonthNumber}.${Month}.${FullYear}`)

  }, [dateOfChange])


  function validate() {
    let nameError = false,
      priceError = false,
      imageError = false,
      propsError = false;

    if (name.length === 0) {
      setNameError('Поле обязательно для заполнения');
      nameError = true;
    } else {
      setNameError('');
      nameError = false;
    }

    if (price.length === 0) {
      setPriceError('Поле обязательно для заполнения');
      priceError = true;
    } else {
      setPriceError('');
      priceError = false;
    }

    if (image.length === 0) {
      setImageError('Поле обязательно для заполнения');
      imageError = true;
    } else {
      setImageError('');
      imageError = false;
    }


    for (let item of itemProps) {
      /* Проверка на пустое значение свойства*/
      if (Array.isArray(item.value)) {
        for (let i of item.value) {
          if (i.length <= 0) {
            propsError = true;
            setPropsError("Значения свойств не должны быть пустыми");
            return false;
          } else {
            propsError = false;
            setPropsError("");
          }
        }
      } else if (item.value.length <= 0) {
        propsError = true;
        setPropsError("Значения свойств не должны быть пустыми");
        return false;
      } else {
        propsError = false;
        setPropsError("");
      }
    }


    if (nameError || priceError || imageError || propsError) {
      return false;
    }
    return true;

  }

  function itemPropsUnique(array) {
    let shift,
      newItemProps = [];

    /* Удаляет повторяющиеся свойства */
    for (let i = 0; i <= array.length; i++) {
      if (array.length > 0) {
        shift = array.shift(); // Берем 1 элемент массива
        newItemProps.push(shift);  // Записываем его в новый массив
        pushItemProps(array);  // Пушим оставшиеся обратно
        if (array.length > 0) { // Проходимся циклом по массиву только если массив существует
          for (let j = 0; j < array.length; j++) { // проходимся циклом по оставшемуся массиву
            if (shift.id === array[j].id) { // сравниванием элемент который вытащили с каждым
              array.splice(j, 1); // Если элементы были равны удаляем из массива идентичный элемент
              pushItemProps(array); // Пушим оставшиеся обратно в массив
              j--; // уменьшаем итерацию на 1 так как элементы в массиве сместились на один назад
            }
          }
          i--; // Уменьшаем итерацию на 1 так как элементы в массиве сместились на один назад
        }
      }
    }
    pushItemProps([...newItemProps]); // Пушим получившийся результат в массив
    return newItemProps;
  }

  function sendProduct() {
    if (validate()) {
      let product = {
        name: name,
        price: price,
        image: image,
        description: description,
        dateOfChange: dateOfChange,
        properties: itemPropsUnique(itemProps)
      }
      if (props.match.params.productID) {
        props.editProductTC(props.match.params.productID, product)
          .then((response) => {
            if (response.status === 200) {
              swal({
                title: "Товар успешно изменен",
                icon: "success"
              }).then(() => {
                props.history.goBack();
              })
            }
          })
      } else {
        props.addProductTC(product).then((response) => {
          if (response.status === 201) {
            swal({
              title: "Товар успешно добавлен",
              icon: "success"
            }).then(() => {
              props.history.goBack();
            })

          }
        });
      }

    }
  }

  function addItemToProps() {
    pushItemProps(
      [
        ...itemProps,
        {
          idElement: itemProps[itemProps.length - 1]
            ? itemProps[itemProps.length - 1].idElement + 1
            : 1,
          id: null,
          name: "",
          value: "",
          type: "",
        }
      ]
    )
  }


  return (<div className={s.addItemSection}>
    <div className={s.btnBlock}>
      <BackBtn/>
      <button
        className={`${btn.greenBtn} ${s.btn}`}
        onClick={sendProduct}
      >
        Сохранить
      </button>
    </div>

    <div className={s.form}>
      <div className={s.title}>
        <h4>Добавление товара</h4>
      </div>
      <div className={s.fieldName}>
        <label htmlFor="name" className={`${s.label} ${s.required}`}>Название товара</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            changeName(e.target.value)
          }}
          placeholder={"Название товара"}
          id={'name'}
        />
        {nameError && <span className={s.error}>{nameError}</span>}
      </div>
      <div className={s.fieldName}>
        <label htmlFor="price" className={`${s.label} ${s.required}`}>Стоимость товара</label>
        <input
          type="text"
          value={price}
          onChange={(e) => {
            changePrice(e.target.value)
          }}
          placeholder={"Стоимость товара"}
          id={'price'}
        />
        {priceError && <span className={s.error}>{priceError}</span>}
      </div>
      <div className={s.fieldName}>
        <label htmlFor="image" className={`${s.label} ${s.required}`}>Изображение</label>
        <input
          type="text"
          value={image}
          onChange={(e) => {
            changeImage(e.target.value)
          }}
          placeholder={"Ссылка на изображение"} id={'image'}
        />
        {imageError && <span className={s.error}>{imageError}</span>}
      </div>
      <div className={s.fieldName}>
        <label htmlFor="description" className={`${s.label}`}>Описание</label>
        <textarea
          value={description}
          onChange={(e) => {
            changeDescription(e.target.value)
          }}
          placeholder={"Описание"} id={'description'}
        />
      </div>


      {/*Добавление свойства*/}
      <div className={s.addProperty}>
        <h5>Добавление товару свойств</h5>
        <div
          className={s.icons8Plus}
          onClick={addItemToProps}
        >
        </div>
        <div className={s.error}>
          {propsError}
        </div>
      </div>

      {itemProps.map((item, index) => (
        <div key={index} className={s.propertyItem}>
          <img
            src={minus}
            className={s.minus}
            onClick={() => {
              itemProps.splice(index, 1);
              pushItemProps([...itemProps])
            }}
          />
          <div className={s.propertyName}>
            <div>
              Свойство {index + 1}
            </div>

            <div className={s.select}>
              <select
                key={index}
                id={`select-${index}`}
                onChange={(e) => {
                  props.props.find((item) => {
                    if (Number(item.id) == Number(e.target.value)) {
                      itemProps[index].name = item.name;
                      itemProps[index].type = item.type;
                      if (item.type === "Dropdown") {
                        // itemProps[index].value = [""];
                        itemProps[index].value = [{
                          label: "",
                          value: ""
                        }];
                      } else {
                        itemProps[index].value = "";
                      }
                      itemProps[index].id = item.id;
                    }
                  })
                  pushItemProps(itemProps);
                  forceUpdate();
                }}
                value={itemProps[index].name}
              >
                <option>{itemProps[index].name || "Выберите свойство"}</option>
                {props.props.map((item, index) => {
                  return (<option value={item.id} key={index}>{item.name}</option>)
                })}
              </select>
              <div aria-hidden="true"
                   className={s.selectArrow}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                     className="css-6q0nyr-Svg">
                  <path
                    d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
              </div>

            </div>


          </div>
          <div className={s.propertyValue}>
            <div>
              Значение
            </div>
            {
              item.type !== "Dropdown" && <div>
                <input
                  type="text"
                  onChange={(e) => {
                    itemProps[index].value = e.target.value;
                    pushItemProps([...itemProps])
                  }}
                  value={item.value}
                />
              </div>
            }
            {
              item.type === "Dropdown" &&

              <div>
                {
                  itemProps[index].value.map((item, indexValue) => {
                    return (
                      <div key={indexValue} className={s.multiInputBlock}>
                        <input
                          type="text"
                          onChange={(e) => {
                            // itemProps[index].value[indexValue] = [e.target.value];
                            // debugger
                            itemProps[index].value[indexValue].value = [e.target.value];
                            itemProps[index].value[indexValue].label = [e.target.value];
                            pushItemProps([...itemProps])
                          }}
                          value={itemProps[index].value[indexValue].value}
                        />
                        {
                          itemProps[index].value.length > 1 && <img
                            src={minus}
                            className={`${s.minus} ${s.deleteInput}`}
                            onClick={() => {
                              itemProps[index].value.splice(indexValue, 1)
                              pushItemProps([...itemProps]);
                            }
                            }
                          />
                        }
                      </div>
                    )
                  })
                }
                <div className={s.inputControl}>
                  <div
                    className={s.icons8Plus}
                    onClick={(e) => {
                      itemProps[index].value = [...itemProps[index].value, {label: "", value: ""}];
                      forceUpdate();
                    }}
                  ></div>
                </div>
              </div>
            }
          </div>
        </div>
      ))}
    </div>
  </div>)
}

const mapStateToProps = (state) => ({
  props: state.catalog.props
})

export default compose(
  connect(mapStateToProps, {
    addProductTC,
    getProductTC,
    editProductTC
  }),
  withNotAuthRedirect,
  withRouter
)(AddItem);