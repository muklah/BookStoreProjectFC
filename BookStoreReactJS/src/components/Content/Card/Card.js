import React from 'react'
import { Card as Cardbook , Icon} from 'antd';
const Card = ({book , user})=> {
    return (
        <Cardbook
            style={{ width: 240 }}
            cover={<img alt="example" src={book.image} />}
            actions={user.login &&[<a href={"http://172.104.149.151:2000/api/books/download/"+book.pdf}> <Icon type="arrow-down" /> </a>]}
            >
            <Cardbook.Meta
            title={book.title}
            description={'By ' + book.author}
            />
        </Cardbook>
    )
}
export default Card;