import React, {useEffect, useState} from "react";
import {AdminLayout} from "../../layout";
import styled from "styled-components";
import {SYellowButton} from "../../Primitives";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "../../../hooks/hooks";
import {Search} from "../../common/Search/Search";
import {CustomPagination} from "../../common/Pagination/CustomPagination";
import {useHistory} from "react-router";
import {LIMIT} from "../../../constants/constants";
import Swal from "sweetalert2";
import {changeOrderProductActionCreator, deleteProductActionCreator} from "../product-reducer";


export const ListProduct = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const order = useSelector(state => state.product.order)
  const items = useSelector(state => state.product.items)


  const onGoAddProduct = () => history.push('/add-product')
  const onGoEditProduct = (e) => history.push(`/edit-product/${e.target.id}`)
  const onGoToProduct = (e) => history.push(`/product/${e.target.id}`)
  const onChangeOrder = () => dispatch(changeOrderProductActionCreator())
  const onDeleteItem = (e) => {
    dispatch(deleteProductActionCreator({id: e.target.id}))

    Swal.fire({
      position: "top-right",
      icon: "success",
      title: 'Товар удален',
      showConfirmButton: false,
      timer: 500
    }).then(() => {
      history.push('/all-product')
    })
  }

  return (
    <AdminLayout hasHeader={true}>
      <Section>
        <Buttons>
          <SYellowButton onClick={onGoAddProduct}>Добавить товар</SYellowButton>
        </Buttons>

        <List
          items={items}
          order={order}
          onChangeOrder={onChangeOrder}
          onDeleteItem={onDeleteItem}
          onEditItem={onGoEditProduct}
          onGoToProduct={onGoToProduct}
        />

      </Section>
    </AdminLayout>
  )
}


const List = ({items, order, onChangeOrder, onDeleteItem, onEditItem, onGoToProduct}) => {

  const query = useQuery()


  const [showItems, setShowItems] = useState(null)
  const [limitFromBy, setLimitFromBy] = useState([0, LIMIT])
  const [activePage, setActivePage] = useState(null)

  useEffect(() => {
    query.get('searchText')
      ? setShowItems(items.filter(item => item.name.toLowerCase().indexOf(query.get('searchText').toLowerCase()) > -1))
      : setShowItems(items)

  }, [query.get('searchText'), items])

  useEffect(() => {
    if (query.get('page') && Number(query.get('page') > 1)) {
      let fromBy = [0, LIMIT];

      for (let i = 1; i < Number(query.get('page')); i++) {
        fromBy = fromBy.map(item => item + LIMIT)
      }

      setLimitFromBy(fromBy)
    } else {
      setLimitFromBy([0, LIMIT])
    }

    setActivePage(Number(query.get('page')) || 1)
  }, [query.get('page')])

  return (
    <Container>
      <Header>
        <Search/>
      </Header>

      <Body>
        <TR>
          <TH sort={order} onClick={onChangeOrder}>
            Перечень проперти
          </TH>
          <TH>
            Стоимость
          </TH>
          <TH>
            Дата изменения
          </TH>
          <TH>
            Управление
          </TH>
        </TR>

        {
          showItems && showItems.slice(limitFromBy[0], limitFromBy[1]).map((item, indexItem) => (
            <TR key={indexItem}>
              <TD id={item.id} onClick={onGoToProduct} control>
                {item.name}
              </TD>
              <TD>
                {item.price}
              </TD>
              <TD>
                {item.date_of_change}
              </TD>
              <TD control>
                <div onClick={onEditItem} id={item.id}>
                  Ред.
                </div>
                <div onClick={onDeleteItem} id={item.id}>
                  Удалить
                </div>
              </TD>
            </TR>
          ))
        }
      </Body>

      <Footer>
        {
          showItems && <CustomPagination
            totalCount={showItems.length}
            activePage={activePage}
            pageRangeDisplayed={5}
          />
        }
      </Footer>
    </Container>

  )
}


const Section = styled.div`
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 20px 20px rgba(40, 40, 40, 0.05);
  border-radius: 10px;
  padding: 0px 95px;
  
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  & > * {
    margin-left: 30px;
  }
`;


const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TR = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  
  & > div {
    flex: 5 5 20%;
  }
`;

const TH = styled.div`
  cursor: pointer;
  font-size: 16px;
  position: relative;
  color: #828282;
  opacity: 0.8;
  
  display: flex;
  align-items: center;
  
  ${props => props.sort ?
  `
    font-weight: bold;
    color: #000000;
    &:before {
      content: '\\2039';
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: -26px;
      font-size: 22px;
      font-family: cursive;
      opacity: 0.5;
     
      transform: ${props.sort === 'asc' ? 'rotate(270deg)' : 'rotate(90deg)'};
    }
  ` : ``}
  
`;

const TD = styled.div`
  font-size: 14px;
  opacity: 0.8;
  
  ${props => props.control ? `
    color: #0258FF;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  ` : `
    color: #000000;
  `}
`;

const Header = styled.div`
  flex: 0 0 auto;
`;

const Body = styled.div`
  flex: 1 0 auto;
`;

const Footer = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  
  margin-bottom: 20px;
`;