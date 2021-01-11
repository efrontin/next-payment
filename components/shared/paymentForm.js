import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const PaymentView = () => {
    const classes = useStyles();

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
        >
            <Container maxWidth="sm">
                <Formik
                    initialValues={{
                        amount: '',
                        receiver: '',
                    }}
                    validationSchema={
                        Yup.object().shape({
                            receiver: Yup.string().max(255).required('Receiver is required'),
                            amount: Yup.number().positive().min(0,50).max(9999,99).required('Amount is required')
                        })
                    }
                    onSubmit={() => {
                        navigate('/api/success', { replace: true });
                    }}
                >
                    {({
                          errors,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          isSubmitting,
                          touched,
                          values
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Box mb={3}>
                                <Typography
                                    color="textPrimary"
                                    variant="h2"
                                >
                                    Send your payment
                                </Typography>
                            </Box>
                            <TextField
                                error={Boolean(touched.receiver && errors.receiver)}
                                fullWidth
                                helperText={touched.receiver && errors.receiver}
                                label="Receiver"
                                margin="normal"
                                name="receiver"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.receiver}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(touched.amount && errors.amount)}
                                fullWidth
                                helperText={touched.amount && errors.amount}
                                label="Amount"
                                margin="normal"
                                name="amount"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amount}
                                variant="outlined"
                            />
                            <Box my={2}>
                                <Button
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Send
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Container>
        </Box>
    );
};

export default PaymentView;
