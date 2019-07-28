import React from 'react';
import ReactDOM from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Enzyme, {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import EditService from './EditService';
import Adaptor from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adaptor()});

describe('<EditService/>', ()=>{
    let wrapper;

    beforeEach(()=>{

        wrapper = shallow(<EditService/>);

        
    })

    it('create snapshot for EditService component', ()=>{
        const tree = renderer.create(<BrowserRouter><EditService/></BrowserRouter>).toJSON();

        expect(tree).toMatchSnapshot();
    })

    it('has submit button', ()=>{

        expect(wrapper.containsAnyMatchingElements([
            <button
            id="edit_submit"
            type="submit"
            >
                Go
            </button>
        ]))
    });

    it('simulates click on submit button', ()=>{
        
        wrapper = shallow(<EditService onClick={()=> console.log('Click!')}></EditService>)

        wrapper.simulate('click');
    })
})