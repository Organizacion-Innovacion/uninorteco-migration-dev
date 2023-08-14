import React from "react";
import { spacing50 } from "@ellucian/react-design-system/core/styles/tokens";
import { Button } from '@ellucian/react-design-system/core';

interface ButtonComponentProps {
    textButton:string;
 }

const ButtonComponent: React.FC<ButtonComponentProps> =({textButton}) =>(
            <Button id="SendButton" fluid color="primary" style={{ marginBottom: spacing50 }}>
                {textButton}
            </Button>
    );


export default (ButtonComponent);