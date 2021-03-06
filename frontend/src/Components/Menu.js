import React, { Component, useState } from 'react';
import { Card, CardImg, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Aos from 'aos';
import "aos/dist/aos.css";

function DisplayMenu({ result }) {
    const [redirectVar, changeRedirectVar] = useState(false);
    const [id, changeId] = useState(0);
    // const [addToCart, changeAddToCart] = useState(0);

    function description(event) {
        changeId(event.target.id);
        changeRedirectVar(true);
    }

    function addItemToCart(event){
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:5000/addToCart", {headers: {id: event.target.id}})
            .then( response => {
                if(response.data.success){
                    alert('Added to cart');
                }
            })
    }

    let renderList = result.map((rl) => {
        if (redirectVar) {
            return (
                <Redirect to={`/eat/${id}`} />
            );
        }
        return (
            <div className="col-md-3">
                <Card style={{ borderColor: 'white' }}>
                    <div className="d-flex justify-content-center">
                        <CardImg style={{ width: '90%', height: '60%', borderRadius: '7.5%' }} id={rl.dishId} role="button" onClick={description} src={rl.image} />
                    </div>
                    <p style={{ fontSize: '14px' }} className="mt-2">{rl.dishName}</p>
                    <div className="row">
                        <div className="col-6">
                            <p>	&#8377; {rl.price}</p>
                        </div>
                        <div className="d-flex justify-content-end col-6">
                            <Button style={{ height: '30px', width: '100px', borderRadius: '10vw', borderColor: 'red' }} className="btn-sm" color="white" id={rl.dishId} onClick={addItemToCart}>ADD</Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    })
    return (
        <div className="row">
            {renderList}
        </div>
    );
}

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: [],
        }
    }

    componentDidMount() {
        Aos.init({ duration: 1000 });
        axios.get('http://localhost:5000/eat')
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        result: response.data.data,
                    });
                }
            })
            .catch(err => {
                alert(err.message);
            })

    }

    render() {
        return (
            <div>
                <Header />
                <img  data-aos="fade-up" style={{ width: '100vw' }} src="https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_1440,ar_2880:595/dpr_2/image/vm/52dad53b-dd43-489f-9ed4-02fb2c3461be.jpeg" alt="Offer" />
                <div  data-aos="fade-up" className="mt-5">
                    <div className="container">
                        <DisplayMenu result={this.state.result} />
                    </div>
                </div >
            </div >
        )
    }
}
