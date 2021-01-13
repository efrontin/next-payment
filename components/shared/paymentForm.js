import React, {useEffect, useState} from 'react'
import {Button, makeStyles} from "@material-ui/core";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

export default function Payment() {
    const classes = useStyles();

    const [cardNumber, setCardNumber] = useState("")
    const [amount, setAmount] = useState("")
    const [label, setLabel] = useState("")

    const [amountErr, setAmountError] = useState({})
    const [cardNumberErr, setCardNumberError] = useState({})

    // Gestion des validations
    const formValidation = () => {
        console.log(cardNumber)
        console.log(Number(cardNumber))
        const cardNumberErr = {}
        const amountErr = {}
        let isValid = true;

        if (cardNumber.replaceAll(' ', '').length !== 16) {
            cardNumberErr.cardNumberValidation = "Le nombre de numero sur" +
                " la carte doit être de 16 chiffres";
            isValid = false
        }

        if (isNaN(Number(cardNumber.replaceAll(' ', '')))) {
            cardNumberErr.cardNumberValidation = "Le numero de carte ne doit" +
                " comporter que des chiffres";
            isValid = false
        }

        if (amount > 10000) {
            amountErr.amountTooLong = "Le montant doit être inferieur à" +
                " 10000 €";
            isValid = false
        }

        if (amount.replace(',', '.') < 0.5) {
            // let coma = amount.replace(',', '.');
            amountErr.amountTooShort = "Le montant doit être superieur à" +
                " 0,50 €";
            isValid = false
        }

        setAmountError(amountErr)
        setCardNumberError(cardNumberErr)

        return isValid
    }
    const handleCardNumberChanged = change => {
        const cardFormat = change.replaceAll(" ", "")
        if (cardFormat.length < 17 ) {
            const addSpace = cardFormat.length !== 0 ? cardFormat.match(/.{1,4}/g).join(' ') : ''
            console.log(addSpace)
            setCardNumber(addSpace)
        }
    }


    const handlerAmountChanged = digit => {
        console.log(typeof digit)
        // const convertDigit = parseFloat(digit)
        setAmount(digit)
    }

    // Gestion de l'envoi du formulaire
    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation()

        if (isValid)
        {
            // Conversion du prix
            const convertPrice = amount => (Math.round(amount * 1 * 100) / 100).toFixed(2)
            console.log("INFORMATIONS PAYMENT", amount, amount)

            const res = {
                label: label,
                amount: amount
            }
            console.log("INFORMATIONS PAYMENT", res)

            // await sleep(300)
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: res
            };

            // POST de lq data
            // Axios.post('http://localhost:3000/api/payment', requestOptions)
            //      .catch( err => {
            //          console.log(err)
            //          setError(err.message)
            //      })
        }
    }

    return (
        <Container maxWidth="md">
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                    <h1>NEXTPAL</h1>

                    <form onSubmit={onSubmit}>
                        <TextField type="text"
                                   required
                                   label="Numero de carte"
                                   value={cardNumber}
                                   variant="outlined"
                                   name="cardNumber"
                                   fullWidth
                                   onChange={(e) => {handleCardNumberChanged(e.target.value)}}>
                            CardNumber
                        </TextField>
                        <br/>
                        {Object.keys(cardNumberErr).map((key) => {
                            return <div key={key} style={{color: "red"}}>{cardNumberErr[key]}</div>
                        })
                        }
                        <TextField type="number"
                                   required
                                   label="Montant"
                                   value={amount}
                                   margin="normal"
                                   name="amount"
                                   fullWidth
                                   variant="outlined"
                                   onChange={(e) => {handlerAmountChanged(e.target.value)}}>
                            Montant
                        </TextField>
                        <br/>
                        {Object.keys(amountErr).map((key) => {
                            return <div key={key} style={{color: "red"}}>{amountErr[key]}</div>
                        })
                        }
                        <TextField type="text"
                                   label="Raison"
                                   required
                                   margin="normal"
                                   value={label}
                                   name="label"
                                   fullWidth
                                   variant="outlined"
                                   onChange={(e) => {setLabel(e.target.value)}}>Paiement pour :</TextField>
                        <br/>
                        <Button
                            disabled={!amount || !cardNumber || !label}
                            color="primary"
                            fullWidth
                            margin="normal"
                            size="large"
                            type="submit"
                            variant="contained">
                            PAYER
                        </Button>
                        <br/>
                        <Link href="/payments" margin="normal" component={Link}>
                            Liste des paiements
                        </Link>
                    </form>
                </Container>
            </Box>
        </Container>
    )
}