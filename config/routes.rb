Rails.application.routes.draw do
  post '/auth/patient', to: 'authentication#login_patient'
  post '/auth/doctor', to: 'authentication#login_doctor'
  get '/auth/verify', to: 'authentication#verify'
  get 'doctors/:doctor_id/patients', to: 'patients#index'
  get 'patients/:patient_id/doctors', to: 'doctors#index'
  get '/patients/:patient_id/medications', to: 'medications#index'
  get '/patients/:patient_id/orders', to: 'orders#index'
  get 'orders/:order_id/medications', to: 'medications#index'
  get "/up", to: ->(_) { [200, {}, ["OK"]] }


  resources :patients
  resources :doctors
  resources :orders
  resources :medications
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
