import $ from 'jquery';

export const calcScrollBarWidth = ():number => {
    // Получаем ширину окна, это аналог width: 100vw (то есть ширина 100% + ширина scrollbar)
    const windowWidth = window.innerWidth;
    // Получаем ширину документа, это аналог width: 100%
    const documentWidth = document.documentElement.clientWidth;
    // Возвращаем разницу между этими величинами, это и есть ширина scrollbar.
    // Если его нет, то вернутся такие значения -1 или 0, поэтому проверка лучше на > 0
    return windowWidth - documentWidth;
};

export const addScrollbarOffset = ():void => {
    const scrollBarWidth = calcScrollBarWidth();
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
};

export const removeScrollbarOffset = ():void => {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
};

export const scrollToTop = ():void => {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
};

export const scrollToBottom = ():void => {
    $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
};


//Данная функция всегда держит скролл наверху страницы, дублирование подьема наверх нужно для кросссбраузерности.
const blockScroll = ():void => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
};

export const disableScroll = ():void => {
    window.addEventListener('scroll', blockScroll);
};

export const enableScroll = ():void => {
    window.removeEventListener('scroll', blockScroll);
};
