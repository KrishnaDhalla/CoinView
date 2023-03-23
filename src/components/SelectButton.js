import React from 'react'
import { styled } from '@mui/material/styles';
export const SelectButton = ({children,selected,onClick}) => {
    const StyledButton=styled('span')({
        border: "1px solid #43e97b",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "#43e97b" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "#43e97b",
            color: "black",
          },
          width: "22%",
    })
    return (
    <StyledButton onClick={onClick}>{children}</StyledButton>
  )
}
