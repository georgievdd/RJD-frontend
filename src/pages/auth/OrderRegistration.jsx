import { Anchor, Avatar, Card, Checkbox, Container, Group, InputLabel, Modal, Paper, Text, TextInput, Textarea, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useFileLoad, useForm } from '../../hooks'
import './Auth.css';
import { Button } from '@mantine/core';
import { VscArchive } from "react-icons/vsc";
import Questionnaire from '../../components/Questionnaire/Questionnaire';
import { useQuestionnaire } from '../../components/Questionnaire/useQuestionnaire';

const Companion = ({data, remove}) => {
  return (
    <Paper withBorder p={0} mb={10}>
      <Group justify='space-between'>
        <div>
          <Group gap={0}>
            <Avatar ml={20}/>
            <Card>
              <Title size='md'>
                {data.name} {data.surname}
              </Title>
              <Text>
                Место: {data.place} 
              </Text>
            </Card>
          </Group>
        </div>
        <VscArchive
          size='30px'
          color='red'
          style={{marginRight: '20px'}}
          onClick={remove}
        />
      </Group>
    </Paper>
  );
}

const OrderRegistration = () => {
  const {values, name, surname, patronymic, birthday} = useForm({
    name: '',
    surname: '',
    patronymic: '',
    birthday: 'Ваш день рождения',
  });
  const questionnaire = useQuestionnaire();

  const order = {
    ticketCost: 1000,
    train: 'Ласточка',
    place: '1B',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem sint velit odit aperiam culpa consequatur neque placeat molestiae quaerat reprehenderit magni similique quos, at, eligendi nisi. Reprehenderit in sunt aut?',
  }

  const profileImg = useFileLoad();
  const [componions, setComponions] = useState([]);
  const [showQuestionnaire, setShow] = useState(false);

  const addCompanion = data => {
    setComponions(prev => [...prev, {
      name: `Вася${prev.length + 1}`,
      surname: 'Пасажин',
      place: '2B',
    }]);
    setShow(false);
  }

  return (
    <Container>

            <Modal
              // withCloseButton={false}
              opened={showQuestionnaire} 
              onClose={() => setShow(false)} 
              size='100%'
              fullScreen
              radius={0}
              transitionProps={{ transition: 'fade', duration: 200 }}
            >   
              <Questionnaire
                submit={(data) => addCompanion(data)}
                questionnaire={questionnaire}
              />
            </Modal>

      <Paper withBorder p={50}>
        <Group justify='space-between'>
          <div>
            <Title>
              {order.train}
            </Title>
            <Text size='xl'>
              Стоимость: {order.ticketCost * (componions.length + 1)}
            </Text>
            <Text size='xl'>
              Ваше место: {order.place}
            </Text>
          </div>
          <Container w='50%' mr={0}>
            <Text>{order.description}</Text>
          </Container>
        </Group>
        <br /><br />
        <Paper withBorder w={'50%'} p='20px' radius={10}>
          <Group justify='space-between' mb={10}>
            <Title size='xl'>
              Мои компаньоны
            </Title>
            <Button color='green' onClick={() => setShow(true)}>
              Добавить
            </Button>
          </Group>
          {componions.map((e, idx) => (
            <Companion key={idx} data={e} remove={() => {
              setComponions(prev => prev.filter((e, i) => i !== idx));
            }}/>
          ))}
        </Paper>
      </Paper>
    </Container>
  )
}

export default OrderRegistration