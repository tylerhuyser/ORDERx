# ORDERx

## OVERVIEW

<img src="https://i.imgur.com/LeWkV9s.png" width="40%" />

**ORDERx** is a React-on-Rails application that helps doctors and patients manage their medications.

[Deployed Site](https://confident-keller-484552.netlify.app/) can be accessed here.

## FEATURES

ORDERx gives users the ability order and manage their medications in one place.

### Two User Classes & System Authentication

<img src="https://i.imgur.com/eJ69BPu.png" width="60%" />

Two types of users use ORDERx: doctors and patients. Creating a system to manage these two unique user models posed a unique challenge. 

Typically, *one* model would be used to create all categories of users. An attribute would be used to distingush between different categories. For example, an app that incudes administrators and students might use an "admin" attribute that would receive a Boolean value. "True" would indicate that the user is an administrator whereas "false" would incidcate that the user is a student.

However, in *this* case, doctors and patients could not share a single model. Each user category has its own, unique attributes. For example, the patient model requires attributes like "social security number", "date of birth", and "primary care physician". You can view the schema for these two models below:

```
  create_table "doctors", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

    create_table "patients", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.date "date_of_birth"
    t.string "social_security"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "primary_care_doctor_id"
    t.index ["doctor_id"], name: "index_patients_on_doctor_id"
  end

```

In order to accomodate authorization for these two different classes of users, I had to create two different login methods:

```

  def login_doctor
    @doctor = Doctor.find_by(email: login_doctor_params[:email])
    if @doctor.authenticate(login_doctor_params[:password]) #authenticate method provided by Bcrypt and 'has_secure_password'
      token = encode({id: @doctor.id})
      render json: {
        doctor: @doctor.attributes.except(:password_digest),
        token: token
        }, status: :ok
    else
      render json: { errors: 'unauthorized' }, status: :unauthorized
    end
  end

  def login_patient
    @patient = Patient.find_by(email: login_patient_params[:email])
    if @patient.authenticate(login_patient_params[:password]) #authenticate method provided by Bcrypt and 'has_secure_password'
      token = encode({id: @patient.id})
      render json: {
        patient: @patient.attributes.except(:password_digest),
        token: token
        }, status: :ok
    else
      render json: { errors: 'unauthorized' }, status: :unauthorized
    end
  end

```
<img src="https://i.imgur.com/9sfnQb1.png" width="400px" /> <img src="https://i.imgur.com/PTp4VaK.png" height="225px" margin="25px" />

A "Login Router" component was built in order to direct the system to the appropriate login method. By selecting either "provider" or "patient", a user to able to ensure that the the system uses the proper method to handle authentication.

<img src="https://giphy.com/709b0fa3-6310-4dee-9b26-5abc737cab17" width="400px" />

```

const handlePatient = () => {
  setUserCategory("patient")
  history.push('/patient-login')
}

const handleDoctor = () => {
  setUserCategory("doctor")
  history.push('/doctor-login')
}

<div className="user-type-buttons-container">
              
  <Link to="patient-login"><button className="login-router-button" id="patient-login-button" onClick={handlePatient}>PATIENT</button></Link> 
                
  <Link to="doctor-login"><button className="login-router-button" id="doctor-login-button" onClick={handleDoctor}>PROVIDER</button></Link>  
                
</div>

```

### Full-CRUD Functionality

<img src="https://i.imgur.com/OifkX2M.png" width="60%" />

ORDERx helps users manage their medications. Specifically, it allows users to get, create, edit, and delete medication orders. 

When a user logs in, they are immediately presented with any "pending" (i.e. "unfilled") orders. Alternatively, they can navigate to the "Orders" tab in order to view a complete directory of their previous orders.

<img src="https://i.imgur.com/44ReaC7.png" width="40%" />

If a user would like to create a *new* order, they can do so using the "Create Order" form. 

<img src="https://i.imgur.com/gWVLkF4.png" width="60%" />

If the creation of a new doctor, patient, or medication is required to complete the new order, users may create each respective item by expanding it corresponding creation module.

<img src="https://i.imgur.com/gWVLkF4.png" width="60%" /> **xx**

Finally, users may update or destroy any pending orders by clicking the "edit" or "delete" icons located in the lower right corner of each order card.

<img src="blob:https://imgur.com/3d4a0fec-49a5-4237-b955-96c785f544f5" width="40%" />

### Order Search

Users are able to search their pending orders by doctor/patient name, address, date, or medication. Given that doctor, patient, and medication names are stored as ids, in order to facilitate this feature

```

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
    setQueriedOrders([])
    if (e.target.value.length > 2) {

      setQueriedOrders([])

      if (userCategory === 'doctor') {

        const filteredPatients = patients.filter((patient) => (patient.first_name.toLowerCase().includes(e.target.value.toLowerCase()) || patient.last_name.toLowerCase().includes(e.target.value.toLowerCase()) ))
        
        const filteredMedications = medications.filter((medication) => (medication.name.toLowerCase().includes(e.target.value.toLowerCase())))

        const newQueriedOrders = orders.filter((order) => ((order.pharmacy_address.toLowerCase().includes(e.target.value.toLowerCase())) || (order.date.toLowerCase().includes(e.target.value.toLowerCase())) || (filteredMedications.some(medication => (medication.id === order.medication_id))) || (filteredPatients.some(patient => (patient.id === order.patient_id)))))

        setQueriedOrders(newQueriedOrders)

      } else if (userCategory === 'patient') {

        const filteredDoctors = doctors.filter((doctor) => (doctor.first_name.toLowerCase().includes(e.target.toLowerCase()) || doctor.last_name.toLowerCase().includes(e.target.toLowerCase())))
        
        const filteredMedications = medications.filter((medication) => (medication.name.toLowerCase().includes(e.target.value.toLowerCase())))

        const newQueriedOrders = orders.filter((order) => ((order.pharmacy_address.toLowerCase().includes(e.target.value.toLowerCase())) || (order.date.toLowerCase().includes(e.target.value.toLowerCase())) || (filteredMedications.some(medication => (medication.id === order.medication_id))) || (filteredDoctors.some(doctor => (doctor.id === order.doctor_id)))))

        setQueriedOrders(newQueriedOrders)
      }
    }
  }

```

## Data Structure

The has-many-any-belongs-to-many nature of the patient-doctor relationship creates its challenges. A doctor can have many patients, while a patient can have many doctors.

<img src="https://i.imgur.com/1t4Nyn2.png" width="40%">


## Key Components

Key components include:

* Login Container

** Login Router

** Login

** Register

* Main Container

** Home

** Orders

** CreateOrder

** EditOrder

* utils

** CreatePatient

** CreateDoctor

** CreateMedication

** Search

## Component Heirarchy

<img src="https://i.imgur.com/N37oXyU.png" width="80%" />

## Repo Structure

```
|_db
             |_migrate
             |_schema.rb
             |_seeds.rb
|_app
             |_controllers
                          |_authentication_controller.rb
                          |_application_controller.rb
                          |_doctors_controller.rb
                          |_medications_controller.rb
                          |_orders_controller.rb
                          |_patients_controller.rb
             |_models
                          |_doctor.rb
                          |_medication.rb
                          |_order.rb
                          |_patient.rb
|_config
             |_routes
|_client
             |_src
                  |_app.js
                  |_components
                              |_Layout
                              |_Medication
                              |_Order 
                              |_Patient
                              |_Search                  
                  |_containers
                              |_MainContainer
                              
                  |_screens
                              |_Home
                              |_Login
                  |_services

                              |_api-config.js
                              |_auth.js
                              |_medications.js
                              |_orders.js
                              |_users.js

```


