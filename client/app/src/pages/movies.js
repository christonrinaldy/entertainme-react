import React, { useState } from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {MovieCard} from '../components'
import {FETCH_MOVIES, DELETE_MOVIE} from '../queries'
import { favoriteMoviesVar } from '../cache'  
import {Button, ButtonGroup, Card, Col, Row} from 'react-bootstrap'
import {AddForm} from '../pages'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Movie (props) {
        const { data, error, loading} =  useQuery(FETCH_MOVIES)
        const [delMovie] =  useMutation(DELETE_MOVIE, { refetchQueries: [{query: FETCH_MOVIES}] })
        const [show, setShow] = useState(false)
        const [defaultVal, setDefault] = useState([])
        const [execution, setExecution] = useState('')

        function handleDetail(id) {
            props.history.push(`/detail/${id}`)
        }
        function handleDelete(id) {
            delMovie({
                variables: {
                    id: `${id}`
                }
            })
        }
        function handleClose() {
            setShow(false)
        }

        function handleAddMovie() {
            setShow(true)
            setExecution('ADD MOVIE')
        }
        function handleUpdate(value) {
            setDefault(value)
            setExecution('UPDATE MOVIE')
            setShow(true)
        }

        async function addFavoriteHandler(movie) {
            const favorites = await favoriteMoviesVar()
            await favoriteMoviesVar([...favorites, movie])
        }

        if(error) {
        return <p>Error: {error}</p>
        }
        if(loading) {
            return <p>loading</p>
        }
        return (
            <div className="container">
                <h1 className="title">Movies</h1>
                <Button onClick = {()=> handleAddMovie()}>Add Movie...</Button>
                <Row>
                    {data.getMovies.map((movie,index) => {
                        return (
                            <Col key={index} xm={4}>
                                < Card style={{ width: '18rem', height: '40rem' }} className="bg-dark text-white">
                                    <Card.Body >
                                        <MovieCard
                                            data={movie}
                                            handleDetail = {(id) => handleDetail(id)}
                                        />
                                        <FontAwesomeIcon icon = {faTrash} onClick={() => handleDelete(movie._id)}/>
                                    </Card.Body>
                                    <Card.Footer>
                                        <ButtonGroup size="sm">
                                            <Button onClick= {() => handleUpdate(movie)}>Update</Button>
                                            <Button onClick= {(e) => addFavoriteHandler(e,movie)}> Add to Button </Button> 
                                        </ButtonGroup>
                                    </Card.Footer>
                                </ Card>
                            </Col>
                        )
                    })}
                </Row>    
                    <AddForm
                        show = {show}
                        onHide = {() => setShow(false)}
                        defaultVal = {defaultVal}
                        execution = {execution}
                        handleClose = {() => handleClose()}
                    />
            </div>
        )
    
    
}