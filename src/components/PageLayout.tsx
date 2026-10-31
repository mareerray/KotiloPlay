import { ViewTransition } from "react";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
    return (
        <ViewTransition>
            <Outlet />
        </ViewTransition>
    );
}