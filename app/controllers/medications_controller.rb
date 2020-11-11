class MedicationsController < ApplicationController
  before_action :set_medication, only: [:show, :update, :destroy]

  # GET /medications
  def index
    if params[:patient_id]
      @patient = Patient.find(params[:patient_id])

      render json: @patient, include: :medications
    else params[:order_id]
      @order = Order.find(params[:order_id])

      render json: @order, include: :medications
    else
      @medications = Medication.all

      render json: @medications
    end
  end

  # GET /medications/1
  def show
    render json: @medication
  end

  # POST /medications
  def create
    @medication = Medication.new(medication_params)

    if @medication.save
      render json: @medication, status: :created, location: @medication
    else
      render json: @medication.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /medications/1
  def update
    if @medication.update(medication_params)
      render json: @medication
    else
      render json: @medication.errors, status: :unprocessable_entity
    end
  end

  # DELETE /medications/1
  def destroy
    @medication.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_medication
      @medication = Medication.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def medication_params
      params.require(:medication).permit(:name, :dosage, :patient_id)
    end
end
