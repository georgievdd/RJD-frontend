import {Text} from "@mantine/core";
import React from "react";
import {useNavigate} from "react-router-dom";

export const BackLink = () => {
    const navigate = useNavigate()
    return <Text size="sm" style={{fontWeight: 800, cursor: 'pointer'}} c="#777777" onClick={()=>navigate(-1)}>{"« Назад"}</Text>
}