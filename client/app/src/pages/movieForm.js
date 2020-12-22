import React, { useEffect, useState } from 'react'
import {useMutation} from '@apollo/client'
import { FETCH_MOVIES, ADD_MOVIE, UPDATE_MOVIE } from '../queries'
import { Modal, Button, Row } from 'react-bootstrap'



export default function Form ({show, defaultVal,execution, handleClose}) {
    const [id, setId] = useState(0)
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [popularity, setPopularity] = useState('')
    const [poster_path, setposter_path] = useState('')
    const [tags, setTags] = useState('')
    const [submitExe,setExecution] = useState('')

    const [postMovie, {error, loading}] = useMutation(ADD_MOVIE, { refetchQueries: [{query: FETCH_MOVIES}] })
    const [updateMovie] = useMutation(UPDATE_MOVIE, { refetchQueries: [{query: FETCH_MOVIES}] })

    useEffect(()=> {
        setId(defaultVal._id)
        setTitle(defaultVal.title)
        setOverview(defaultVal.overview)
        setPopularity(defaultVal.popularity)
        setTags(defaultVal.tags)
        setposter_path(defaultVal.poster_path)
        setExecution(execution)
    },[defaultVal,execution])
    const handleSubmit = (e) => {
        e.preventDefault()
        if(submitExe === 'ADD MOVIE') {
            postMovie({
                variables: {
                    title,
                    overview,
                    popularity: +popularity,
                    poster_path,
                    tags: tags.split(',')
                }
            })
            handleClose()
        } else {
            updateMovie({
                variables: {
                    id,
                    title,
                    overview,
                    popularity: +popularity,
                    poster_path,
                    tags: tags
                }
            })
            handleClose()
        }
        
    }

    if(error) {
        return <p>error: {error}</p>
    }
    if (loading) {
        return <p>loading...</p>
    }

    return (
        <Modal show = {show}>
            <Modal.Header closeButton>
                <Modal.Title>{submitExe}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit = {(e)=> handleSubmit(e)}>
                <label>Title</label><br></br>
                <input value={title} onChange={(evt) => setTitle(evt.target.value)} ></input><br></br>
                <label>Overview</label><br></br>
                <input onChange={(evt) => setOverview(evt.target.value)} value={overview}></input><br></br>
                <label>Poster</label><br></br>
                <input onChange={(evt) => setposter_path(evt.target.value)} value={poster_path}></input><br></br>
                <label>Popularity</label><br></br>
                <input onChange={(evt) => setPopularity(evt.target.value)} value={popularity}></input><br></br>
                <label>Tags</label><br></br>
                <input onChange={(evt) => setTags(evt.target.value)} value={tags}></input><br></br>
                
                <Modal.Footer>
                    <Row className="justify-content-between">
                        <Button type="submit">Submit</Button>
                        <Button onClick = {() => handleClose()}> Close </Button>
                    </Row>
                    
                </Modal.Footer>
            </form>
            </Modal.Body>
            
        </Modal>
    )
}