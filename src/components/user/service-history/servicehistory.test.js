import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ServiceHistory from './ServiceHistory';

Enzyme.configure({ adapter: new Adapter()});


describe('<ServiceHistory/>', ()=>{
    let serviceArray, wrapper;
    beforeEach(()=>{
        serviceArray =[
            {
                best_time_reached: "10:30 PM",
                comments: "Hello",
                date_created: "2019-07-27T08:45:54.567Z",
                date_modified: "2019-07-27T08:45:54.536Z",
                day: "2019-07-27T04:45:41.893Z",
                id: 105,
                price: "40",
                service_type: "Refridgerator, Windows",
                user_id: "40488d95-ce3b",
            },
            {
                best_time_reached: "10:15 AM",
                comments: "Hello",
                date_created: "2019-07-26T03:57:29.282Z",
                date_modified: "2019-07-27T08:54:28.676Z",
                day: "2019-07-27T04:54:16.611Z",
                id: 104,
                price: "20",
                service_type: "Windows",
                user_id: "40488d95-ce3b",
            },
            {
                best_time_reached: "12:30 AM",
                comments: "It worked.",
                date_created: "2019-07-27T08:58:17.773Z",
                date_modified: "2019-07-27T08:58:17.723Z",
                day: "2019-07-27T04:58:01.665Z",
                id: 106,
                price: "70",
                service_type: "Windows,  Refridgerator, Walls",
                user_id: "40488d95-ce3b",
            }
        ]

        wrapper = shallow(<ServiceHistory/>);

        wrapper.setState({services: serviceArray});
    })
    it('renders component', ()=>{
        const div = document.createElement('div');

        ReactDOM.render(<BrowserRouter><ServiceHistory/></BrowserRouter>, div);

        ReactDOM.unmountComponentAtNode(div);
    });

    it('Has the list of services to display', ()=>{

        expect(wrapper.find('li'));
    });
})