class AuthenticationController < ApplicationController
  before_action :authorize_request, except: [:login_doctor, :login_patient]

  # POST /auth/login
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
  
  # GET /auth/verify
  def verify
    render json: @current_user.attributes.except(:password_digest), status: :ok
  end


  private

  def login_doctor_params
    params.require(:authentication).permit(:email, :password)
  end

  def login_patient_params
    params.require(:authentication).permit(:email, :password)
  end

end
