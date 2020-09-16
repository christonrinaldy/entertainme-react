import React from 'react'

export default function Table ({data}) {
    return (
        <>
            <td>{data.title}</td>
            <td>{data.overview}</td>
            <td>{data.poster_path}</td>
            <td>{data.popularity}</td>
            <td>{data.tags}</td>
        </>
    )
}