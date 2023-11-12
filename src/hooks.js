import {useCallback, useEffect, useState} from 'react';
import {showAlert} from "./utils";
import {useSearchParams} from "react-router-dom";
import {type} from "@testing-library/user-event/dist/type";
import dayjs from "dayjs";

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const createChangeHandler = useCallback((name) => (event) => {
        let value = event.target?.value || event;
        if(value.toString() === '[object Object]') value = ''
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }, []);

    const formUtilities = {};

    for (let field in initialValues) {
        formUtilities[field] = {
            name: field,
            value: values[field],
            onChange: createChangeHandler(field),
            defaultValue: initialValues[field],
        };
    }


    return {
        values,
        ...formUtilities,
    };
};

const useMySearchParams = () => {
    const [params, setParams] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        setParams(params);
    }, [searchParams]);

    function setMySearchParams(searchParams) {
        setSearchParams(searchParams);
    }

    return [params, setMySearchParams];
}
export const useSearchParamsForm = (initialValues) => {
    const [values, setValues] = useMySearchParams();
    useEffect(() => {
        setValues(values => {
            const params = Object.fromEntries(values.entries());
            return {
                ...params,
                ...initialValues
            }
        })
    }, []);
    const createChangeHandler = useCallback((name) => (event) => {
        let value = event.target?.value || event;
        if(value === '[object Object]') value = ''
        setValues({
            ...values,
            [name]: value
        });
    }, [values]);

    const formUtilities = {};

    for (let field in initialValues) {
        formUtilities[field] = {
            name: field,
            value: values[field],
            onChange: createChangeHandler(field),
        };
    }

    return {
        values,
        ...formUtilities,
    };
};

export function useQuery(func, ...params) {
    const [data, setData] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await func(...params);
            setData(response);
            console.log(response);
        } catch (error) {
            setError(error);
            showAlert(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchData()
    }, [...params]);

    return [data, fetchData, {error, loading}];
}

export const useFileLoad = () => {
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [drag, setDrag] = useState(false);
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
        setImgUrl(fileReader.result);
    }

    const handle = e => {
        e.preventDefault();
        const file = e.target.files[0];
        setImg(file);
        fileReader.readAsDataURL(file);
    }

    const handleFile = file => {
        setImg(file);
        fileReader.readAsDataURL(file);
    }

    return {
        imgUrl,
        handle,
        handleFile
    }

}