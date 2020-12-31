class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]

  # GET /orders
  def index
    if params[:doctor_id]
      @doctor = Doctor.find(params[:doctor_id])

      render json: @doctor, include: :orders
    elsif params[:patient_id]
      @patient = Patient.find(params[:patient_id])

      render json: @patient, include: [:orders, {orders: {include: :medication}}]
    else
      @orders = Order.all

      render json: @orders
    end
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.new(order_params)

    if @order.save
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:date, :medication_id, :patient_id, :doctor_id, :pharmacy_address)
    end
end
