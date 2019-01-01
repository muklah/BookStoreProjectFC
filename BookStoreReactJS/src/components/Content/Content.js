import React from 'react';
import styles from './Content.module.css';
import Container from '../../UI/Container/Container';
import Card from './Card/Card';
import { Store } from '../../store';

class Content extends React.Component {
    static contextType = Store;
    constructor(props){
        super(props)
        this.state={
            books:[]
        }
    }
    componentDidMount = () => {
      fetch('http://172.104.149.151:2000/api/books/books')
      .then(response => response.json())
      .then(books => this.setState({books}))
    }
    
    render(){
        const {user} = this.context;
        const {books} = this.state;
        return (
            <Container>
                <div className={styles.content}>
                    {books && books.map(elm => <Card book={elm} key={elm._id} user={user} /> )}
                </div>
           </Container>
        );
    }
}

export default Content;