import React, { Children } from 'react';
import { Alert } from 'react-bootstrap';


interface IMessageProps {
    variant: string;
    children?: React.ReactNode;
}
export function Message({ variant, children }: IMessageProps) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}