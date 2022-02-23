import React, { useCallback, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import InfoCard from './InfoCard';

import useSearch from '../hooks/useSearch'

const initialState = {
  entity: "album",
  term: "",
}
const categories = [
  {name: 'album', displayName:  'Albums'},
  {name: 'musicArtist', displayName:  'Artists'},
  {name: 'song', displayName:  'Songs'},
]

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState(initialState)
  const [offset, setOffset] = useState(0);
  const {
    loading, error, results, hasMore
  } = useSearch(query, offset)
  const observer = useRef<any>( null)
  const lastCard = useCallback(node => {
    if(!hasMore) return
    if (loading) return
    if (observer.current) { observer.current.disconnect() }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log("offset", offset)
        setOffset(prevOffset => prevOffset + 10)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])
  const handleChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setQuery({ ...query, [name]: value })
    setOffset(0)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
  }
  return (
    <Container fluid="md">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="searchControl">
              <InputGroup className="mb-4">
                <Form.Select aria-label="Select entity" value={query.entity} name="entity" onChange={handleChange} >
                 {categories.map(c => <option value={c.name} key={c.name}>{c.displayName}</option>)} 
                </Form.Select>
                <Form.Control
                  style={{ width: "60%" }}
                  value={query.term}
                  name="term"
                  type="text"
                  placeholder="Search"
                  aria-describedby="Search box"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {(results.length > 0) ? <Row>
        {results.map((item:any, index:number) => { 
        return (results.length === index+1) ? 
        <Col xs md={6} lg={4} key={"col-card-" + index} ref={lastCard} >
          <InfoCard {...item} key={"card-" + index} /> 
      </Col> : 
      <Col xs md={6} lg={4} key={"col-card-" + index} >
      <InfoCard {...item} key={"card-" + index} /> 
  </Col>
        })}

      </Row> : (query.term && !loading && <p>No Results Found</p>)}
      {loading && query.term && <p>Loading...</p>}
      {error && !loading && query.term  && <p>Please Try Again</p>}
    </Container>
  )
}
export default SearchBar
