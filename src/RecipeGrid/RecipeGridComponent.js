import React from 'react';
import {
    Row,
    Col,
    Container
} from 'react-bootstrap'
import './RecipeGridStyle.css'

const RecipeGrid = ({ colCount, children, sm }) => {
    let rowCount = Math.floor(children.length / colCount) + 1;

    let index = 0;

    const recipeContainer = () => {
        return recipeRows()
    }

    const recipeRows = () => {
        let rows = [];

        for (let row = 0; row < rowCount; row++) {
            rows.push(
                <Row className='recipeRow'>
                    {
                        recipeColumns()
                    }
                </Row>
            )
        }

        return rows;
    }

    const recipeColumns = () => {
        let cols = []

        for (let col = 0; col < colCount; col++) {
            if (index < children.length) {
                cols.push(
                    <Col className="recipeCol" sm={sm}>
                        {children[index]}
                    </Col>
                )
                index++
            }
        }

        return cols
    }

    return (
        <Container className='recipeGrid'>
            {
                recipeContainer()
            }
        </Container>
    )
}

export default RecipeGrid;