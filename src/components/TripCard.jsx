import {Button, Card, Container, Group, Stack, Text, Title} from "@mantine/core";
import React from "react";
import {Coin} from "../res/icons/coin";
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import {useNavigate} from "react-router-dom";
import {PATH} from "../consts";

export const TripCard = ({
                             fromTime, toTime,
                             from,
                             to,
                             trainType,
                             date,
                             price,
                         }) => {

    const navigate = useNavigate()
    function choosePlace() {
        const params = new URLSearchParams({
            date: dayjs(date).format('YYYY-MM-DD'),
            trainType,
            from,
            to,
            price,
            fromTime,
            toTime,
        })
        navigate(`${PATH.CHOOSE_PLACE}?${params.toString()}`)
    }


    return (
        <Card withBorder mb={20}>
            <Group justify='space-between' align='stretch'>

                <div>
                    <Title order={4}>{from} → {to}</Title>
                    <Title>{fromTime} → {toTime}</Title>
                    <Text>
                        {dayjs(date).locale('ru').format('DD MMMM YYYY')}
                    </Text>
                    <Text>{['Волга', 'Арктика', 'Премиум'][trainType - 1]}</Text>
                </div>
                <Stack justify='space-between' align='flex-end'>
                    <Group gap={5}>
                        <Title order={4}>{price}</Title>
                        <Coin color='black'/>
                    </Group>
                    <Button onClick={choosePlace}>
                        Выбрать место
                    </Button>
                </Stack>

            </Group>

        </Card>
    )
}