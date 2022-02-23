import React from 'react'
import { Card } from 'react-bootstrap'

export interface InfoCardProps {
  wrapperType?: string
  artistName?: string
  collectionName?: string
  trackName?: string
}

const InfoCard: React.FC<InfoCardProps> = ({   wrapperType,
  artistName,
  collectionName,
  trackName,
}) => {
  
  return (
    
    <Card style={{ width: '18rem', height: '200px'  }}  text="dark"  className="mb-2">
    <Card.Body>
      <Card.Title>{trackName || ''} | {artistName || ''} | {collectionName || '' }</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{wrapperType}</Card.Subtitle>
    </Card.Body>
  </Card>
  )
}

export default InfoCard
