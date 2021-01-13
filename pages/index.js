import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from 'react'
import { Form, Field } from 'react-final-form'
import Card from '../components/shared/Card'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from '../components/shared/cardUtils'
import Styles from "../components/shared/Styles";
import {Button, makeStyles} from "@material-ui/core";
import Axios from "axios";
import PaymentView from "../components/shared/paymentForm";
import Payment from "../components/shared/paymentForm";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// useEffect(() => {
// fetch('')
//     .then( res => {
//         if (!res.ok) {
//             throw Error('could not send the data')
//         }
//         return res.json();
//     })
//     .then( data => {
//         console.log(data)
//     })
//     .catch( err => {
//         console.log(err.message)
//     })
// }, [])


export default function Home() {


    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const onSubmit = async values => {


        console.log("INFORMATIONS PAYMENT", values.amount, values.libelle, values)
        await sleep(300)
        window.alert(JSON.stringify(values, 0, 2))
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        await Axios.put('http://localhost:3000/api/hello', requestOptions)
            .then(response => {
                setIsPending(false)
                this.state({amount: response.data.amount, libelle: response.data.libelle})
            })
            .catch( err => {
                console.log(err)
                setError(err.message)
            })
    }

    return (
        <Payment/>
    )
}
