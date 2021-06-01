import React from "react";

import Layout from "@components/Partials/Layout/Layout";
import ScrollToTop from "@components/Helpers/Hoc/withScrollToTop/ScrollToTop";

export const layoutWrapper = (Component) => <Layout><ScrollToTop>Component</ScrollToTop></Layout>;
export const privateRoute = () => null;




