'use client';

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorSateProps {
    error : Error
}

const ErrorSate:React.FC<ErrorSateProps> = ({
    error
}) => {

    useEffect( () => {
        console.log(error);
    },[error]);

    return (
        <EmptyState 
          title="ohh"
          subtitle="something went wrong"
        />
    )

}