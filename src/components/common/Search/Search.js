import React from "react";
import {SGreenButton, SInput} from "../../Primitives";
import {useHistory} from "react-router";
import {Field, Form} from "react-final-form";
import {useQuery} from "../../../hooks/hooks";
import styled from "styled-components";



export const Search = () => {

  const query = useQuery();
  const history = useHistory();

  function onPushSearchText({searchText}) {
    query.delete('page')

    if(!query.has('searchText') && searchText) {
      query.append('searchText', searchText)
      history.push(`?${query.toString()}`)
    } else if(query.has('searchText') && searchText) {
      query.set('searchText', searchText)
      history.push(`?${query.toString()}`)
    } else {
      query.delete('searchText')
      history.push(`?${query.toString()}`)
    }
  }

  return (
    <Form
      onSubmit={onPushSearchText}
      initialValues={{
        searchText: query.get('searchText') || ""
      }}
      render={({handleSubmit}) => (
        <SearchForm onSubmit={handleSubmit}>
          <Field
            name={'searchText'}
            render={({input}) => (
              <SInput {...input} type="text" placeholder={'Поиск...'}/>
            )}
          />
          <SGreenButton type={'submit'}>Поиск</SGreenButton>
        </SearchForm>
      )}
    >

    </Form>
  )
}

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  input {
    flex: 1 0 auto;
    margin-right: 20px;
  }
  
  button {
    flex: 0 0 auto;
  }
`;