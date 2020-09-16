import React from 'react'
import { useQuery} from '@apollo/client'
import {MovieCard} from '../components'
import {FETCH_TVSERIES} from '../queries'
import { Row, Col, Card} from 'react-bootstrap'

export default function TvSeries () {
        const { data, error, loading} =  useQuery(FETCH_TVSERIES)
        if( error) {
            return <p>Error: {error}</p>
        }
        if( loading) {
            return <p>loading</p>
        }
        return (
            <div className="container">
                <h1 className="title">TV SERIES </h1>
                <Row>
                    { data.getTvSeries.map((movie,index) => {
                        return (
                            <Col key={index} xm={4}>
                                < Card  style={{ width: '18rem', height: '40rem' }} className="bg-dark text-white">
                                    <Card.Body >
                                        <MovieCard
                                            data = {movie}
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
        )
    
    
}
