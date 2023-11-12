import { useState } from "react";
import { useForm } from "../../hooks";
import { CheckboxWords, RadioQuestions } from "./QuestionnaireData";



export function useQuestionnaireBaby(/*initValues*/) {

  const {
    values, 
    name, 
    surname, 
    patronymic, 
    birthday,
    phone,
  } = useForm({
    name: '', 
    surname: '', 
    patronymic: '', 
    birthday: '',
    phone: '',
  });
  const [image, setImage] = useState(null);
  const [sex, setSex] = useState('');
  const [isCompeted, setIsCompeted] = useState(false);

  const clear = () => {
    setImage(null);
    setSex('');
    setIsCompeted(false);
    phone.onChange('');
    name.onChange('');
    surname.onChange('');
    patronymic.onChange('');
    birthday.onChange('');
  }

  const dto = {
    ...values,
    avatar: image,
    sex,
  };

  return {
    dto,
    values,
    phone,
    name, 
    surname, 
    patronymic, 
    birthday,
    isCompeted,
    setIsCompeted,
    image,
    setImage,
    sex, 
    setSex,
    clear,
  }

}