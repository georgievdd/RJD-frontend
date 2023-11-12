import React from 'react'
import { QuestionnaireImage } from './QuestionnaireImage';
import classes from './DropzoneButton.module.css';
import {
  Container,
  Group,
  TextInput,
  Textarea,
  Title,
  Text,
  Button,
  Checkbox,
  TagsInput,
  Paper,
  Radio,
  Space, 
  InputLabel
} from '@mantine/core';
import { CheckboxWords, RadioInputQuestions, RadioQuestions, TagInputWords } from './QuestionnaireData';

const Questionnaire = ({
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
          <br />
          <Title>Расскажите о себе</Title>
          <Textarea
            required
            label="Это поможет подобрать вам лучших попутчиков"
            placeholder=""
            inputMode='text'
            {...questionnaire.bio}
            />
          <br/>
          <InputLabel>Выберете несколько ключевых слов, описывающих вас наилучшим образом:</InputLabel>
          {CheckboxWords.map((e, i) => (
            <Checkbox 
              name={e + i} 
              key={e + i} 
              label={e} 
              mb={5} 
              checked={questionnaire.checkBox.includes(e)} 
              onClick={() => questionnaire.setCheckBox(e)}
            />
            ))}
          <br/>
          <InputLabel>Добавьте что нибудь</InputLabel>
          <TagsInput
            placeholder="Введите или выберите значение"
            data={TagInputWords}
            maxDropdownHeight={200}
            onChange={(v) => questionnaire.setTagInput(v)}
            value={questionnaire.tagInput}
          />
          <br/>
          <Container>
            <Title>
              Ответьте, пожалуйста, на несколько вопросов
            </Title>
            <Text size='xl' mb={20}>
              Это поможет подобрать вам наиболее подходящих попутчиков
            </Text>

            {RadioQuestions.map((e, i) => (
              <Container key={e.question + i} mb={20}>
                <InputLabel>
                  {i + 1}. {e.question} <span style={{color: 'red'}}>*</span>
                </InputLabel>
                {e.answers.map((g, j) => (
                  <Radio 
                    required 
                    name={e.question + i} 
                    key={g + j} 
                    label={g} 
                    mb={8}
                    checked={questionnaire.radio[i] === j}
                    onClick={() => questionnaire.setRadio(i, j)}
                  />
                ))}
              </Container>
            ))}
          </Container>


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

export default Questionnaire;