import React from "react";
import ReactDOM from "react-dom";
import Login from "./LogIn";
import {BrowserRouter} from "react-router-dom";
import Enzyme from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter()});


describe("<Login/>", ()=>{
    it("Renders login compeonent", ()=>{
        const div = document.createElement("div");

        ReactDOM.render(<BrowserRouter><Login/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("create snapshot for login component", ()=>{
        const tree = renderer.create(<BrowserRouter><Login/></BrowserRouter>).toJSON();

        expect(tree).toMatchSnapshot();
    })

})