import React from 'react'

import {useQuery} from '@apollo/client'
import {MovieCard} from '../components'
import {FETCH_MOVIES} from '../queries'
import {Row, Col, Card} from 'react-bootstrap'
import {TvSeries} from '../pages'

export default function HomePage (props) {
    const { data, error, loading} =  useQuery(FETCH_MOVIES)

 
    
    function handleDetail(id) {
        props.history.push(`/detail/${id}`)
    }
    if(error ) {
        return <p>Error: {error}</p>
        }
    if(loading) {
        return <p>loading</p>
    }
    return (
        <>
            <div className="container">
                <h1 className="title justify-content-around">Movies</h1>
                <Row>
                    {data.getMovies.map((movie,index) => {
                        return (
                            <Col key={index} xm={4}>
                                < Card  style={{ width: '18rem', height: '40rem', marginBottom: "20px" }} className="bg-dark text-white">
                                    <Card.Body >
                                        <MovieCard
                                            data={movie}
                                            handleDetail = {(id) => handleDetail(id)}
                                        />
                                    </Card.Body>
                                    <Card.Footer>
                                        
                                    </Card.Footer>
                                </ Card>
                            </Col>
                        )
                    })}
                </Row>    
            </div>
            <div className="container">
                <TvSeries></TvSeries>
            </div>
        </>
    )
}