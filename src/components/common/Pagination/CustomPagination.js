import React, {useEffect, useState} from "react";
import Pagination from "react-js-pagination";
import {useHistory, useLocation} from 'react-router';
import style from './Pagination.module.css';
import {useQuery} from "../../../hooks/hooks";
import {LIMIT} from "../../../constants/constants";

export const CustomPagination = ({totalCount, activePage, pageRangeDisplayed}) => {

  const history = useHistory();
  const query = useQuery();

  function onPageChange(pageNumber) {
    if(!query.has('page') && pageNumber > 1) {
      query.append('page', pageNumber)
      history.push(`?${query.toString()}`)
    } else if(query.has('page') && pageNumber > 1) {
      query.set('page', pageNumber)
      history.push(`?${query.toString()}`)
    } else {
      query.delete('page');
      history.push(`?${query.toString()}`)
    }
  }

  return (
    <Pagination
      prevPageText='prev'
      nextPageText='next'
      firstPageText='first'
      lastPageText='last'
      activePage={activePage}
      itemsCountPerPage={LIMIT}
      totalItemsCount={totalCount}
      pageRangeDisplayed={pageRangeDisplayed}
      onChange={onPageChange}
      innerClass={style.container}
      activeClass={style.active}
    />
  )
}