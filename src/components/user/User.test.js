import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import User from './User';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter()});



describe('<User/>', ()=>{

    it('create snapshot for User component', ()=>{

        const tree = renderer.create(<BrowserRouter><User/></BrowserRouter>).toJSON();

        expect(tree).toMatchSnapshot();
    })

    it('renders with props', ()=>{
        const div = document.createElement('div');

        ReactDOM.render(<BrowserRouter><User id={'uhbi2uiu3iu21h3'}/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
})

