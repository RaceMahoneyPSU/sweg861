import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

export const Form = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [street, setStreet] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [years, setYears] = useState('');
    const [reason, setReason] = useState('');
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName);
        history.push("/thank-you");
    }

    return (
        <div className="form-container">
            <h2>K2 Climbing Application Form</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="FirstName">First Name*</label>
                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" id="firstName" name="firstName" />

                <label htmlFor="LastName">Last Name*</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" id="lastName" name="lastName" />

                <label htmlFor="Age">Age*</label>
                <input required value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="" id="age" name="age" />

                <label htmlFor="Street">Street*</label>
                <input required value={street} onChange={(e) => setStreet(e.target.value)} type="text" placeholder="100 Street Ave" id="street" name="street" />

                <label htmlFor="Country">Country*</label>
                <input required value={country} onChange={(e) => setCountry(e.target.value)} type="text" placeholder="USA" id="country" name="country" />

                <label htmlFor="Phone Number">Phone Number*</label>
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+***-***-****" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="phone" name="phone" />
  
                <label htmlFor="Email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="emaill" name="email" />

                <label htmlFor="Years">Years of Climbing Experience</label>
                <input value={years} onChange={(e) => setYears(e.target.value)} type="number" placeholder="" id="years" name="years" />

                <label htmlFor="Reason">Why do you want to climb K2?</label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="4" cols="50" placeholder="" id="reason" name="reason" />

                <h7>* = Required</h7>
                <button className="submit-button" type="submit">Submit Application</button>
            </form>
        </div>
    )
}

export default Form;