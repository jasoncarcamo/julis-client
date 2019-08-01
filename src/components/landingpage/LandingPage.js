import React from 'react';
import './LandingPage.css';
import cleanCrib from '../../picture-assests/clean_crib.jpg';
import cleanKitchen from '../../picture-assests/clean_kitchen.jpg';
import cleanOffice from '../../picture-assests/clean_office.jpg';
import cleanLivingRoom from '../../picture-assests/clean_living_room.jpg';
import {Link} from 'react-router-dom';



class LandingPage extends React.Component{
    render(){
        return (
            <section id="homepage">

                <section id="first_section">
                    
                    <header><h1>Julis Cleaning Service</h1></header>
                    <h2>Quality Service at an Affordable Price</h2>
                    <p>Commercial & Industrial Sanitation Professionals</p>
                    <a href="#child_friendly">About Us</a>
                </section>

                <section id="features_section">

                    <section id="child_friendly">   

                        <img src={cleanCrib} alt="A clean baby crib."/>
                        <h3>Green Friendly</h3>
                        <p>We use environmentally-conscious products that are safe for people and pets.</p>

                    </section>

                    <section id="clean_kitchen">

                        <img src={cleanKitchen} alt="A clean kitchen"/>
                        <h3>Residential and Commercial cleaning</h3>
                        <p>From deep cleaning your kitchen and bathrooms to changing your bed linens, we are dedicated to creating clean, safe and healthy environments for both commercial and residential spaces.</p>

                    </section>

                    <section id="clean_office">

                        <img src={cleanOffice} alt="A clean office"/>
                        <h3>Customer satisfaction</h3>
                        <p>Whether you need weekly, every other week, monthly, or occasional housekeeping services, our professionals will leave you feeling comfortable in and proud of your space.</p>

                    </section>

                </section>

                <section id="living_room_section">
                    <img id="clean_living_room" src={cleanLivingRoom} alt="A clean living room."/>
                    <p>Coming home after a long day to a place that’s clean, orderly, and welcoming does not have to be a fantasy. That’s why we take the time to offer services that work with your budget, cleaning preferences, and busy lifestyle.  Our friendly professionals strive to earn your loyalty every time we clean, which is why we make setting up house cleaning services as easy as can be. Whether you are looking to request services one time or create a routine cleaning plan, you'll never have to worry about signing a contract.</p>

                </section>

                <section id="landing_sign_up">
                    <p></p>
                    <Link to="/register" className="to_signup">Get Started</Link>
                </section>

            </section>
        )
    }
}

export default LandingPage;