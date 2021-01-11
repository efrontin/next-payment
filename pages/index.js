import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import { Form, Field } from 'react-final-form'
import Card from '../components/shared/Card'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from '../components/shared/cardUtils'
import PaymentView from "../components/shared/paymentForm";
import Styles from "../components/shared/Styles";
import {Button, makeStyles} from "@material-ui/core";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    console.log("INFORMATIONS PAYMENT", values)
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Payment Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          NextPal
        </h1>
          <Styles>
              <Form
                  onSubmit={onSubmit}
                  render={({
                               handleSubmit,
                               form,
                               submitting,
                               pristine,
                               values,
                               active
                           }) => {
                      return (
                          <form onSubmit={handleSubmit}>
                              <Card
                                  number={values.number || ''}
                                  name={values.name || ''}
                                  expiry={values.expiry || ''}
                                  cvc={values.cvc || ''}
                                  focused={active}
                              />
                              <div>
                                  <Field
                                      name="number"
                                      component="input"
                                      type="text"
                                      pattern="[\d| ]{16,22}"
                                      placeholder="Card Number"
                                      format={formatCreditCardNumber}
                                  />
                              </div>
                              <div>
                                  <Field
                                      name="name"
                                      component="input"
                                      type="text"
                                      placeholder="Name"
                                  />
                              </div>
                              <div>
                                  <Field
                                      name="expiry"
                                      component="input"
                                      type="text"
                                      pattern="\d\d/\d\d"
                                      placeholder="Valid Thru"
                                      format={formatExpirationDate}
                                  />
                                  <Field
                                      name="cvc"
                                      component="input"
                                      type="text"
                                      pattern="\d{3,4}"
                                      placeholder="CVC"
                                      format={formatCVC}
                                  />
                              </div>
                              <div>
                                  <Field
                                      name="libelle"
                                      component="input"
                                      type="text"
                                      placeholder="Libelle"
                                  />
                                  <Field
                                      name="amount"
                                      component="input"
                                      type="number"
                                      placeholder="Amount"
                                  />
                              </div>
                              <div className="buttons">
                                  <Button color="primary" type="submit" disabled={submitting}>
                                      Submit
                                  </Button>
                                  <button
                                      type="button"
                                      onClick={form.reset}
                                      disabled={submitting || pristine}
                                  >
                                      Reset
                                  </button>
                              </div>
                              <h2>Values</h2>
                              <pre>{JSON.stringify(values, 0, 2)}</pre>
                          </form>
                      )
                  }}
              />
          </Styles>
        {/*<PaymentView/>*/}
      </main>
    </div>
  )
}
