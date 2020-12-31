class PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :update, :destroy]

  # GET /patients
  def index
    if params[:doctor_id]
      @doctor = Doctor.find(params[:doctor_id])

      render json: @doctor, include: {patients: {include: :medications}}
    else
      @patients = Patient.all

      render json: @patients
    end
  end

  # GET /patients/1
  def show
    render json: @patient, include: [:doctors, :medications, :orders, {orders: {include: :medication}}]
  end

  # POST /patients
  def create
    @patient = Patient.new(patient)
    
    if @patient.save
      @token = encode({id: @patient.id})
      render json: {
        patient: @patient.attributes.except(:password_digest),
        token: @token
        }, status: :created
    else
      render json: @patient.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /patients/1
  def update
    if @patient.update(patient_params)
      render json: @patient
    else
      render json: @patient.errors, status: :unprocessable_entity
    end
  end

  # DELETE /patients/1
  def destroy
    @patient.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient
      @patient = Patient.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def patient_params
      params.require(:patient).permit(:first_name, :last_name, :date_of_birth, :email, :password)
    end
end
