import React from "react";
import {GeneralLayout} from "../layout";
import styled from 'styled-components';
import {SYellowButton} from "../Primitives";
import {Redirect, useHistory, useParams} from "react-router";
import {CustomSelect} from "../common/CustomSelect";
import {useSelector} from "react-redux";

export const CardProduct = () => {

  const {productID} = useParams();
  const history = useHistory();
  const item = useSelector(state => state.product.items.find(item => item.id === productID))

  function onGoBack() {
    history.goBack();
  }

  if(!item) {
    return (
      <Redirect to={"/all-product"}/>
    )
  }

  return (
    <GeneralLayout>
      {
        item && <Section>
          <Buttons>
            <a href={'#'} onClick={onGoBack}>Вернуться</a>
          </Buttons>
          <Product>
            <Row>
              <div>
                <ProductPhoto
                  src={item.image}/>
              </div>
              <div>
                <div>
                  <ProductName>
                    <h1>{item.name}</h1>
                  </ProductName>
                  <ProductDescription>
                    {item.description}
                  </ProductDescription>
                </div>
              </div>
            </Row>

            <Row>
              <div>
                <Properties>
                  {
                    item.properties && item.properties.map((item, index) =>
                      Array.isArray(item.value)
                        ? <Property key={index}>
                          <Label>{item.property.name}</Label>
                          <PropValue>
                            <CustomSelect defaultValue={item.value[0]} options={item.value}/>
                          </PropValue>
                        </Property> : <Property key={index}>
                          <Label>{item.property.name}</Label>
                          <PropValue>{item.value}</PropValue>
                        </Property>

                    )
                  }
                </Properties>
                <Price>
                  <Label>Стоимость</Label>
                  <PriceValue>{item.price}$</PriceValue>
                </Price>
              </div>
              <div>
                <Buy>
                  <SYellowButton>Беру!!!!</SYellowButton>
                </Buy>
              </div>
            </Row>
          </Product>
        </Section>
      }

    </GeneralLayout>
  )
}


const Section = styled.div`
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 20px 20px rgba(40, 40, 40, 0.05);
  border-radius: 10px;
  padding: 0px 95px;
  margin: 25px 0px;
  
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #E0E0E0;
  
  a {
    margin-bottom: 48px;
    margin-top: 24px;
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  
  div:first-child {
    margin-bottom: 16px;
  }
`;

const Row = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

const Price = styled.div`
  margin-top: 24px;
`;

const ProductPhoto = styled.img`
  width: 350px;
  height: 190px;
  object-fit: cover;
  filter: drop-shadow(2px 4px 6px black);
`;

const ProductName = styled.div`
  margin-bottom: 40px;
  
  h1 {
    margin: 0px;
  }
`;

const ProductDescription = styled.div`
  width: 540px;
  font-size: 16px;
  color: #828282;
`;

const Properties = styled.div`
  width: 350px;
  
  div:first-child {
    margin-top: 0px;
  }
`;

const Label = styled.div`
  font-weight: normal;
  font-size: 16px;
`;

const PriceValue = styled.div`
  font-size: 22px;
  font-weight: 300;
  margin-top: 12px;
`;

const PropValue = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #828282;
  margin-top: 12px;
`;

const Property = styled.div`
  margin-top: 24px;
  width: 255px;
`;

const Buy = styled.div`
  position: relative;
  width: 540px;
  height: 100%;
  
  button {
    position: absolute;
    bottom: 0px;
  }
`;
