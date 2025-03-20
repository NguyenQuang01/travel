import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div style={{ margin: "auto", width: "70vw", maxWidth: "126rem" }}>
            {children}
        </div>
    );
};

export default Container;
