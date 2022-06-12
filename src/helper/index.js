import * as Yup from 'yup';

export const validationSchema = Yup.object({
    userName: Yup.string().required("Zorunlu alan").matches(
        /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/,
        "Girdiğin url Linkedin profil formatına ait değil"
    ),
    description: Yup.string().required("Zorunlu alan").min(5, 'Minimum 5 karakter olmalı').max(35, 'En fazla 35 karakter olabilir'),
    fullName: Yup.string().required('Zorunlu alan').min(3, 'Minimum 3 karakter olmalı').max(22, 'En fazla 22 karakter olabilir'),
});

export const validationSchema2 = Yup.object({
    linkedin: Yup.string().required("Zorunlu alan").matches(
        /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/,
        "Girdiğin url Linkedin profil formatına ait değil"
    ),
    github: Yup.string().required("Zorunlu alan").matches(
        /^(http(s)?:\/\/)?(www\.)?github\.com/,
        "Girdiğin url Github profil formatına ait değil"
    )
});

export const validationSchema3 = Yup.object().shape({
    mail: Yup.string().email('Geçersiz mail formatı').required('Required').min(10, 'Minimum 10 karakter olmalı').max(35, 'En fazla 35 karakter olabilir'),
    userName:Yup.string().required("Zorunlu alan").min(5, 'Minimum 5 karakter olmalı').max(35, 'En fazla 35 karakter olabilir'),
    password:Yup.string().required("Zorunlu alan").min(5, 'Minimum 5 karakter olmalı').max(35, 'En fazla 35 karakter olabilir')
 });

 export const validationSchema4 = Yup.object().shape({
    mail: Yup.string().email('Geçersiz mail formatı').required('Required').min(10, 'Minimum 10 karakter olmalı').max(35, 'En fazla 35 karakter olabilir'),
    password:Yup.string().required("Zorunlu alan").min(5, 'Minimum 5 karakter olmalı').max(35, 'En fazla 35 karakter olabilir')
 });