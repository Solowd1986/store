import React, { useState } from "react";



interface IFormInputCounter {
    classList: string,
    getProcessedAmount: (quantity: number) => void,
    initialValue: number,
    maxValue: number,
}

interface IEventChange {
    target: HTMLInputElement,
    nativeEvent: any,
}

type Y = React.SyntheticEvent & {
    target: {},

}

type HH = {
    target: {
        dataset: {
            [key: string]: string
        }
    }

}


/**
 * Компонент отвечает лишь за приведение количества выбранного товара к нормализованному виду.
 * Он получает на вход:
 *
 * 1. classList - стилизация компонента.
 *
 * 2. getProcessedAmount - метод из родительского компонента, для внесения данных по количеству товара Redux state
 *
 * 3. initialValue - начальное значение количества товара, берется из Redux state. Например, человек уже был на этой
 *    странице и указал 4 единицы товара. Они были вписаны в Redux state, потом он ушел со страницы, но данные для
 *    товара сохранены. Человек возвращается - и товар сразу в верном количестве.
 *
 * 4. maxValue - максимальное количество данного товара, заданное в БД.
 *
 * Сценарий работы:
 *
 * Мы позволяем пользователю любой ввод, если он числовой, также ввод можно редактировать, удалять.
 * Все это вписывается в локальный state.
 * Как только пользователь уходит из поля провоцируя blur, для данных из поля ввода выполняется нормализация.
 * Ее результат - это всегда число от 1 до максимума для текущего товара. Эти данные сразу вводятся
 * как в локальный state, так и в Redux state.
 *
 * Второй повод для вызова нормализации - клики по кнопкам "+"/"-". Этот результат нормализуется каждый клик,
 * то есть тут пользователь не сможет ввести любые числа, он будет сразу ограничен длпустимым диапазоном.
 *
 * Попутно мы для разнообразия блокируем дефолтное поведение нажатия на Enter в поле ввода, это чтобы не вызывать
 * отправку формы. По сути это не обязательно, так как это перехватывается в другом месте, но пусть будет.
 *
 */
const FormInputCounter = (props: IFormInputCounter) => {

    const { initialValue, maxValue, getProcessedAmount, classList } = props;
    const [value, setValue] = useState<number | string>(initialValue);

    /**
     * Метод нормализующий любое переданное из поля ввода значение. Возвращает корректное значение.
     *
     * Данный метод вызывается в двух случаях: клик по кнопкам смены количества "+"/"-" или событии blur для окна ввода.
     * То есть на этапе события ввода он не работает, так как нужно позволить пользователю любой числовой ввод.
     *
     * 1. value - если нам пришло число, то так и оставляем, так как операции с ним будут корректными, если же это не число,
     * то приводим то, что пришло к модульному числу.
     *
     * 2. currentAmount - это результат проверки: если то, что пришло к числу не вышло привести, то вернем 1. Иначе вернем то,
     * что вернула операция приведения к числу.
     *
     * 3. max - нормализация максимального значения. Оно основано на maxValue, которое приходит из Redux и равно
     *    доступному количеству товара на основе данных из БД. По сути тут проверка не нужна, но это на всякий.
     *
     * 4. В итоге возвращаем результат - число, укладывающееся в корректный диапазон.
     */
    const amountNormalize = (inputValue: (number | string)) => {
        const value = typeof inputValue === "number" ? inputValue : Math.abs(parseInt(inputValue, 10));
        const currentAmount = isNaN(value) ? 1 : value;
        const max = isNaN(Math.abs(maxValue)) ? 99 : maxValue;
        return Math.max(1, Math.min(max, currentAmount));
    };

    /**
     * Метод смены количества товара при клике на кнопки "+"/"-". Меняет локальный state и Redux store
     *
     * 1. Блокируем поведение кнопки, чтобы не вызвать отправку формы.
     * 2. Забираем dataset -> action, так мы узнаем на какую кнопку был клик.
     * 3. Меняем значение на +1/-1 исходя из полченных данных
     * 4. Нормализуем значение, чтобы оно оставалось в пределах допустимого.
     * 5. Устаналиваем его в локальный state и через метод getProcessedAmount ставим его и для Redux store
     */
    const onChangeAmount = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        const { dataset: { action } } = evt.target as HTMLButtonElement;
        const intValue = typeof value === "number" ? value : Math.abs(parseInt(value, 10));
        const currentValue = action === "inc" ? intValue + 1 : intValue - 1;
        const normalizedValue = amountNormalize(currentValue);
        getProcessedAmount(normalizedValue);
        setValue(normalizedValue);
    };

    /**
     * Метод установки количества товара при уходе из поля ввода. Меняет локальный state и Redux store
     */
    const onInputBlur = ({ target: { value: inputValue } }: { target: { value: string } }) => {
        const value = amountNormalize(inputValue);
        getProcessedAmount(value);
        setValue(value);
    };

    /**
     * Метод вызывается на каждом клавиатурном вводе в поле смены количества товара. Меняет локальный state.
     *
     * 1. Сначала мы проверяем, не нажаты ли влавиши delete/backspace. На этом этапе данные не нуждаются в
     *    нормализации, поэтому можно полностью удалить все символы из окна ввода просто нажав backspace, поэтому
     *    данные действия прямо мняют локальный state. Но только его, не трогая главный state из Redux, данные в нем
     *    всегда должны быть корректными.
     *
     * 2. Если нажато что-то кроме этих двух клавиш, то смотрим, попадает ли value клавиши в регулярку "только числа"
     *    В случае, если не попадает - просто выходим из метода ничего не делая, ожидаем нового ввода.
     *    Если же введены числа - то вносим их в state, причем тут нет никаких нормализаций. Это нужно, чтобы
     *    пока нет события blue, пользователь мог вводить любые числа, хоть 9999, или же полностью очищать поле ввода.
     *
     * 3. На этом этапе контроль заканчивается. Приведение введенных значений в порядок выполняется на этапе blur
     */
    const onInputChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
        const { value } = evt.target as HTMLInputElement;
        const { inputType } = evt.nativeEvent as InputEvent;

        if (inputType === "deleteContentBackward" || inputType === "deleteContentForward") {
            setValue(value);
        } else {
            if (!/^[0-9]+$/.test(value)) return;
            setValue(value);
        }
    };

    /**
     *  Метод блокирования отправки формы при нажатии Enter в поле ввода.
     *
     *  Вообще, не обязателен, это просто для разнообразия.
     */
    const onKeyDown = (evt: React.KeyboardEvent) => {
        if (evt.key === "Enter") {
            evt.stopPropagation();
            evt.preventDefault();
        }
    };

    return (
        <div className={classList}>
            <button
                onClick={onChangeAmount}
                data-action="dec">
            </button>
            <label>
                <input
                    onChange={onInputChange}
                    onBlur={onInputBlur}
                    onKeyDown={onKeyDown}
                    type="text"
                    value={value}
                />
            </label>
            <button
                onClick={onChangeAmount}
                data-action="inc">
            </button>
        </div>
    );
};

export default FormInputCounter;
