class DoctorsController < ApplicationController
  before_action :set_doctor, only: [:show, :update, :destroy]

  # GET /doctors
  def index
    if params[:patient_id]
      @patient = Patient.find(params[:patient_id])

      render json: @patient, include: {doctors: {include: :medications}}
    else
      @doctors = Doctor.all

      render json: @doctors
    end
  end

  # GET /doctors/1
  def show
    render json: @doctor, include: [:patients, {patients: {include: [:medications, :orders]}}, :orders]
  end

  # POST /doctors
  def create
    @doctor = Doctor.new(doctor_params)
    
    if @doctor.save
      @token = encode({id: @doctor.id})
      render json: {
        doctor: @doctor.attributes.except(:password_digest),
        token: @token
        }, status: :created
    else
      render json: @doctor.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /doctors/1
  def update
    if @doctor.update(doctor_params)
      render json: @doctor
    else
      render json: @doctor.errors, status: :unprocessable_entity
    end
  end

  # DELETE /doctors/1
  def destroy
    @doctor.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_doctor
      @doctor = Doctor.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def doctor_params
      params.require(:doctor).permit(:first_name, :last_name, :email, :password)
    end
end
