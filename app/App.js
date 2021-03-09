import React ,{Component} from 'react'
import io from 'socket.io-client';

export default class App extends Component{
    constructor() {
        super();
        this.state = {
            response: [],
            chatInput: ''
        };
    }

    componentDidMount=()=> {
        this.socket= io('/')
        this.socket.on('message', (msg)=>{
            this.setState({
                response: [...this.state.response, msg]
            })
            console.log(this.state.response)
        })
    }
    inputChange=(e)=>{
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    send=(e)=>{
        const body=this.state.chatInput
        const message =  {
            body,
            from: 'me'
        }
        this.socket.emit('message', body)
        this.setState({
            chatInput: '',
            response: [...this.state.response, message]
        })
        e.preventDefault();
    }
    render(){
        return(
            <div className='chat'>
                <header className='bg-primary py-1'>
                    <h3 className='text-light text-center'>Real T Chat</h3>
                </header>
                <section className='mx-auto mt-3 card col-sm-7 col-lg-4' style={{
                    height: '80vh'
                }}>
                    <ul
                        className='list-group py-2 border-bottom-0'
                        style={{
                            width: '100%',
                            height: '80%'
                        }}
                    >
                        {this.state.response.map((msg, i)=>{
                            let color= '';
                            let colorT= '';
                            if(msg.from === 'me'){
                                color= 'bg-light'
                                colorT= 'text-primary'
                            } else{
                                color= 'bg-primary'
                                colorT= 'text-light'
                            }
                            return (<li 
                                key={i}
                                className={'px-1 font-weight-bold list-group-item mx-2 ' + color}
                            >
                                <p className={colorT}>{msg.from} </p>
                                <p className={colorT}>{msg.body} </p>
                            </li>)
                        })}
                    </ul>
                    <hr className='my-1'></hr>
                    <form 
                        onSubmit={(e)=>this.send(e)}
                        className=''
                        style={{
                            width: '100%',
                            height: '10%'
                        }}
                    >
                        <input 
                            type="text"
                            name="chatInput"
                            value={this.state.chatInput}
                            onChange={(e)=>this.inputChange(e)}
                            className='form-control'
                        />
                        <input 
                            type="submit"
                            className='form-control btn-secondary'
                        />
                    </form>
                </section>
            </div>
        )
    }
}