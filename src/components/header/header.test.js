import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import {BrowserRouter} from "react-router-dom";
import Enzyme from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter()});


describe("<Header/>", ()=>{
    it("Renders header ncompeonent", ()=>{
        const div = document.createElement("div");

        ReactDOM.render(<BrowserRouter><Header/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Create snapshot for header component", ()=>{
        const tree = renderer.create(<BrowserRouter><Header/></BrowserRouter>).toJSON();

        expect(tree).toMatchSnapshot();
    })

})