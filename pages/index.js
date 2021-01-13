import React, {useEffect, useState} from 'react'
import Payment from "../components/shared/paymentForm";


export default function Home() {


    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)


    return (
        <Payment/>
    )
}
