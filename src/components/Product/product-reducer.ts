import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1 as uuid} from 'uuid';
import {ProductInterface} from "../type";
import {PropertiesInterface} from "../type";

const initialState: { items: ProductInterface[], order: string } = {
  items: [
    {
      name: 'CASHES VALLEY LANE',
      price: 500000,
      image: '',
      date_of_change: '01.11.18',
      description: '',
      properties: [],
      id: uuid()
    },
    {
      name: 'DURUN DURUN HOUSE',
      price: 1216000,
      image: '',
      date_of_change: '01.11.18',
      description: '',
      properties: [],
      id: uuid()
    },
    {
      name: 'Mercedes S550 4matic',
      price: 118000,
      image: '',
      date_of_change: '31.10.18',
      description: '',
      properties: [
        {
          property: {
            name: 'Цвет',
            label: 'Цвет',
            value: 'Цвет',
            type: 'Dropdown',
            id: uuid()
          },
          value: [
            {
              name: 'Белый',
              label: 'Белый',
              value: 'Белый',
            },
            {
              name: 'Черный',
              label: 'Черный',
              value: 'Черный'
            },
          ]
        }
      ],
      id: uuid()
    }
  ],
  order: 'desc'
}


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    add: {
      reducer: (state, {payload}: PayloadAction<ProductInterface>) => {
        state.items.push(payload)
      },
      prepare: ({name, price, image, description, properties}: { name: string, price: number, image: string, description: string, properties: any }) => {
        properties && properties.map((prop: PropertiesInterface): void => {
          if (Array.isArray(prop.value)) {
            prop.value = prop.value
              .map((
                val: string | {
                  label: string
                  name: string
                  value: string
                }): {
                label: string
                name: string
                value: string
              } => ({name: String(val), label: String(val), value: String(val)}))
          }
        });

        return {
          payload: {
            name,
            price,
            image,
            date_of_change: new Date().toLocaleDateString(),
            description,
            properties,
            id: uuid()
          }
        }
      }
    },
    edit: {
      reducer: (state, {payload}: PayloadAction<ProductInterface>) => {
        const itemToEdit = state.items.find(item => item.id === payload.id);
        if (itemToEdit) {
          itemToEdit.name = payload.name
          itemToEdit.price = payload.price
          itemToEdit.image = payload.image
          itemToEdit.date_of_change = payload.date_of_change
          itemToEdit.description = payload.description
          itemToEdit.properties = payload.properties
          itemToEdit.id = payload.id
        }
      },
      prepare: ({name, price, image, description, properties, id}: ProductInterface) => {
        properties && properties.map((prop: PropertiesInterface): void => {
          if (Array.isArray(prop.value)) {
            prop.value = prop.value
              .map((
                val: string | { label: string, name: string, value: string }
              ): { label: string, name: string, value: string } => {
                return typeof val === 'string'
                  ? {name: String(val), label: String(val), value: String(val)}
                  : val
              })
          }
        });

        return {
          payload: {
            name,
            price,
            image,
            date_of_change: new Date().toLocaleDateString(),
            description,
            properties,
            id
          }
        }
      }
    },
    changeOrder: (state) => {
      state.order = state.order === 'asc' ? 'desc' : 'asc'
      state.items = state.items.sort((
        prev,
        next
      ) => {
        if (state.order === 'asc' && prev.name < next.name) return -1
        if (state.order === 'desc' && prev.name > next.name) return -1
        return 0;
      })
    },
    remove: (state, {payload}) => {
      const index = state.items.findIndex(item => item.id === payload.id);
      if (index !== -1) {
        state.items.splice(index, 1)
      }
    }
  },
  extraReducers: {}
})

export const {
  changeOrder: changeOrderProductActionCreator,
  remove: deleteProductActionCreator,
  add: addProductActionCreator,
  edit: editProductActionCreator
} = productSlice.actions