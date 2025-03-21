import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
    return <div className="mx-auto w-[70vw] max-w-[126rem]">{children}</div>;
};

export default Container;
