import './SvgCarriage.css'
import React, {useEffect} from "react";
import {Text, Badge, Card, Group, HoverCard, HoverCardDropdown, Modal, Title, Button, Space} from "@mantine/core";
import dayjs from "dayjs";
import {useSetState} from "@mantine/hooks";
import {useSearchParams} from "react-router-dom";
import {useSearchParamsForm} from "../../hooks";


export function rateToColor(rate, l=1, s=1.2) {
    if(rate === 0) rate = 0.2
    const hue = rate**0.5 * 120
    const saturation = 50*s + (1-rate)*20
    const lightness = 70*l
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
export const SvgCarriage = ({
  data,
  choosePlace,
  myPlace,
  companionsPlaces,
}) => {
    const { places } = data;
    const [isOpen, SetIsOpen] = React.useState(false)
    const {values} = useSearchParamsForm()
    const {carriage, from, to, date, trainType, fromTime, toTime} = values
    const [state, setState] = useSetState({
        place: 0,
        curPlace: 0,
        user: null
    })

    function findInCompanions(idx) {
        for (const i in companionsPlaces) {
            if (companionsPlaces[i].place === idx + 1 && companionsPlaces[i].carriage === carriage)
                return true
        }
        return false
    }

    function checkUserPlace(i, l=1) {

        if (!places[i].user) return rateToColor(places[i].rating, l);
        if (myPlace
            && i + 1 === myPlace.place
            && carriage === myPlace.carriage
            || findInCompanions(i)
        ) return '#F4A0FF';
        return '#87a4ff';
    }

    useEffect(() => {
        const seats = []
        const dropdown = document.getElementById('dropdown')
        for (let i = 1; i <= 36; i++) {
            seats.push(document.getElementById(`Seat${i}`))
        }
        seats.forEach((seat, i) => {
            seat.classList.add('seat')
            if (i % 2) {
                seat.classList.add('above')
            }
            if (places[i].user) {
                seat.classList.add('taken')
            }
            seat.style.setProperty('--color', checkUserPlace(i, 0.8))
            seat.style.setProperty('--shadow-color', checkUserPlace(i))
            seat.addEventListener('mouseover', () => {
                dropdown.classList.add('hover')
                seat.classList.add('hover')
                setState({user: places[i].user, curPlace: i+1})
            })
            seat.addEventListener('mouseout', () => {
                dropdown.classList.remove('hover')
                seat.classList.remove('hover')
            })
            seat.addEventListener('mousemove', e => {
                dropdown.style.top = `${e.clientY}px`
                dropdown.style.left = `${e.clientX}px`
            })
            seat.addEventListener('click', e => {
                  if (places[i].user) {
                        return
                  }
                  SetIsOpen(true)
                  setState({place: i+1})
            })
        })
    }, [data]);
    const user = state?.user
    return (
        <div>
            <Modal title='Подтверждение выбора места' opened={isOpen} onClose={()=>SetIsOpen(false)}>
                <Group>
                    <Title order={4}>{from} → {to}</Title>
                    <Title order={4}>{fromTime} → {toTime}</Title>
                </Group>
                    <Title>Вагон: {carriage}, Место: {state?.place}</Title>
                    <Text>
                        {dayjs(date).locale('ru').format('DD MMMM YYYY')}
                    </Text>
                    <Text>{trainType}</Text>
                <Space h='sm'/>
                <Button onClick={()=>{
                    SetIsOpen(false);
                    choosePlace(state?.place);
                }}>Забронировать</Button>
            </Modal>
            <div id='dropdown'>

                <Card withBorder w='300px'>
                    <Title order={5}>Место: {state?.curPlace}</Title>
                    {!user && <Group><Text>Рекомендуем на:</Text><Badge variant='filled' color={rateToColor(places[state?.curPlace-1]?.rating, 0.6)}>{(places[state?.curPlace-1]?.rating**0.5*5).toFixed(2)}/5</Badge></Group>}
                    {user && <><Title order={4}>{user.name} {user.surname} {user.patronymic}</Title>
                    <Group gap={5}>
                        {!!user.tag?.length && user?.tag?.map((tag, idx) =>
                        <Badge key={idx}>{tag}</Badge>
                        )}
                        {/*{['Живопись', 'Физика'].map((tag, idx) =>*/}
                        {/*    <Badge key={idx}>{tag}</Badge>*/}
                        {/*)}*/}
                    </Group>
                    <Text>+7 985 612 84 75</Text></>}
                </Card>
            </div>
            <svg id='carriage' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="100%"
                 viewBox="0 0 2420 336" enableBackground='0 0 2420 336'>
                <filter id="AI_Тень_1_справа" filterUnits="objectBoundingBox">
                    <feGaussianBlur stdDeviation="2" in="SourceAlpha" result="blur"></feGaussianBlur>
                    <feOffset dy="4" dx="2" in="blur" result="offsetBlurredAlpha"></feOffset>
                    <feMerge>
                        <feMergeNode in="offsetBlurredAlpha"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
                <filter id="AI_Тень_1_слева" filterUnits="objectBoundingBox">
                    <feGaussianBlur stdDeviation="2" in="SourceAlpha" result="blur"></feGaussianBlur>
                    <feOffset dy="4" dx="-2" in="blur" result="offsetBlurredAlpha"></feOffset>
                    <feMerge>
                        <feMergeNode in="offsetBlurredAlpha"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
                <g id="Fon">
                    <path className="st0"
                          d="M12.3,328c-1.419,0-2.466-0.729-3.095-1.342C8.507,325.979,8,324.737,8,323.705V12.297   c0-1.617,0.646-2.421,1.133-2.885C10.364,8.236,11.258,8,12.3,8h2395.4c1.46,0,2.612,0.887,3.17,1.415   c0.533,0.506,1.13,1.845,1.13,2.882v311.409c0,1.205-0.38,2.158-1.163,2.912c-1.26,1.215-2.252,1.383-3.136,1.383H12.3z"></path>
                </g>
                <g id="Railway_carriage">
                    <path className="st1"
                          d="M2416.374,3.61c-2.258-2.14-5.298-3.61-8.674-3.61H12.3C8.779,0,5.997,1.347,3.61,3.625   C1.223,5.903,0,8.922,0,12.297v311.408c0,3.152,1.36,6.482,3.626,8.687C5.892,334.596,8.924,336,12.3,336H2407.7   c3.466,0,6.33-1.346,8.691-3.624c2.361-2.277,3.609-5.297,3.609-8.671V12.297C2420,9.265,2418.632,5.75,2416.374,3.61   L2416.374,3.61z M2412,323.705L2412,323.705c0,1.205-0.38,2.158-1.163,2.912c-1.26,1.215-2.252,1.383-3.136,1.383H12.3   c-1.419,0-2.466-0.729-3.095-1.342C8.507,325.978,8,324.737,8,323.705V12.297c0-1.617,0.646-2.42,1.133-2.885   C10.364,8.237,11.258,8,12.3,8h2395.4c1.46,0,2.612,0.887,3.17,1.415c0.533,0.506,1.13,1.845,1.13,2.882V323.705z"></path>
                </g>
                <g id="Compartment">
                    <path className="st1"
                          d="M2214.5,301.995h8V328h-8V301.995z M2312,328h8v-53.995h-8V328z M186.458,214.844L186.458,214.844   L186.458,214.844H108v-6.839h-8V328h8V222.844h77.227L332,269.121V328h8v-64.744L186.458,214.844z M506,328h8v-28h-8V328z    M129.313,111.775L108,105.055V8h-8v124h8v-18.557l18.907,5.961L129.313,111.775z M220,140.368V8h-8v129.846l-25.464-8.029   l-2.406,7.63l72.533,22.87l2.406-7.63L220,140.368z M385.436,192.53L355,182.934V8h-8v172.411l-30.709-9.683l-2.406,7.63   L347,188.799v0h0.001l36.03,11.36L385.436,192.53z M574.917,233.007H514V8h-8v220.959h-5.028l-58.313-18.386l-2.406,7.629   l59.642,18.805l0.015-0.049H506v4.049V246h8v-4.993h60.917V233.007z M703.833,233.007V8h-8v225.007h-60.917v8h60.917h8h60.917v-8   H703.833z M893.666,233.007V8h-8v225.007h-60.917v8h60.917h8h60.916v-8H893.666z M1083.499,233.007V8h-8v225.007h-60.916v8h60.916   h8h60.917v-8H1083.499z M1273.332,233.007V8h-8v225.007h-60.917v8h60.917h8h60.917v-8H1273.332z M1463.165,233.007V8h-8v225.007   h-60.917v8h60.917h8h60.916v-8H1463.165z M1652.999,233.007V8h-8v225.007h-60.917v8h60.917h8h60.916v-8H1652.999z    M1842.832,233.007V8h-8v225.007h-60.917v8h60.917h8h60.916v-8H1842.832z M2032.665,233.007V8h-8v225.007h-60.917v8h60.917h8   h60.916v-8H2032.665z M2240.25,179h-17.75V8h-8v225.008h-60.918v8h60.918V248h8v-6.993v-8V187h17.75V179z M2312,8v171h-17.75v8   H2312v11h8V8H2312z"></path>
                </g>



                <g id="Seats">
                    <path id="Seat1" className="st2"
                          d="M514,90.785h42.737c8.25,0,15,6.75,15,15V194.5c0,8.25-6.75,15-15,15H514V90.785z"></path>
                    <g id="Shadow2" className="st3">
                        <path className="st4"
                              d="M514,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15H514V11.974z"></path>
                        <path className="st5"
                              d="M514,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15H514V11.974z"></path>
                    </g>
                    <path id="Seat2" className="st2"
                          d="M514,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15H514V11.974z"></path>
                    <path id="Seat3" className="st2"
                          d="M695.833,90.785h-42.737c-8.25,0-15,6.75-15,15V194.5c0,8.25,6.75,15,15,15h42.737V90.785z"></path>
                    <g id="Shadow4" className="st6">
                        <path className="st4"
                              d="M695.833,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                        <path className="st5"
                              d="M695.833,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    </g>
                    <path id="Seat4" className="st2"
                          d="M695.833,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    <path id="Seat5" className="st2"
                          d="M703.833,90.785h42.737c8.25,0,15,6.75,15,15V194.5c0,8.25-6.75,15-15,15h-42.737V90.785z"></path>
                    <g id="Shadow6" className="st3">
                        <path className="st4"
                              d="M703.833,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                        <path className="st5"
                              d="M703.833,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    </g>
                    <path id="Seat6" className="st2"
                          d="M703.833,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    <path id="Seat7" className="st2"
                          d="M885.666,90.785h-42.737c-8.25,0-15,6.75-15,15V194.5c0,8.25,6.75,15,15,15h42.737V90.785z"></path>
                    <g id="Shadow8" className="st6">
                        <path className="st4"
                              d="M885.666,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                        <path className="st5"
                              d="M885.666,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    </g>
                    <path id="Seat8" className="st2"
                          d="M885.666,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    <path id="Seat9" className="st2"
                          d="M893.666,90.785h42.737c8.25,0,15,6.75,15,15V194.5c0,8.25-6.75,15-15,15h-42.737V90.785z"></path>
                    <g id="Shadow10" className="st3">
                        <path className="st4"
                              d="M893.666,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                        <path className="st5"
                              d="M893.666,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    </g>
                    <path id="Seat10" className="st2"
                          d="M893.666,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    <path id="Seat11" className="st2 seat--available compartment-3"
                          d="M1075.499,90.785h-42.737c-8.25,0-15,6.75-15,15V194.5c0,8.25,6.75,15,15,15h42.737V90.785z"></path>
                    <g id="Shadow12" className="st6">
                        <path className="st4"
                              d="M1075.499,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                        <path className="st5"
                              d="M1075.499,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    </g>
                    <path id="Seat12" className="st2"
                          d="M1075.499,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    <path id="Seat13" className="st2"
                          d="M1083.499,90.785h42.737c8.25,0,15,6.75,15,15V194.5c0,8.25-6.75,15-15,15h-42.737V90.785z"></path>
                    <g id="Shadow14" className="st3">
                        <path className="st4"
                              d="M1083.499,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                        <path className="st5"
                              d="M1083.499,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    </g>
                    <path id="Seat14" className="st2"
                          d="M1083.499,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    <path id="Seat15" className="st2 seat--available compartment-4"
                          d="M1265.332,90.785h-42.737c-8.25,0-15,6.75-15,15V194.5c0,8.25,6.75,15,15,15h42.737V90.785z"></path>
                    <g id="Shadow16" className="st6">
                        <path className="st4"
                              d="M1265.332,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                        <path className="st5"
                              d="M1265.332,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    </g>
                    <path id="Seat16" className="st2"
                          d="M1265.332,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    <path id="Seat17" className="st2"
                          d="M1273.332,90.785h42.737c8.25,0,15,6.75,15,15V194.5c0,8.25-6.75,15-15,15h-42.737V90.785z"></path>
                    <g id="Shadow18" className="st3">
                        <path className="st4"
                              d="M1273.332,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                        <path className="st5"
                              d="M1273.332,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    </g>
                    <path id="Seat18" className="st2"
                          d="M1273.332,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    <path id="Seat19" className="st2"
                          d="M1455.165,90.785h-42.737c-8.25,0-15,6.75-15,15V194.5c0,8.25,6.75,15,15,15h42.737V90.785z"></path>
                    <g id="Shadow20" className="st6">
                        <path className="st4"
                              d="M1455.165,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                        <path className="st5"
                              d="M1455.165,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    </g>
                    <path id="Seat20" className="st2"
                          d="M1455.165,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    <path id="Seat21" className="st2"
                          d="M1463.165,90.785h42.737c8.25,0,15,6.75,15,15V194.5c0,8.25-6.75,15-15,15h-42.737V90.785z"></path>
                    <g id="Shadow22" className="st3">
                        <path className="st4"
                              d="M1463.165,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                        <path className="st5"
                              d="M1463.165,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    </g>
                    <path id="Seat22" className="st2"
                          d="M1463.165,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    <path id="Seat23" className="st2 seat--available compartment-6"
                          d="M1644.999,90.785h-42.737c-8.25,0-15,6.75-15,15V194.5c0,8.25,6.75,15,15,15h42.737V90.785z"></path>
                    <g id="Shadow24" className="st6">
                        <path className="st4"
                              d="M1644.999,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                        <path className="st5"
                              d="M1644.999,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    </g>
                    <path id="Seat24" className="st2"
                          d="M1644.999,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    <path id="Seat25" className="st2"
                          d="M1653.333,91.785h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V91.785z"></path>
                    <g id="Shadow26" className="st3">
                        <path className="st4"
                              d="M1653.333,12.975h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V12.975z"></path>
                        <path className="st5"
                              d="M1653.333,12.975h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V12.975z"></path>
                    </g>
                    <path id="Seat26" className="st2"
                          d="M1653.333,12.975h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V12.975z"></path>
                    <path id="Seat27" className="st2"
                          d="M1834.832,90.785h-42.737c-8.25,0-15,6.75-15,15V194.5c0,8.25,6.75,15,15,15h42.737V90.785z"></path>
                    <g id="Shadow28" className="st6">
                        <path className="st4"
                              d="M1834.832,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                        <path className="st5"
                              d="M1834.832,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    </g>
                    <path id="Seat28" className="st2"
                          d="M1834.832,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    <path id="Seat29" className="st2"
                          d="M1842.832,90.785h42.737c8.25,0,15,6.75,15,15V194.5c0,8.25-6.75,15-15,15h-42.737V90.785z"></path>
                    <g id="Shadow30" className="st3">
                        <path className="st4"
                              d="M1842.832,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                        <path className="st5"
                              d="M1842.832,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    </g>
                    <path id="Seat30" className="st2"
                          d="M1842.832,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    <path id="Seat31" className="st2"
                          d="M2024.665,90.785h-42.737c-8.25,0-15,6.75-15,15V194.5c0,8.25,6.75,15,15,15h42.737V90.785z"></path>
                    <g id="Shadow32" className="st6">
                        <path className="st4"
                              d="M2024.665,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                        <path className="st5"
                              d="M2024.665,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    </g>
                    <path id="Seat32" className="st2"
                          d="M2024.665,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    <path id="Seat33" className="st2"
                          d="M2032.665,90.785h42.737c8.25,0,15,6.75,15,15V194.5c0,8.25-6.75,15-15,15h-42.737V90.785z"></path>
                    <g id="Shadow34" className="st3">
                        <path className="st4"
                              d="M2032.665,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                        <path className="st5"
                              d="M2032.665,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    </g>
                    <path id="Seat34" className="st2"
                          d="M2032.665,11.974h42.737c8.25,0,15,6.75,15,15v88.716c0,8.25-6.75,15-15,15h-42.737V11.974z"></path>
                    <path id="Seat35" className="st2"
                          d="M2214.5,90.785h-42.737c-8.25,0-15,6.75-15,15V194.5c0,8.25,6.75,15,15,15h42.737V90.785z"></path>
                    <g id="Shadow36" className="st6">
                        <path className="st4"
                              d="M2214.5,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                        <path className="st5"
                              d="M2214.5,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                    </g>
                    <path id="Seat36" className="st2"
                          d="M2214.5,11.974h-42.737c-8.25,0-15,6.75-15,15v88.716c0,8.25,6.75,15,15,15h42.737V11.974z"></path>
                </g>
                <g id="Numbers" pointer-events="none">
                    <text transform="matrix(1 0 0 1 537.2531 172.606)" className="st7 st8 st9">1</text>
                    <text transform="matrix(1 0 0 1 537.2529 79.3531)" className="st7 st8 st9">2</text>
                    <text transform="matrix(1 0 0 1 661.3494 172.606)" className="st7 st8 st9">3</text>
                    <text transform="matrix(1 0 0 1 661.3494 79.3531)" className="st7 st8 st9">4</text>
                    <text transform="matrix(1 0 0 1 727.0862 172.606)" className="st7 st8 st9">5</text>
                    <text transform="matrix(1 0 0 1 721.4708 79.3531)" className="st7 st8 st9">6</text>
                    <text transform="matrix(1 0 0 1 851.1824 172.606)" className="st7 st8 st9">7</text>
                    <text transform="matrix(1 0 0 1 851.1824 79.3531)" className="st7 st8 st9">8</text>
                    <text transform="matrix(1 0 0 1 916.9189 172.606)" className="st7 st8 st9">9</text>
                    <text transform="matrix(1 0 0 1 911.3038 79.3531)" className="st7 st8 st9">10</text>
                    <text transform="matrix(1 0 0 1 1035.4004 172.606)" className="st7 st8 st9">11</text>
                    <text transform="matrix(1 0 0 1 1035.4004 79.3531)" className="st7 st8 st9">12</text>
                    <text transform="matrix(1 0 0 1 1101.137 172.606)" className="st7 st8 st9">13</text>
                    <text transform="matrix(1 0 0 1 1101.1371 79.3531)" className="st7 st8 st9">14</text>
                    <text transform="matrix(1 0 0 1 1225.2336 172.606)" className="st7 st8 st9">15</text>
                    <text transform="matrix(1 0 0 1 1225.2338 79.3531)" className="st7 st8 st9">16</text>
                    <text transform="matrix(1 0 0 1 1290.9701 172.606)" className="st7 st8 st9">17</text>
                    <text transform="matrix(1 0 0 1 1290.97 79.3531)" className="st7 st8 st9">18</text>
                    <text transform="matrix(1 0 0 1 1415.0665 172.606)" className="st7 st8 st9">19</text>
                    <text transform="matrix(1 0 0 1 1415.0667 79.3531)" className="st7 st8 st9">20</text>
                    <text transform="matrix(1 0 0 1 1480.8033 172.606)" className="st7 st8 st9">21</text>
                    <text transform="matrix(1 0 0 1 1480.8032 79.3531)" className="st7 st8 st9">22</text>
                    <text transform="matrix(1 0 0 1 1604.8999 172.606)" className="st7 st8 st9">23</text>
                    <text transform="matrix(1 0 0 1 1604.8998 79.3531)" className="st7 st8 st9">24</text>
                    <text transform="matrix(1 0 0 1 1670.9706 173.6068)" className="st7 st8 st9">25</text>
                    <text transform="matrix(1 0 0 1 1670.9703 80.3539)" className="st7 st8 st9">26</text>
                    <text transform="matrix(1 0 0 1 1794.7333 172.606)" className="st7 st8 st9">27</text>
                    <text transform="matrix(1 0 0 1 1794.733 79.353)" className="st7 st8 st9">28</text>
                    <text transform="matrix(1 0 0 1 1860.4696 172.606)" className="st7 st8 st9">29</text>
                    <text transform="matrix(1 0 0 1 1860.4695 79.3531)" className="st7 st8 st9">30</text>
                    <text transform="matrix(1 0 0 1 1984.566 172.606)" className="st7 st8 st9">31</text>
                    <text transform="matrix(1 0 0 1 1984.5662 79.3531)" className="st7 st8 st9">32</text>
                    <text transform="matrix(1 0 0 1 2050.3025 172.606)" className="st7 st8 st9">33</text>
                    <text transform="matrix(1 0 0 1 2050.3025 79.353)" className="st7 st8 st9">34</text>
                    <text transform="matrix(1 0 0 1 2174.4014 172.6059)" className="st7 st8 st9">35</text>
                    <text transform="matrix(1 0 0 1 2174.4016 79.353)" className="st7 st8 st9">36</text>
                </g>
                <g id="Pol">
                    <g>
                        <g id="SexMF1">
                            <path className="st10"
                                  d="M592.051,216v-12.788h-2.557v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115c1.875,0,3.41,1.534,3.41,3.41     v9.378h-2.557V216H592.051z M595.461,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41c-1.893,0-3.41,1.517-3.41,3.41     S593.568,188.72,595.461,188.72z"></path>
                            <path className="st11"
                                  d="M612.768,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23h-5.115     l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H612.768z M612.666,181.9c1.893,0,3.41,1.517,3.41,3.41     s-1.517,3.41-3.41,3.41c-1.893,0-3.41-1.517-3.41-3.41S610.773,181.9,612.666,181.9z"></path>
                        </g>
                        <path id="SexF1" className="st11"
                              d="M605.018,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23    h-5.115l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H605.018z M604.916,181.9c1.893,0,3.41,1.517,3.41,3.41    s-1.517,3.41-3.41,3.41c-1.893,0-3.41-1.517-3.41-3.41S603.023,181.9,604.916,181.9z"></path>
                        <path id="SexM1" className="st10"
                              d="M601.506,216v-12.788h-2.557v-9.378c0-1.876,1.534-3.41,3.41-3.41h5.115    c1.875,0,3.41,1.534,3.41,3.41v9.378h-2.557V216H601.506z M604.916,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41    c-1.893,0-3.41,1.517-3.41,3.41S603.023,188.72,604.916,188.72z"></path>
                    </g>
                    <g>
                        <g id="SexMF2">
                            <path className="st10"
                                  d="M781.884,216v-12.788h-2.558v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115c1.875,0,3.41,1.534,3.41,3.41     v9.378h-2.557V216H781.884z M785.294,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41s-3.41,1.517-3.41,3.41     S783.401,188.72,785.294,188.72z"></path>
                            <path className="st11"
                                  d="M802.601,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23h-5.115     l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H802.601z M802.499,181.9c1.893,0,3.41,1.517,3.41,3.41     s-1.517,3.41-3.41,3.41c-1.893,0-3.41-1.517-3.41-3.41S800.606,181.9,802.499,181.9z"></path>
                        </g>
                        <path id="SexF2" className="st11"
                              d="M794.851,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23    h-5.115l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H794.851z M794.749,181.9c1.893,0,3.41,1.517,3.41,3.41    s-1.517,3.41-3.41,3.41c-1.893,0-3.41-1.517-3.41-3.41S792.856,181.9,794.749,181.9z"></path>
                        <path id="SexM2" className="st10"
                              d="M791.339,216v-12.788h-2.557v-9.378c0-1.876,1.534-3.41,3.41-3.41h5.115    c1.875,0,3.41,1.534,3.41,3.41v9.378h-2.557V216H791.339z M794.749,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41    c-1.893,0-3.41,1.517-3.41,3.41S792.856,188.72,794.749,188.72z"></path>
                    </g>
                    <g>
                        <g id="SexMF3">
                            <path className="st10"
                                  d="M971.717,216v-12.788h-2.557v-9.378c0-1.876,1.534-3.41,3.41-3.41h5.115c1.875,0,3.41,1.534,3.41,3.41     v9.378h-2.557V216H971.717z M975.127,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41c-1.893,0-3.41,1.517-3.41,3.41     S973.235,188.72,975.127,188.72z"></path>
                            <path className="st11"
                                  d="M992.435,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23h-5.115     l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H992.435z M992.332,181.9c1.893,0,3.41,1.517,3.41,3.41     s-1.517,3.41-3.41,3.41c-1.893,0-3.41-1.517-3.41-3.41S990.44,181.9,992.332,181.9z"></path>
                        </g>
                        <path id="SexF3" className="st11"
                              d="M984.685,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23    h-5.115l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H984.685z M984.582,181.9c1.893,0,3.41,1.517,3.41,3.41    s-1.517,3.41-3.41,3.41c-1.893,0-3.41-1.517-3.41-3.41S982.69,181.9,984.582,181.9z"></path>
                        <path id="SexM3" className="st10"
                              d="M981.172,216v-12.788h-2.557v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115    c1.875,0,3.41,1.534,3.41,3.41v9.378h-2.557V216H981.172z M984.582,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41    c-1.893,0-3.41,1.517-3.41,3.41S982.69,188.72,984.582,188.72z"></path>
                    </g>
                    <g>
                        <g id="SexMF4">
                            <path className="st10"
                                  d="M1161.55,216v-12.788h-2.557v-9.378c0-1.876,1.534-3.41,3.41-3.41h5.115c1.875,0,3.41,1.534,3.41,3.41     v9.378h-2.557V216H1161.55z M1164.96,188.72c1.892,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41c-1.893,0-3.41,1.517-3.41,3.41     S1163.068,188.72,1164.96,188.72z"></path>
                            <path className="st11"
                                  d="M1182.267,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23h-5.115     l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1182.267z M1182.165,181.9c1.893,0,3.41,1.517,3.41,3.41     s-1.517,3.41-3.41,3.41s-3.41-1.517-3.41-3.41S1180.273,181.9,1182.165,181.9z"></path>
                        </g>
                        <path id="SexF4" className="st11"
                              d="M1174.517,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23    h-5.115l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1174.517z M1174.415,181.9c1.893,0,3.41,1.517,3.41,3.41    s-1.517,3.41-3.41,3.41s-3.41-1.517-3.41-3.41S1172.523,181.9,1174.415,181.9z"></path>
                        <path id="SexM4" className="st10"
                              d="M1171.005,216v-12.788h-2.557v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115    c1.875,0,3.41,1.534,3.41,3.41v9.378h-2.557V216H1171.005z M1174.415,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41    s-3.41,1.517-3.41,3.41S1172.523,188.72,1174.415,188.72z"></path>
                    </g>
                    <g>
                        <g id="SexMF5">
                            <path className="st10"
                                  d="M1351.383,216v-12.788h-2.557v-9.378c0-1.876,1.534-3.41,3.41-3.41h5.115c1.875,0,3.41,1.534,3.41,3.41     v9.378h-2.557V216H1351.383z M1354.793,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41     c-1.892,0-3.41,1.517-3.41,3.41S1352.901,188.72,1354.793,188.72z"></path>
                            <path className="st11"
                                  d="M1372.101,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23h-5.115     l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1372.101z M1371.998,181.9c1.892,0,3.41,1.517,3.41,3.41     s-1.517,3.41-3.41,3.41c-1.893,0-3.41-1.517-3.41-3.41S1370.106,181.9,1371.998,181.9z"></path>
                        </g>
                        <path id="SexF5" className="st11"
                              d="M1364.351,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23    h-5.115l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1364.351z M1364.248,181.9c1.892,0,3.41,1.517,3.41,3.41    s-1.517,3.41-3.41,3.41c-1.893,0-3.41-1.517-3.41-3.41S1362.356,181.9,1364.248,181.9z"></path>
                        <path id="SexM5" className="st10"
                              d="M1360.838,216v-12.788h-2.557v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115    c1.875,0,3.41,1.534,3.41,3.41v9.378h-2.557V216H1360.838z M1364.248,188.72c1.892,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41    c-1.893,0-3.41,1.517-3.41,3.41S1362.356,188.72,1364.248,188.72z"></path>
                    </g>
                    <g>
                        <g id="SexMF6">
                            <path className="st10"
                                  d="M1541.216,216v-12.788h-2.557v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115c1.875,0,3.41,1.534,3.41,3.41     v9.378h-2.557V216H1541.216z M1544.626,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41s-3.41,1.517-3.41,3.41     S1542.734,188.72,1544.626,188.72z"></path>
                            <path className="st11"
                                  d="M1561.934,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23h-5.115     l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1561.934z M1561.831,181.9c1.893,0,3.41,1.517,3.41,3.41     s-1.517,3.41-3.41,3.41c-1.892,0-3.41-1.517-3.41-3.41S1559.939,181.9,1561.831,181.9z"></path>
                        </g>
                        <path id="SexF6" className="st11"
                              d="M1554.184,190.425c1.466,0,2.762,0.938,3.239,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23    h-5.115l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1554.184z M1554.081,181.9c1.893,0,3.41,1.517,3.41,3.41    s-1.517,3.41-3.41,3.41c-1.892,0-3.41-1.517-3.41-3.41S1552.189,181.9,1554.081,181.9z"></path>
                        <path id="SexM6" className="st10"
                              d="M1550.671,216v-12.788h-2.557v-9.378c0-1.876,1.534-3.41,3.41-3.41h5.115    c1.875,0,3.41,1.534,3.41,3.41v9.378h-2.557V216H1550.671z M1554.081,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41    c-1.892,0-3.41,1.517-3.41,3.41S1552.189,188.72,1554.081,188.72z"></path>
                    </g>
                    <g>
                        <g id="SexMF7">
                            <path className="st10"
                                  d="M1731.049,216v-12.788h-2.557v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115c1.875,0,3.41,1.534,3.41,3.41     v9.378h-2.557V216H1731.049z M1734.459,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41s-3.41,1.517-3.41,3.41     S1732.567,188.72,1734.459,188.72z"></path>
                            <path className="st11"
                                  d="M1751.767,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23h-5.115     l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1751.767z M1751.664,181.9c1.893,0,3.41,1.517,3.41,3.41     s-1.517,3.41-3.41,3.41s-3.41-1.517-3.41-3.41S1749.772,181.9,1751.664,181.9z"></path>
                        </g>
                        <path id="SexF7" className="st11"
                              d="M1744.017,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23    h-5.115l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1744.017z M1743.914,181.9c1.893,0,3.41,1.517,3.41,3.41    s-1.517,3.41-3.41,3.41s-3.41-1.517-3.41-3.41S1742.022,181.9,1743.914,181.9z"></path>
                        <path id="SexM7" className="st10"
                              d="M1740.504,216v-12.788h-2.557v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115    c1.875,0,3.41,1.534,3.41,3.41v9.378h-2.557V216H1740.504z M1743.914,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41    s-3.41,1.517-3.41,3.41S1742.022,188.72,1743.914,188.72z"></path>
                    </g>
                    <g>
                        <g id="SexMF8">
                            <path className="st10"
                                  d="M1920.884,216v-12.788h-2.557v-9.378c0-1.876,1.534-3.41,3.41-3.41h5.115c1.875,0,3.41,1.534,3.41,3.41     v9.378h-2.557V216H1920.884z M1924.294,188.72c1.892,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41     c-1.893,0-3.41,1.517-3.41,3.41S1922.401,188.72,1924.294,188.72z"></path>
                            <path className="st11"
                                  d="M1941.601,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23h-5.115     l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1941.601z M1941.499,181.9c1.893,0,3.41,1.517,3.41,3.41     s-1.517,3.41-3.41,3.41s-3.41-1.517-3.41-3.41S1939.606,181.9,1941.499,181.9z"></path>
                        </g>
                        <path id="SexF8" className="st11"
                              d="M1933.851,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23    h-5.115l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H1933.851z M1933.749,181.9c1.893,0,3.41,1.517,3.41,3.41    s-1.517,3.41-3.41,3.41s-3.41-1.517-3.41-3.41S1931.856,181.9,1933.749,181.9z"></path>
                        <path id="SexM8" className="st10"
                              d="M1930.339,216v-12.788h-2.557v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115    c1.875,0,3.41,1.534,3.41,3.41v9.378h-2.557V216H1930.339z M1933.749,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41    s-3.41,1.517-3.41,3.41S1931.856,188.72,1933.749,188.72z"></path>
                    </g>
                    <g>
                        <g id="SexMF9">
                            <path className="st10"
                                  d="M2110.717,216v-12.788h-2.557v-9.378c0-1.876,1.534-3.41,3.41-3.41h5.115c1.875,0,3.41,1.534,3.41,3.41     v9.378h-2.557V216H2110.717z M2114.127,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.517-3.41-3.41-3.41s-3.41,1.517-3.41,3.41     S2112.235,188.72,2114.127,188.72z"></path>
                            <path className="st11"
                                  d="M2131.435,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23h-5.115     l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H2131.435z M2131.332,181.9c1.893,0,3.41,1.517,3.41,3.41     s-1.518,3.41-3.41,3.41s-3.41-1.517-3.41-3.41S2129.44,181.9,2131.332,181.9z"></path>
                        </g>
                        <path id="SexF9" className="st11"
                              d="M2123.685,190.425c1.466,0,2.762,0.938,3.24,2.336l0,0l4.331,13.009h-5.115V216h-5.115v-10.23    h-5.115l4.331-13.009c0.46-1.398,1.773-2.336,3.24-2.336l0,0H2123.685z M2123.582,181.9c1.893,0,3.41,1.517,3.41,3.41    s-1.518,3.41-3.41,3.41s-3.41-1.517-3.41-3.41S2121.69,181.9,2123.582,181.9z"></path>
                        <path id="SexM9" className="st10"
                              d="M2120.172,216v-12.788h-2.558v-9.378c0-1.876,1.535-3.41,3.41-3.41h5.115    c1.875,0,3.41,1.534,3.41,3.41v9.378h-2.557V216H2120.172z M2123.582,188.72c1.893,0,3.41-1.517,3.41-3.41s-1.518-3.41-3.41-3.41    s-3.41,1.517-3.41,3.41S2121.69,188.72,2123.582,188.72z"></path>
                    </g>
                </g>
                <g id="Tables">
                    <path className="st12"
                          d="M2095.582,12.784h56v42.075c0,2.158-1.675,3.925-3.722,3.925h-48.555c-2.047,0-3.723-1.767-3.723-3.925   V12.784z"></path>
                    <path className="st12"
                          d="M576.916,13h56v42.075c0,2.158-1.675,3.925-3.722,3.925h-48.555c-2.048,0-3.723-1.767-3.723-3.925V13z"></path>
                    <path className="st12"
                          d="M766.749,13h56v42.075c0,2.158-1.675,3.925-3.723,3.925h-48.555c-2.047,0-3.723-1.767-3.723-3.925V13z"></path>
                    <path className="st12"
                          d="M956.583,13h56v42.075c0,2.158-1.675,3.925-3.722,3.925h-48.555c-2.047,0-3.722-1.767-3.722-3.925V13z"></path>
                    <path className="st12"
                          d="M1146.416,13h56v42.075c0,2.158-1.675,3.925-3.722,3.925h-48.555c-2.047,0-3.723-1.767-3.723-3.925V13z"></path>
                    <path className="st12"
                          d="M1336.249,13h56v42.075c0,2.158-1.675,3.925-3.723,3.925h-48.555c-2.047,0-3.722-1.767-3.722-3.925V13z"></path>
                    <path className="st12"
                          d="M1526.082,13h56v42.075c0,2.158-1.675,3.925-3.722,3.925h-48.556c-2.047,0-3.722-1.767-3.722-3.925V13z"></path>
                    <path className="st12"
                          d="M1715.915,13h56v42.075c0,2.158-1.675,3.925-3.723,3.925h-48.554c-2.048,0-3.723-1.767-3.723-3.925V13z"></path>
                    <path className="st12"
                          d="M1905.748,13h56v42.075c0,2.158-1.675,3.925-3.723,3.925h-48.555c-2.047,0-3.723-1.767-3.723-3.925V13z"></path>

                </g>
                <g id="Cup_for_table">
                    <path className="st13"
                          d="M2133.591,43.709c0,1.148-0.928,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H2133.591   L2133.591,43.709z M2129.266,38.879L2129.266,38.879c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V38.879L2129.266,38.879z M2119.492,42.836L2119.492,42.836   c-0.979,0-1.771-0.795-1.771-1.775v-7.922h11.904c1.974,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366   c0,0.209-0.002,0.653-0.002,0.77c0,0.979-0.795,1.775-1.775,1.775H2119.492L2119.492,42.836z M2120.896,30.191L2120.896,30.191   c0,0.459-0.186,0.826-0.557,1.103c-0.103,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.166-0.027,0.237-0.083c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.635-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.131-0.391-0.391-0.391c-0.103,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.634,1.533C2120.685,29.462,2120.896,29.86,2120.896,30.191L2120.896,30.191z M2123.692,30.191   L2123.692,30.191c0,0.459-0.186,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.145-0.73,0.437-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.129-0.391-0.391-0.391c-0.102,0-0.193,0.035-0.271,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.633,1.533C2123.481,29.462,2123.692,29.86,2123.692,30.191L2123.692,30.191z M2126.488,30.191   L2126.488,30.191c0,0.459-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.167-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.634-0.872-0.634-1.244c0-0.396,0.147-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.634,1.533C2126.277,29.462,2126.488,29.86,2126.488,30.191z"></path>
                    <path className="st13"
                          d="M614.925,43.709c0,1.148-0.928,2.075-2.078,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H614.925   L614.925,43.709z M610.601,38.879L610.601,38.879c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V38.879L610.601,38.879z M600.826,42.836L600.826,42.836c-0.979,0-1.77-0.795-1.77-1.775   v-7.922h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366c0,0.209-0.003,0.653-0.003,0.77   c0,0.979-0.795,1.775-1.775,1.775H600.826L600.826,42.836z M602.23,30.191L602.23,30.191c0,0.459-0.186,0.826-0.557,1.103   c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.087,0,0.166-0.027,0.237-0.083   c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48c-0.422-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.118-0.173,0.118-0.284c0-0.261-0.131-0.391-0.391-0.391   c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.674,0.952-0.674,1.576c0,0.561,0.211,1.072,0.633,1.533   C602.019,29.462,602.23,29.86,602.23,30.191L602.23,30.191z M605.026,30.191L605.026,30.191c0,0.459-0.185,0.826-0.557,1.103   c-0.101,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.088,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48c-0.423-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.146-0.73,0.437-1.008c0.079-0.078,0.119-0.173,0.119-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.102,0-0.193,0.035-0.271,0.107c-0.45,0.426-0.676,0.952-0.676,1.576c0,0.561,0.211,1.072,0.633,1.533   C604.815,29.462,605.026,29.86,605.026,30.191L605.026,30.191z M607.822,30.191L607.822,30.191c0,0.459-0.185,0.826-0.557,1.103   c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.087,0,0.167-0.027,0.237-0.083   c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48c-0.422-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.147-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.211,1.072,0.633,1.533   C607.611,29.462,607.822,29.86,607.822,30.191z"></path>
                    <path className="st13"
                          d="M804.758,43.709c0,1.148-0.928,2.075-2.078,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H804.758   L804.758,43.709z M800.433,38.879L800.433,38.879c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V38.879L800.433,38.879z M790.659,42.836L790.659,42.836c-0.979,0-1.771-0.795-1.771-1.775   v-7.922h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366c0,0.209-0.002,0.653-0.002,0.77   c0,0.979-0.795,1.775-1.775,1.775H790.659L790.659,42.836z M792.063,30.191L792.063,30.191c0,0.459-0.186,0.826-0.557,1.103   c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.087,0,0.166-0.027,0.237-0.083   c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48c-0.423-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284c0-0.261-0.131-0.391-0.391-0.391   c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.211,1.072,0.633,1.533   C791.852,29.462,792.063,29.86,792.063,30.191L792.063,30.191z M794.859,30.191L794.859,30.191c0,0.459-0.185,0.826-0.557,1.103   c-0.101,0.078-0.154,0.186-0.154,0.318c0,0.262,0.132,0.392,0.391,0.392c0.088,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.211-1.023-0.633-1.48c-0.423-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.146-0.73,0.437-1.008c0.079-0.078,0.118-0.173,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.102,0-0.193,0.035-0.271,0.107c-0.45,0.426-0.676,0.952-0.676,1.576c0,0.561,0.211,1.072,0.633,1.533   C794.648,29.462,794.859,29.86,794.859,30.191L794.859,30.191z M797.655,30.191L797.655,30.191c0,0.459-0.185,0.826-0.557,1.103   c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.132,0.392,0.391,0.392c0.087,0,0.167-0.027,0.237-0.083   c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48c-0.422-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.147-0.73,0.438-1.008c0.079-0.078,0.118-0.173,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.211,1.072,0.633,1.533   C797.444,29.462,797.655,29.86,797.655,30.191z"></path>
                    <path className="st13"
                          d="M994.591,43.709c0,1.148-0.929,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H994.591   L994.591,43.709z M990.267,38.879L990.267,38.879c0,0,0.213-0.003,0.366-0.003c1.193,0,2.159-0.965,2.159-2.159   c0-1.192-0.966-2.157-2.159-2.157h-0.366V38.879L990.267,38.879z M980.493,42.836L980.493,42.836c-0.98,0-1.771-0.795-1.771-1.775   v-7.922h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366c0,0.209-0.002,0.653-0.002,0.77   c0,0.979-0.795,1.775-1.775,1.775H980.493L980.493,42.836z M981.897,30.191L981.897,30.191c0,0.459-0.186,0.826-0.557,1.103   c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.13,0.392,0.391,0.392c0.087,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.635-1.48c-0.423-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284c0-0.261-0.131-0.391-0.391-0.391   c-0.103,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.211,1.072,0.633,1.533   C981.685,29.462,981.897,29.86,981.897,30.191L981.897,30.191z M984.692,30.191L984.692,30.191c0,0.459-0.185,0.826-0.557,1.103   c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.088,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.211-1.023-0.633-1.48c-0.422-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.145-0.73,0.437-1.008c0.079-0.078,0.119-0.173,0.119-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.102,0-0.194,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576c0,0.561,0.211,1.072,0.634,1.533   C984.482,29.462,984.692,29.86,984.692,30.191L984.692,30.191z M987.489,30.191L987.489,30.191c0,0.459-0.185,0.826-0.557,1.103   c-0.103,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.087,0,0.167-0.027,0.237-0.083   c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48c-0.422-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.147-0.73,0.439-1.008c0.079-0.078,0.118-0.173,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.212,1.072,0.634,1.533   C987.278,29.462,987.489,29.86,987.489,30.191z"></path>
                    <path className="st13"
                          d="M1184.424,43.709c0,1.148-0.928,2.075-2.078,2.075h-15.861c-1.15,0-2.078-0.927-2.078-2.075H1184.424   L1184.424,43.709z M1180.1,38.879L1180.1,38.879c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V38.879L1180.1,38.879z M1170.326,42.836L1170.326,42.836c-0.979,0-1.771-0.795-1.771-1.775   v-7.922h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.6,3.575-3.575,3.575h-0.366c0,0.209-0.002,0.653-0.002,0.77   c0,0.979-0.795,1.775-1.775,1.775H1170.326L1170.326,42.836z M1171.73,30.191L1171.73,30.191c0,0.459-0.186,0.826-0.557,1.103   c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.087,0,0.166-0.027,0.237-0.083   c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48c-0.422-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284c0-0.261-0.131-0.391-0.391-0.391   c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.674,0.952-0.674,1.576c0,0.561,0.211,1.072,0.633,1.533   C1171.519,29.462,1171.73,29.86,1171.73,30.191L1171.73,30.191z M1174.526,30.191L1174.526,30.191c0,0.459-0.185,0.826-0.557,1.103   c-0.101,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.088,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48c-0.423-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.145-0.73,0.437-1.008c0.079-0.078,0.119-0.173,0.119-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.102,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576c0,0.561,0.211,1.072,0.633,1.533   C1174.315,29.462,1174.526,29.86,1174.526,30.191L1174.526,30.191z M1177.322,30.191L1177.322,30.191   c0,0.459-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.086,0,0.167-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.634-0.872-0.634-1.244c0-0.396,0.147-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.633,1.533C1177.111,29.462,1177.322,29.86,1177.322,30.191z"></path>
                    <path className="st13"
                          d="M1374.257,43.709c0,1.148-0.928,2.075-2.078,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H1374.257   L1374.257,43.709z M1369.933,38.879L1369.933,38.879c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V38.879L1369.933,38.879z M1360.159,42.836L1360.159,42.836   c-0.979,0-1.771-0.795-1.771-1.775v-7.922h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.576,3.575h-0.366   c0,0.209-0.003,0.653-0.003,0.77c0,0.979-0.795,1.775-1.775,1.775H1360.159L1360.159,42.836z M1361.563,30.191L1361.563,30.191   c0,0.459-0.186,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.166-0.027,0.238-0.083c0.576-0.434,0.864-1.011,0.864-1.73c0-0.528-0.212-1.023-0.634-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.131-0.391-0.391-0.391c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.674,0.952-0.674,1.576   c0,0.561,0.211,1.072,0.633,1.533C1361.351,29.462,1361.563,29.86,1361.563,30.191L1361.563,30.191z M1364.359,30.191   L1364.359,30.191c0,0.459-0.185,0.826-0.557,1.103c-0.101,0.078-0.154,0.186-0.154,0.318c0,0.262,0.132,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.238-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.423-0.458-0.634-0.872-0.634-1.244c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.118-0.173,0.118-0.284   c0-0.261-0.129-0.391-0.391-0.391c-0.102,0-0.193,0.035-0.271,0.107c-0.451,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.633,1.533C1364.148,29.462,1364.359,29.86,1364.359,30.191L1364.359,30.191z M1367.154,30.191   L1367.154,30.191c0,0.459-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.167-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.147-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.633,1.533C1366.944,29.462,1367.154,29.86,1367.154,30.191z"></path>
                    <path className="st13"
                          d="M1564.09,43.709c0,1.148-0.928,2.075-2.078,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H1564.09   L1564.09,43.709z M1559.766,38.879L1559.766,38.879c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V38.879L1559.766,38.879z M1549.991,42.836L1549.991,42.836   c-0.979,0-1.771-0.795-1.771-1.775v-7.922h11.904c1.975,0,3.583,1.604,3.583,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366   c0,0.209-0.003,0.653-0.003,0.77c0,0.979-0.795,1.775-1.775,1.775H1549.991L1549.991,42.836z M1551.396,30.191L1551.396,30.191   c0,0.459-0.186,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.166-0.027,0.238-0.083c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.131-0.391-0.391-0.391c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.674,0.952-0.674,1.576   c0,0.561,0.211,1.072,0.633,1.533C1551.184,29.462,1551.396,29.86,1551.396,30.191L1551.396,30.191z M1554.191,30.191   L1554.191,30.191c0,0.459-0.185,0.826-0.557,1.103c-0.101,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.238-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.423-0.458-0.634-0.872-0.634-1.244c0-0.396,0.146-0.73,0.437-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.102,0-0.193,0.035-0.271,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.633,1.533C1553.981,29.462,1554.191,29.86,1554.191,30.191L1554.191,30.191z M1556.987,30.191   L1556.987,30.191c0,0.459-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.086,0,0.167-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.451,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.633,1.533C1556.776,29.462,1556.987,29.86,1556.987,30.191z"></path>
                    <path className="st13"
                          d="M1753.923,43.709c0,1.148-0.928,2.075-2.078,2.075h-15.861c-1.15,0-2.078-0.927-2.078-2.075H1753.923   L1753.923,43.709z M1749.599,38.879L1749.599,38.879c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V38.879L1749.599,38.879z M1739.825,42.836L1739.825,42.836   c-0.979,0-1.771-0.795-1.771-1.775v-7.922h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366   c0,0.209-0.002,0.653-0.002,0.77c0,0.979-0.795,1.775-1.775,1.775H1739.825L1739.825,42.836z M1741.229,30.191L1741.229,30.191   c0,0.459-0.186,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.166-0.027,0.237-0.083c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.131-0.391-0.391-0.391c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.674,0.952-0.674,1.576   c0,0.561,0.211,1.072,0.633,1.533C1741.018,29.462,1741.229,29.86,1741.229,30.191L1741.229,30.191z M1744.025,30.191   L1744.025,30.191c0,0.459-0.185,0.826-0.557,1.103c-0.101,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.423-0.458-0.634-0.872-0.634-1.244c0-0.396,0.145-0.73,0.437-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.102,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.633,1.533C1743.814,29.462,1744.025,29.86,1744.025,30.191L1744.025,30.191z M1746.821,30.191   L1746.821,30.191c0,0.459-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.167-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.147-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.451,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.633,1.533C1746.61,29.462,1746.821,29.86,1746.821,30.191z"></path>
                    <path className="st13"
                          d="M1943.757,43.709c0,1.148-0.928,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H1943.757   L1943.757,43.709z M1939.432,38.879L1939.432,38.879c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V38.879L1939.432,38.879z M1929.658,42.836L1929.658,42.836   c-0.979,0-1.771-0.795-1.771-1.775v-7.922h11.904c1.974,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366   c0,0.209-0.002,0.653-0.002,0.77c0,0.979-0.795,1.775-1.775,1.775H1929.658L1929.658,42.836z M1931.062,30.191L1931.062,30.191   c0,0.459-0.186,0.826-0.557,1.103c-0.103,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.166-0.027,0.237-0.083c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.635-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.146-0.73,0.438-1.008c0.079-0.078,0.118-0.173,0.118-0.284   c0-0.261-0.131-0.391-0.391-0.391c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.634,1.533C1930.85,29.462,1931.062,29.86,1931.062,30.191L1931.062,30.191z M1933.858,30.191   L1933.858,30.191c0,0.459-0.186,0.826-0.558,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.423-0.458-0.634-0.872-0.634-1.244c0-0.396,0.145-0.73,0.437-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.102,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.633,1.533C1933.647,29.462,1933.858,29.86,1933.858,30.191L1933.858,30.191z M1936.654,30.191   L1936.654,30.191c0,0.459-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.186-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.166-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.634-0.872-0.634-1.244c0-0.396,0.147-0.73,0.438-1.008c0.079-0.078,0.119-0.173,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.633,1.533C1936.443,29.462,1936.654,29.86,1936.654,30.191z"></path>
                </g>
                <g id="Window">
                    <line className="st14" x1="553.916" y1="4" x2="655.916" y2="4"></line>
                    <line className="st14" x1="743.749" y1="4" x2="845.749" y2="4"></line>
                    <line className="st14" x1="933.583" y1="4" x2="1035.583" y2="4"></line>
                    <line className="st14" x1="1123.416" y1="4" x2="1225.416" y2="4"></line>
                    <line className="st14" x1="1313.249" y1="4" x2="1415.249" y2="4"></line>
                    <line className="st14" x1="1503.082" y1="4" x2="1605.082" y2="4"></line>
                    <line className="st14" x1="1692.915" y1="4" x2="1794.915" y2="4"></line>
                    <line className="st14" x1="1882.748" y1="4" x2="1984.748" y2="4"></line>
                    <line className="st14" x1="2072.583" y1="4" x2="2174.582" y2="4"></line>
                    <line className="st14" x1="118" y1="4" x2="202" y2="4"></line>
                    <line className="st14" x1="232.5" y1="4" x2="334.5" y2="4"></line>
                    <line className="st14" x1="21" y1="4" x2="87" y2="4"></line>
                    <line className="st14" x1="2399" y1="4" x2="2333" y2="4"></line>
                    <line className="st14" x1="2307.25" y1="4" x2="2227.25" y2="4"></line>
                    <line className="st14" x1="21" y1="332" x2="87" y2="332"></line>
                    <line className="st14" x1="2399" y1="332" x2="2333" y2="332"></line>
                    <line className="st14" x1="2307.25" y1="332" x2="2227.25" y2="332"></line>
                    <line className="st14" x1="232.212" y1="4" x2="334.212" y2="4"></line>
                    <line className="st14" x1="364" y1="4" x2="466" y2="4"></line>
                    <line className="st14" x1="553.916" y1="332" x2="655.916" y2="332"></line>
                    <line className="st14" x1="743.749" y1="332" x2="845.749" y2="332"></line>
                    <line className="st14" x1="933.583" y1="332" x2="1035.583" y2="332"></line>
                    <line className="st14" x1="1123.416" y1="332" x2="1225.416" y2="332"></line>
                    <line className="st14" x1="1313.249" y1="332" x2="1415.249" y2="332"></line>
                    <line className="st14" x1="1503.082" y1="332" x2="1605.082" y2="332"></line>
                    <line className="st14" x1="1692.915" y1="332" x2="1794.915" y2="332"></line>
                    <line className="st14" x1="1882.748" y1="332" x2="1984.748" y2="332"></line>
                    <line className="st14" x1="2072.583" y1="332" x2="2174.582" y2="332"></line>
                    <line className="st14" x1="379.5" y1="332" x2="481.5" y2="332"></line>
                </g>
                <g id="Icons">
                    <path id="Exit" className="st13"
                          d="M66.616,22.861v19.712L75.345,48V18.308L66.616,22.861L66.616,22.861z M56.231,22.656   L56.231,22.656c1.282-0.031,2.302-1.097,2.271-2.381c-0.032-1.288-1.101-2.304-2.384-2.274c-1.283,0.031-2.301,1.097-2.27,2.385   C53.879,21.67,54.946,22.687,56.231,22.656L56.231,22.656z M49.837,26.804L49.837,26.804l-2.235,5.53   c-0.406,0.922-0.14,1.841,0.948,2.185l0.586,0.129l2.66-6.449h0.003c0.237-0.496,0.614-0.908,1.068-1.232l-0.495,6.886   l-0.007,0.003l-1.016,7.028l-3.026,4.293c0,0-0.374,0.587-0.004,1.303c0.254,0.49,1.285,1.222,1.285,1.222l4.686-6.262l1.108-6.596   c0.063-0.004,0.127-0.008,0.195-0.014l-0.01,0.009l3.272,11.575c0,0,0.123,0.728,0.508,1.071c0.435,0.397,1.082,0.408,1.082,0.408   l1.404-0.211l-3.576-14.272c0-1.499,0.009-4.972,0.009-6.506c0-2.055-0.54-3.172-3.09-3.39   C54.588,23.468,51.467,22.866,49.837,26.804L49.837,26.804z M63.083,33.234L63.083,33.234l0.147-0.296l-3.995-2.758l-0.103,2.58   l1.995,1.184C61.962,34.328,62.597,34.214,63.083,33.234z"></path>
                    <path id="Exit_1_" className="st13"
                          d="M66.616,292.861v19.712l8.73,5.427v-29.692L66.616,292.861L66.616,292.861z M56.231,292.656   L56.231,292.656c1.282-0.031,2.302-1.097,2.271-2.381c-0.032-1.288-1.101-2.304-2.384-2.274c-1.283,0.031-2.301,1.097-2.27,2.385   C53.879,291.67,54.946,292.686,56.231,292.656L56.231,292.656z M49.837,296.804L49.837,296.804l-2.235,5.53   c-0.406,0.922-0.14,1.841,0.948,2.185l0.586,0.129l2.66-6.449h0.003c0.237-0.496,0.614-0.908,1.068-1.232l-0.495,6.886   l-0.007,0.003l-1.016,7.028l-3.026,4.293c0,0-0.374,0.587-0.004,1.303c0.254,0.49,1.285,1.222,1.285,1.222l4.686-6.262l1.108-6.596   c0.063-0.004,0.127-0.008,0.195-0.014l-0.01,0.009l3.272,11.575c0,0,0.123,0.728,0.508,1.071c0.435,0.397,1.082,0.408,1.082,0.408   l1.404-0.211l-3.576-14.272c0-1.499,0.009-4.972,0.009-6.506c0-2.055-0.54-3.172-3.09-3.39   C54.588,293.468,51.467,292.866,49.837,296.804L49.837,296.804z M63.083,303.233L63.083,303.233l0.147-0.296l-3.995-2.758   l-0.103,2.58l1.995,1.184C61.962,304.327,62.597,304.213,63.083,303.233z"></path>
                    <path id="Exit_2_" className="st13"
                          d="M2372.556,292.861v19.712l8.729,5.427v-29.692L2372.556,292.861L2372.556,292.861z    M2362.171,292.656L2362.171,292.656c1.282-0.031,2.302-1.097,2.271-2.381c-0.032-1.288-1.101-2.304-2.384-2.274   c-1.283,0.031-2.301,1.097-2.27,2.385C2359.82,291.67,2360.887,292.686,2362.171,292.656L2362.171,292.656z M2355.777,296.804   L2355.777,296.804l-2.235,5.53c-0.406,0.922-0.139,1.841,0.948,2.185l0.586,0.129l2.66-6.449h0.003   c0.237-0.496,0.614-0.908,1.068-1.232l-0.495,6.886l-0.007,0.003l-1.016,7.028l-3.026,4.293c0,0-0.374,0.587-0.004,1.303   c0.254,0.49,1.285,1.222,1.285,1.222l4.686-6.262l1.107-6.596c0.063-0.004,0.127-0.008,0.196-0.014l-0.01,0.009l3.272,11.575   c0,0,0.123,0.728,0.508,1.071c0.435,0.397,1.082,0.408,1.082,0.408l1.404-0.211l-3.576-14.272c0-1.499,0.009-4.972,0.009-6.506   c0-2.055-0.54-3.172-3.09-3.39C2360.529,293.468,2357.408,292.866,2355.777,296.804L2355.777,296.804z M2369.023,303.233   L2369.023,303.233l0.146-0.296l-3.995-2.758l-0.103,2.58l1.995,1.184C2367.903,304.327,2368.538,304.213,2369.023,303.233z"></path>
                    <path id="Exit_3_" className="st13"
                          d="M2372.556,22.861v19.712l8.729,5.427V18.308L2372.556,22.861L2372.556,22.861z M2362.171,22.656   L2362.171,22.656c1.282-0.031,2.302-1.097,2.271-2.381c-0.032-1.288-1.101-2.304-2.384-2.274c-1.283,0.031-2.301,1.097-2.27,2.385   C2359.82,21.67,2360.887,22.687,2362.171,22.656L2362.171,22.656z M2355.777,26.804L2355.777,26.804l-2.235,5.53   c-0.406,0.922-0.139,1.841,0.948,2.185l0.586,0.129l2.66-6.449h0.003c0.237-0.496,0.614-0.908,1.068-1.232l-0.495,6.886   l-0.007,0.003l-1.016,7.028l-3.026,4.293c0,0-0.374,0.587-0.004,1.303c0.254,0.49,1.285,1.222,1.285,1.222l4.686-6.262l1.107-6.596   c0.063-0.004,0.127-0.008,0.196-0.014l-0.01,0.009l3.272,11.575c0,0,0.123,0.728,0.508,1.071c0.435,0.397,1.082,0.408,1.082,0.408   l1.404-0.211l-3.576-14.272c0-1.499,0.009-4.972,0.009-6.506c0-2.055-0.54-3.172-3.09-3.39   C2360.529,23.468,2357.408,22.866,2355.777,26.804L2355.777,26.804z M2369.023,33.234L2369.023,33.234l0.146-0.296l-3.995-2.758   l-0.103,2.58l1.995,1.184C2367.903,34.328,2368.538,34.214,2369.023,33.234z"></path>
                    <path id="WC" className="st13"
                          d="M145,50.124h3.478l1.647,9.844h0.037l1.721-9.844h4.32l1.794,9.844h0.036l1.666-9.844h3.313   l-2.856,12.809h-4.375l-1.812-9.844h-0.036l-1.684,9.844h-4.411L145,50.124L145,50.124z M175,62.639   c-0.683,0.183-1.3,0.314-1.849,0.393c-0.549,0.079-1.135,0.119-1.757,0.119c-1.306,0-2.431-0.168-3.377-0.503   c-0.946-0.335-1.724-0.802-2.334-1.4c-0.61-0.598-1.065-1.296-1.364-2.095c-0.299-0.799-0.448-1.668-0.448-2.607   c0-1.135,0.201-2.132,0.604-2.992c0.403-0.86,0.921-1.558,1.556-2.095c0.622-0.512,1.376-0.9,2.261-1.162   c0.885-0.262,1.852-0.393,2.901-0.393c0.354,0,0.848,0.037,1.483,0.11c0.635,0.073,1.403,0.256,2.306,0.549l-0.274,2.763   c-0.391-0.208-0.876-0.409-1.455-0.604c-0.58-0.195-1.199-0.293-1.858-0.293c-0.683,0-1.26,0.113-1.73,0.338   c-0.47,0.226-0.845,0.479-1.126,0.759c-0.329,0.329-0.604,0.756-0.824,1.281c-0.219,0.525-0.329,1.116-0.329,1.775   c0,0.622,0.104,1.189,0.311,1.702c0.207,0.512,0.488,0.933,0.842,1.262c0.366,0.354,0.827,0.622,1.382,0.805   c0.555,0.183,1.132,0.274,1.73,0.274c0.476,0,0.995-0.058,1.556-0.174c0.561-0.116,1.104-0.277,1.629-0.485L175,62.639z"></path>
                    <path id="WC_1_" className="st13"
                          d="M2252.25,87.096h3.478l1.647,9.844h0.037l1.721-9.844h4.32l1.793,9.844h0.037l1.666-9.844h3.313   l-2.855,12.809h-4.375l-1.812-9.844h-0.036l-1.684,9.844h-4.411L2252.25,87.096L2252.25,87.096z M2282.25,99.612   c-0.683,0.183-1.3,0.314-1.848,0.393c-0.549,0.079-1.135,0.119-1.757,0.119c-1.306,0-2.431-0.168-3.377-0.503   c-0.946-0.335-1.724-0.802-2.334-1.4c-0.61-0.598-1.065-1.296-1.364-2.095c-0.299-0.799-0.448-1.668-0.448-2.607   c0-1.135,0.201-2.132,0.604-2.992c0.403-0.86,0.921-1.558,1.556-2.095c0.623-0.512,1.376-0.9,2.261-1.162   c0.885-0.262,1.852-0.393,2.901-0.393c0.354,0,0.848,0.037,1.482,0.11c0.635,0.073,1.403,0.256,2.306,0.549l-0.274,2.763   c-0.391-0.208-0.875-0.409-1.455-0.604c-0.58-0.195-1.199-0.293-1.858-0.293c-0.683,0-1.26,0.113-1.729,0.338   c-0.47,0.226-0.845,0.479-1.126,0.759c-0.329,0.329-0.604,0.756-0.824,1.281c-0.219,0.525-0.329,1.116-0.329,1.775   c0,0.622,0.104,1.189,0.311,1.702c0.208,0.512,0.488,0.933,0.842,1.262c0.366,0.354,0.827,0.622,1.382,0.805   c0.555,0.183,1.132,0.274,1.73,0.274c0.476,0,0.995-0.058,1.556-0.174c0.561-0.116,1.104-0.277,1.629-0.485L2282.25,99.612z"></path>
                    <path id="Steward" className="st13"
                          d="M297.048,86.156c-0.907-0.445-3.205-0.862-5.354-1.479c0.007-0.007-1.169-0.366-1.169-0.366   c-0.231-0.079-0.457-0.162-0.674-0.248c-0.296-0.118-0.524-0.218-0.74-0.322c-0.134-0.066-0.222-0.112-0.308-0.157   c-0.147-0.08-0.23-0.129-0.311-0.177c-0.13-0.08-0.22-0.139-0.305-0.201c-0.081-0.058-0.156-0.117-0.227-0.177   c-0.106-0.091-0.158-0.14-0.207-0.189c-0.103-0.106-0.152-0.163-0.198-0.221c-0.072-0.093-0.117-0.162-0.157-0.231   c-0.054-0.102-0.08-0.157-0.102-0.212c-0.043-0.123-0.057-0.176-0.069-0.23c-0.028-0.145-0.036-0.222-0.036-0.3v-1.358   c1.369-1.088,2.372-2.762,2.758-4.709c0.727,0.009,1.298-1.176,1.353-2.64c0.054-1.463-0.428-2.649-1.078-2.649   c-0.033,0-0.065,0.005-0.097,0.011v-0.957h0.229l0.591-3.293c0-1.562-0.897-2.166-3.192-2.718   c-2.296-0.552-4.749-1.117-8.009-1.429c-3.26-0.312-3.69-0.462-3.69,2.261l0.576,5.179h0.257V70.3   c-0.032-0.006-0.065-0.011-0.097-0.011c-0.651,0-1.132,1.186-1.078,2.649c0.055,1.464,0.626,2.649,1.277,2.649   c0.462,1.938,1.465,3.614,2.834,4.7v1.357c0,0.079-0.008,0.155-0.021,0.232c-0.026,0.122-0.041,0.175-0.058,0.227   c-0.047,0.126-0.073,0.18-0.101,0.232c-0.067,0.121-0.111,0.189-0.161,0.256c-0.071,0.088-0.118,0.142-0.168,0.196   c-0.103,0.103-0.152,0.148-0.204,0.193c-0.125,0.106-0.194,0.16-0.266,0.211c-0.104,0.076-0.191,0.133-0.281,0.189   c-0.129,0.078-0.204,0.122-0.282,0.164c-0.026,0.015-0.052,0.029-0.079,0.043c-0.078,0.042-0.156,0.082-0.238,0.122   c-0.279,0.135-0.501,0.233-0.733,0.325c-0.028,0.011-0.057,0.023-0.084,0.034c-0.05,0.019-0.1,0.039-0.15,0.058l-1.678,0.551   c-2.149,0.618-4.447,1.036-5.354,1.48c-0.6,0.293-1.11,0.721-1.464,1.356c0.001,0.001,30,0.002,30,0.002   C298.147,86.882,297.644,86.45,297.048,86.156L297.048,86.156z M279.477,67.206c-0.695,0-1.259-0.751-1.259-1.677   c0-0.927,0.564-1.678,1.259-1.678c0.695,0,1.259,0.751,1.259,1.678C280.736,66.455,280.173,67.206,279.477,67.206L279.477,67.206z"></path>
                    <path id="HotWater" className="st13"
                          d="M311.357,306.714c0,1.579-1.279,2.857-2.857,2.857c-1.579,0-2.857-1.279-2.857-2.857   c0-1.9,2.857-5,2.857-5S311.357,304.814,311.357,306.714z M284.214,281h11.429v7.143h5.714v-2.857L298.5,286v-3.571l2.857,0.714   h2.857l2.857-0.714V286l-2.857-0.714v2.857h4.286c1.579,0,2.857,1.279,2.857,2.857v5.714c0.789,0,1.429,0.64,1.429,1.429   s-0.64,1.429-1.429,1.429h-5.714c-0.789,0-1.429-0.64-1.429-1.429s0.64-1.429,1.429-1.429v-2.857h-10V311h-11.429V281z"></path>
                    <path id="RoomService" className="st13"
                          d="M441.648,107.24c0.06-0.48,0.105-0.96,0.105-1.455c0-0.495-0.045-0.99-0.105-1.5   l3.165-2.445c0.285-0.225,0.36-0.63,0.18-0.96l-3-5.19c-0.18-0.33-0.585-0.465-0.915-0.33l-3.735,1.5   c-0.78-0.585-1.59-1.095-2.535-1.47l-0.555-3.975c-0.06-0.36-0.375-0.63-0.75-0.63h-6c-0.375,0-0.69,0.27-0.75,0.63l-0.555,3.975   c-0.945,0.375-1.755,0.885-2.535,1.47l-3.735-1.5c-0.33-0.135-0.735,0-0.915,0.33l-3,5.19c-0.195,0.33-0.105,0.735,0.18,0.96   l3.165,2.445c-0.06,0.51-0.105,1.005-0.105,1.5c0,0.495,0.045,0.975,0.105,1.455l-3.165,2.49c-0.285,0.225-0.375,0.63-0.18,0.96   l3,5.19c0.18,0.33,0.585,0.45,0.915,0.33l3.735-1.515c0.78,0.6,1.59,1.11,2.535,1.485l0.555,3.975c0.06,0.36,0.375,0.63,0.75,0.63   h6c0.375,0,0.69-0.27,0.75-0.63l0.555-3.975c0.945-0.39,1.755-0.885,2.535-1.485l3.735,1.515c0.33,0.12,0.735,0,0.915-0.33l3-5.19   c0.18-0.33,0.105-0.735-0.18-0.96L441.648,107.24z M430.503,111.035c-2.899,0-5.25-2.351-5.25-5.25s2.351-5.25,5.25-5.25   s5.25,2.351,5.25,5.25S433.403,111.035,430.503,111.035z"></path>
                </g>
            </svg>
        </div>
    )
}