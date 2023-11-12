import {
    TextInput,
    Button,
    Group,
    InputLabel,
    Text,
    Modal, Space, Checkbox,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { theme } from '../../index';
import { useForm } from '../../hooks';
import Questionnaire from '../../components/Questionnaire/Questionnaire';
import { useQuestionnaire } from '../../components/Questionnaire/useQuestionnaire';
import { showAlert } from '../../utils';

const RegistrationFrom = ({submit}) => {

    const {values, email, password, phone} = useForm({
        email: '',
        password: '',
        phone: '',
    });
    const [showQuestionnaire, setShow] = useState(false);
    const questionnaire = useQuestionnaire();

    const submitWrapper = (e) => {
        e.preventDefault();
        if (!questionnaire.isCompeted) {
            showAlert('Необходимо заполнить анкету!');
            return;
        }
        console.log(questionnaire.dto)
        submit({
            ...values,
            ...questionnaire.dtoOther,
            questionnaire: questionnaire.dto,
        });
    }

    return (
        <>
            <Modal
                opened={showQuestionnaire}
                onClose={() => setShow(false)}
                size='100%'
                fullScreen
                radius={0}
                transitionProps={{transition: 'fade', duration: 200}}
            >
                <Questionnaire submit={() => setShow(false)} questionnaire={questionnaire}/>
            </Modal>
            <form onSubmit={e=>submitWrapper(e)} style={{paddingBottom: '20px'}}>
                <TextInput
                    {...email}
                    label="Email"
                    type="email"
                    placeholder="you@mantine.dev"
                    required
                />
                <Space h='sm'/>
                <TextInput
                    {...password}
                    label="password"
                    type="password"
                    placeholder="Your password"
                    required
                />
                <Space h='sm'/>
                <InputLabel>Ваш номер</InputLabel>
                <PhoneInput
                    country={'ru'}
                    width={'100%'}
                    {...phone}
                />
                <Space h='sm'/>
                <Button size='xs' color={theme.colors.button[0]} onClick={() => setShow(true)}>
                    Дополнительные данные
                </Button>
                <Space h='sm'/>
                <Group>
                    <Checkbox required label='Соглашаюсь на обработку данных'></Checkbox>
                </Group>
                <Space h='sm'/>

                <Button type="submit" fullWidth >
                    Registration
                </Button>
            </form>
        </>
    )
}

export default RegistrationFrom;