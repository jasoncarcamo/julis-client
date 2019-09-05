import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "./LandingPage";
import {BrowserRouter} from "react-router-dom";
import Enzyme from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter()});


describe("<LandingPage/>", ()=>{
    it("Renders landing page compeonent", ()=>{
        const div = document.createElement("div");

        ReactDOM.render(<BrowserRouter><LandingPage/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("create snapshot for landing page component", ()=>{
        const tree = renderer.create(<BrowserRouter><LandingPage/></BrowserRouter>).toJSON();

        expect(tree).toMatchSnapshot();
    })

})