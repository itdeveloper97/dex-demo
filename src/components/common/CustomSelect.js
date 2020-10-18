import React from "react";
import Select from "react-select";

export const CustomSelect = ({...rest}) => {
  return (
    <Select
      {...rest}
      styles={customStyles}
    />
  )
}


const customStyles = {
  container: styles => {
    return {
      ...styles,
      margin: '8px 0px',
      height: '32px'
    }
  },
  control: styles => {
    return {
      ...styles,
      minHeight: '32px',
      height: '32px'
    }
  },
  valueContainer: styles => {
    return {
      ...styles,
      height: 'inherit',
      position: 'static !important'
    }
  },
  indicatorsContainer: styles => {
    return {
      ...styles,
      height: 'inherit',
    }
  },
  indicatorContainer: styles => {
    return {
      ...styles,
      padding: '6px'
    }
  },
  menu: styles => {
    return {
      ...styles,
    }
  }
}