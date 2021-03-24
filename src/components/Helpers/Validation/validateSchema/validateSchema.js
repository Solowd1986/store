import * as yup from "yup";

const validationSchemaFields = [
    {
        name:
            yup.string().required("Данное поле обязательно").matches(/^[а-яА-Я]+$/, "Имя должно состоять из кириллицы").min(3, "Имя должно включать не менее 3 символов").max(15, "Имя должно включать не более 15 символов")
    },
    {
        email:
            yup.string().required("Данное поле обязательно").email("Введите корректный email")
        ,
    },
    {
        address:
            yup.string().required("Данное поле обязательно").matches(/^[а-яА-Яa-zA-Z0-9.:\-,\s]+$/, "Введите корректный адрес").max(200, "Адрес должен включать не более 200 символов")
    },
    {
        phone:
            yup.string().required("Данное поле обязательно").min(18, "Телефон должен включать не менее 11 символов").max(18, "Телефон должен включать не более 11 символов")

    },
    {
        comment:
            yup.string().max(300, "Комментарий должен включать не более 300 символов")
    },
];


export default function setValidateSchema(requestedFields) {
    const selectedFields = {};
    // на каждой итерации получаем поле обьекта validationSchemaFields(через Object.keys), если оно в запрошенном массиве,
    // то записываем в обьект это поле + значение этого поля (Object.values). Всегда нулевой индекс, так как поле всегда одно.
    for (const value of validationSchemaFields) {
        if (requestedFields.includes(Object.keys(value)[0])) {
            selectedFields[Object.keys(value)[0]] = Object.values(value)[0]
        }
    }
    return yup.object().shape(selectedFields);
}




















