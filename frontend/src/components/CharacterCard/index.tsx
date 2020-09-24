import React from 'react'
import { Container, DisplayContent, ImageContainer } from './style'

interface Props {
  id: string
  name: string
  alias: string
  affiliation: string
  occupation: string
  quirk: string
  image: string
  baseURL: string
}

const CharacterCard: React.FC<Props> = (props: Props) => {
  const {
    id,
    name,
    alias,
    affiliation,
    occupation,
    quirk,
    image,
    baseURL
  } = props

  return (
    <Container>
      <ImageContainer>
        <a href={`${baseURL}/api/character/${id}`}>
          <img alt={name} src={image} />
        </a>
      </ImageContainer>
      <DisplayContent>
        <a href={`${baseURL}/api/character/${id}`}>
          <h3>{name ?? 'unknown'}</h3>
        </a>
        <h3>{alias ?? 'unknown'}</h3>

        <div>
          <h5>
            Affiliation:{' '}
            <a href={`${baseURL}/api/character?affiliation=${affiliation}`}>
              {affiliation ?? 'unknown'}
            </a>
          </h5>
        </div>
        <div>
          <h5>
            Occupation:{' '}
            <a href={`${baseURL}/api/character?occupation=${occupation}`}>
              {occupation ?? 'unknown'}
            </a>
          </h5>
        </div>

        <div>
          <h5>Quirk: {quirk ?? 'unknown'}</h5>
        </div>
      </DisplayContent>
    </Container>
  )
}

export default CharacterCard
