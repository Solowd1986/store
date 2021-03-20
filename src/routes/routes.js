import MainPage from "@components/Pages/Index/MainPage";
import Category from "@components/Pages/Category/Category";
import Product from "@components/Pages/SingleProduct/Product";
import Delivery from "@components/Pages/Delivery/Delivery";
import Order from "@components/Pages/Order/Order";

import Error400 from "@components/Pages/Error/Error400/Error400";
import Error404 from "@components/Pages/Error/Error404/Error404";
import Error500 from "@components/Pages/Error/Error500/Error500";


/**
 * Ход работы:
 * 1. В цикле выводятся компоненты Route, со всеми вариациями путей и соответствующих им компонентов
 *    включая путь /404 и компонент для этого пути. Но этот путь 404 нужно вызвать откуда-то
 * 2. Вызов выполнятеся в располооженном в App.js компоненте Redirect, который и отвечает за перенаправление на
 *    URI формата 404, а компонент для этого пути мы ранее указали
 * @type {*[]}
 */

const routes = [
    { url: "/", component: MainPage, exact: true },
    { url: "/category/:type", component: Category, exact: true },
    { url: "/product/:category/:id", component: Product, exact: true },
    { url: "/order", component: Order, exact: true },
    { url: "/delivery", component: Delivery, exact: true },
    { url: "/400", component: Error400, exact: true },
    { url: "/404", component: Error404, exact: true },
    { url: "/500", component: Error500, exact: true }
];

export default routes;

