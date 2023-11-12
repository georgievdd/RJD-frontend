import {Group, Select} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {useForm} from "../hooks";
import {TripCard} from "../components/TripCard";

export const ChooseTrip = () => {
    const {values, from, to, trainType, date} = useForm({
        trainType: 'Скоростной',
        date: new Date(),
        from: 'Москва',
        to: 'Санкт-Петербург'
    })
    function requestCarriage() {

    }
    return (
        <>
            <Group mb={25}>
                <Select label="Откуда" placeholder="Выберите город" data={['Москва']}/>
                <Select label="Куда" placeholder="Выберите город" data={['Санкт-Петербург']}/>
                <DateInput {...date} label="Дата отправления" placeholder="Выберите дату" />
            </Group>
            <TripCard {...values} price={1000} trainType={1 /*'Волга'*/} fromTime='7:13' toTime='15:44'/>
            <TripCard {...values} price={1000} trainType={2 /*'Премиум'*/} fromTime='9:13' toTime='17:44'/>
            <TripCard {...values} price={1000} trainType={3 /*'Арктика'*/} fromTime='8:45' toTime='16:44'/>

        </>
    );
}