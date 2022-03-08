
import React from "react";
import loadable from "@loadable/component"; // динамический импорт компонентов по надобности
import pMinDelay from 'p-min-delay'; // задание задержки для более долгой демонстрации спиннера, чтоб не мелькал (в мс)
import Spinner from "@components/Partials/Spinner/Spinner";

const MainPage = loadable(() => import("@components/Pages/Index/MainPage"));
const Category = loadable(() => pMinDelay(import("@components/Pages/Category/Category"), 200), { fallback: <Spinner/> });
const Product = loadable(() => pMinDelay(import("@components/Pages/SingleProduct/Product"), 200), { fallback: <Spinner/> });
const Delivery = loadable(() => pMinDelay(import("@components/Pages/Delivery/Delivery"), 200), { fallback: <Spinner/> });
const Order = loadable(() => pMinDelay(import("@components/Pages/Order/Order"), 200), { fallback: <Spinner/> });

const Error400 = loadable(() => pMinDelay(import("@components/Pages/Error/Error400/Error400"), 200), { fallback: <Spinner/> });
const Error404 = loadable(() => pMinDelay(import("@components/Pages/Error/Error404/Error404"), 200), { fallback: <Spinner/> });
const Error500 = loadable(() => pMinDelay(import("@components/Pages/Error/Error500/Error500"), 200), { fallback: <Spinner/> });

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



















