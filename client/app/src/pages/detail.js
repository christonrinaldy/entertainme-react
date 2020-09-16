import React from 'react'
import {useQuery} from '@apollo/client'
import {FETCH_MOVIE} from '../queries'
import {MovieCard} from '../components'
import {Card} from  'react-bootstrap'

export default function Detail (props) {
    const id = props.match.params.id
    const {data, error, loading} = useQuery(FETCH_MOVIE,{variables: {
        id
    }})
    if(error ) {
        return <p>Error: {error}</p>
        }
    if(loading) {
        return <p>loading</p>
    }
    return (
        <>
            < Card  style={{ width: '18rem', height: '40rem' }} className="bg-dark text-white">
                                    <Card.Body >
                                        <MovieCard
                                            data={data.getMovie}
                                            show = {true}
                                        />
                                    </Card.Body>
                                </ Card>
        </>
    )
}