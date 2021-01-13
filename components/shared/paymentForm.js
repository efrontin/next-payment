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

    const [isPending, setIsPending] = useState(false)
    const [amountErr, setAmountError] = useState({})
    const [cardNumberErr, setCardNumberError] = useState({})
    const [error, setError] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation()
        console.log()
    }

    const convertPrice = amount => {
        (Math.round(amount * 1 * 100) / 100).toFixed(2);
    }
    const formValidation = () => {
        const cardNumberErr = {}
        const amountErr = {}
        let isValid = true;

        if (cardNumber.trim().length !== 16) {
            cardNumberErr.cardNumberValidation = "Le nombre de numero sur" +
                " la carte doit être de 16 chiffres";
            isValid = false
        }

        // if (cardNumber.trim() !== toString()) {
        //     cardNumberErr.cardNumberValidation = "Le numero de carte ne doit" +
        //         " comporter que des chiffres";
        //     isValid = false
        // }

        if (amount.trim().length < 10000) {
            amountErr.amountTooLong = "Le montant doit être inferieur à" +
                " 10000 €";
            isValid = false
        }

        if (amount.trim().length > 0.5) {
            amountErr.amountTooShort = "Le montant doit être superier à" +
                " 0,50 €";
            isValid = false
        }

        setAmountError(amountErr)
        setCardNumberError(cardNumberErr)

        return isValid
    }

    // const onSubmit = async values => {
    //
    //
    //     console.log("INFORMATIONS PAYMENT", values.amount, values.libelle, values)
    //     await sleep(300)
    //     window.alert(JSON.stringify(values, 0, 2))
    //     const requestOptions = {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(values)
    //     };
    //
    //     await Axios.put('http://localhost:3000/api/payment', requestOptions)
    //         .then(response => {
    //             setIsPending(false)
    //             this.state({amount: response.data.amount, libelle: response.data.libelle})
    //         })
    //         .catch( err => {
    //             console.log(err)
    //             setError(err.message)
    //         })
    // }

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
                                   label="Numero de carte"
                                   value={cardNumber}
                                   variant="outlined"
                                   fullWidth
                                   helperText={Object.keys(cardNumberErr).map((key) => {
                                       return <div key={key} style={{color: "red"}}>{cardNumberErr[key]}</div>
                                   })
                                   }
                                   onChange={(e) => {setCardNumber(e.target.value)}}>
                            CardNumber
                        </TextField>
                        <br/>
                        <TextField type="text"
                                   label="Montant"
                                   value={amount}
                                   margin="normal"
                                   fullWidth
                                   variant="outlined"
                                   onChange={(e) => {setAmount(e.target.value)}}>
                            Montant
                        </TextField>
                        <br/>
                        {Object.keys(amountErr).map((key) => {
                            return <div key={key} style={{color: "red"}}>{amountErr[key]}</div>
                        })
                        }
                        <TextField type="text"
                                   label="Raison"
                                   margin="normal"
                                   value={label}
                                   fullWidth
                                   variant="outlined"
                                   onChange={(e) => {setLabel(e.target.value)}}>Paiement pour :</TextField>
                        <br/>
                        <Button
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