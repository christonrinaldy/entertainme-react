import React from 'react'
import {Button, Card} from 'react-bootstrap'

export default function CardItem ({data, handleDetail, show}) {
    return (
        <div>
                <Card.Img variant="top" src={data.poster_path} height="400 px"/>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>
                        {data.overview}
                        <Button hidden={show} size="sm" onClick={() => handleDetail(data._id)}>Go to detail...</Button>
                    </Card.Text>
                
        </div>

    )
}