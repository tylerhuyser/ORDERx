# ORDERx

## OVERVIEW

<img src="https://i.imgur.com/LeWkV9s.png" width="40%" />

**ORDERx** is a React-on-Rails application that helps doctors and patients manage their medications.

[Deployed Site](https://confident-keller-484552.netlify.app/) can be accessed here.

## FEATURES

ORDERx gives users the ability order and manage their medications in one place.

### Two User Classes & System Authentication

ORDERx primarily has two types of users: doctors and patients. Managing these two classes of users in relation to authentication posed a unique challenge.

Typically, a single model would be used to create users. An attribute would be used to distinguish  different categories of users. For example, an app that includes administrators and students could use a Boolean "admin" attribute to 

 For example, for an app that includes administrators and employees, one could include an "admin" attribute which could 

Typically, in order to balance two categories of users, one would use one model and distingush between the two using a boolean attribute. For example, an app that included administrators and employees would use one User model that would contain a boolean (i.e. true/false) attribute for "admin".

However, in this case, doctors and patients could not share one model; there were two many unique attributes among the two. You can view the schema below:

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

In order to accomodate authorization for these two different classes of users, two different authorization controllers had to be built:

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

<img src="https://i.imgur.com/eJ69BPu.png" width="60%" />

A "Login Router" component was built in order to direct the system to the appropriate controller. By selecting either "provider" or "patient", a User to able to ensure that the proper method handles authentication.

<img src="https://i.imgur.com/9sfnQb1.png" width="60%" />

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

As aforementioned, the app primarily enables users to manage their medication orders. When the log in, they are immediately presented with "pending" (i.e. unfilled) orders. Altneratively, they can navigate to the "Orders" tab in order to view a complete directory of their prior orders.

<img src="https://i.imgur.com/44ReaC7.png" width="40%" />

If a user would like to create a new order, they can do so using the "Create Order" form. 

<img src="https://i.imgur.com/gWVLkF4.png" width="60%" />

If the creation of a new doctor, patient, or medication is required to complete the new order, users may create these respective items by expanding their corresponding creation forms.

<img src="https://i.imgur.com/gWVLkF4.png" width="60%" /> **xx**

Furthermore, users may update or destrou any pending orders by clicking on the correspoinding "edit" and "delete" icons located on the corresponding order card.

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

The data structure of ORDERx becomes quite complex because of the has-many-and-belong-to-many nature of the doctor and patient relationship.

A doctor has many patients, while a paitient has many doctors.

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


