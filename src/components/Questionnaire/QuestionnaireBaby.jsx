import React from 'react'
import { QuestionnaireImage } from './QuestionnaireImage';
import classes from './DropzoneButton.module.css';
import {
  Container,
  Group,
  TextInput,
  Button,
  Paper,
  Radio,
  Space, 
  InputLabel
} from '@mantine/core';
import PhoneInput from 'react-phone-input-2';

const QuestionnaireBaby = ({
  submit,
  questionnaire
}) => {

  return (
    <Container p={0}>
      <Paper withBorder radius='10px' p={20}>
        <form onSubmit={e => {e.preventDefault(); questionnaire.setIsCompeted(true); submit()}}>
          <Group>
            <QuestionnaireImage setImage={questionnaire.setImage}/>
            <Container ml='20px'>
              <TextInput required className={classes.headinput} {...questionnaire.name} placeholder='Имя'/>
              <TextInput required className={classes.headinput} {...questionnaire.surname} placeholder='Фамилия'/>
              <TextInput required className={classes.headinput} {...questionnaire.patronymic} placeholder='Отчество'/>
              <TextInput
                required
                mt={10}
                label='Ваш день рождения'
                w='200px'
                type='date'
                {...questionnaire.birthday}
              />
              <br/><br/>
            </Container>
          </Group>
          <br />
          <Group>
            <InputLabel>Пол:<span style={{color: 'red'}}>*</span></InputLabel>
            <Radio 
              required
              name='sex'
              label='женщина'
              checked={questionnaire.sex === 'female'}
              onClick={() => questionnaire.setSex('female')}
            />
            <Radio 
              required
              name='sex'
              label='мужчина'
              checked={questionnaire.sex === 'male'} 
              onClick={() => questionnaire.setSex('male')}
            />
          </Group>
          <Space h={10} />
          {/* <Group>
            <InputLabel>У вас есть проблемы со здоровьем?<span style={{color: 'red'}}>*</span></InputLabel>
            <Radio 
              required
              name='sick'
              label='Да.'
              checked={questionnaire.isSick === 'Да.'}
              onClick={() => questionnaire.setIsSick('Да.')}
            />
            <Radio 
              required
              name='sick'
              label='Нет.'
              checked={questionnaire.isSick === 'Нет.'} 
              onClick={() => questionnaire.setIsSick('Нет.')}
            />
          </Group> */}
          <InputLabel>Номер</InputLabel>
          <PhoneInput
            country={'ru'}
            width={'100%'}
            {...questionnaire.phone}
          />
          <Group justify='center'>
            <Button type="submit" mt="20px" size='xl'>
              Готово
            </Button>
          </Group>
        </form>
      </Paper>
      <Space h={50}/>
    </Container>
  )
}

export default QuestionnaireBaby;