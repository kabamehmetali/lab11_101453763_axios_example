import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class PersonList extends Component {
    state = {
        persons: [],
        selectedPerson: null,
        showModal: false
    };

    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                const persons = res.data.results;
                this.setState({ persons });
            });
    }

    handleDetailsClick = (person) => {
        this.setState({
            selectedPerson: person,
            showModal: true
        });
    };

    handleCloseModal = () => {
        this.setState({
            showModal: false,
            selectedPerson: null
        });
    };

    render() {
        const { persons, selectedPerson, showModal } = this.state;

        return (
            <div>
                {/* Header */}
                <div style={{ backgroundColor: '#28a745', padding: '20px' }}>
                    <h1 className="text-center ">User List</h1>
                </div>

                {/* Content */}
                <div className="container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                    {persons.map(person => (
                        <div
                            key={person.login.uuid}
                            className="card mb-4"
                            style={{ backgroundColor: '#17a2b8', color: 'white' }}
                        >
                            <div className="row g-0">
                                <div className="col-md-3 d-flex flex-column align-items-center justify-content-center p-3">
                                    <img
                                        src={person.picture.large}
                                        alt={`${person.name.first}`}
                                        className="rounded-circle img-fluid mb-3"
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => this.handleDetailsClick(person)}
                                    >
                                        Details
                                    </button>
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">{`${person.name.title} ${person.name.first} ${person.name.last}`}</h5>
                                        <p className="card-text">
                                            <strong>User Name:</strong> {person.login.username}<br />
                                            <strong>Gender:</strong> {person.gender.toUpperCase()}<br />
                                            <strong>Time Zone Description:</strong> {person.location.timezone.description}<br />
                                            <strong>Address:</strong> {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`}<br />
                                            <strong>Email:</strong> {person.email}<br />
                                            <strong>Birth Date and Age:</strong> {`${person.dob.date.substring(0, 10)} (${person.dob.age})`}<br />
                                            <strong>Register Date:</strong> {person.registered.date.substring(0, 10)}<br />
                                            <strong>Phone:</strong> {person.phone}<br />
                                            <strong>Cell:</strong> {person.cell}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && selectedPerson && (
                    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {`${selectedPerson.name.title} ${selectedPerson.name.first} ${selectedPerson.name.last}`}
                                    </h5>
                                    <button className="btn-close" onClick={this.handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>User Name:</strong> {selectedPerson.login.username}</p>
                                    <p><strong>Gender:</strong> {selectedPerson.gender.toUpperCase()}</p>
                                    <p><strong>Email:</strong> {selectedPerson.email}</p>
                                    <p><strong>Address:</strong> {`${selectedPerson.location.street.number} ${selectedPerson.location.street.name}, ${selectedPerson.location.city}, ${selectedPerson.location.state}, ${selectedPerson.location.country}`}</p>
                                    <p><strong>Phone:</strong> {selectedPerson.phone}</p>
                                    <p><strong>Cell:</strong> {selectedPerson.cell}</p>
                                    <p><strong>Time Zone:</strong> {selectedPerson.location.timezone.description}</p>
                                    <p><strong>Birth Date:</strong> {selectedPerson.dob.date.substring(0, 10)}</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={this.handleCloseModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default PersonList;
