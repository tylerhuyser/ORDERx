class ApplicationController < ActionController::API
  SECRET_KEY = Rails.application.secrets.secret_key_base.to_s

  def encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end

  def authorize_request
      header = request.headers['Authorization']
      @userCategory = request.headers['User-Category']
      puts @userCategory
      header = header.split(' ').last if header
      begin
        @decoded = decode(header)
        # @current_user = determine_user_model(@decoded[:id])
        @current_user = determine_user_model(@decoded[:id], @userCategory)
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e.message }, status: :unauthorized
      rescue JWT::DecodeError => e
        render json: { errors: e.message }, status: :unauthorized
      end
    end

  def determine_user_model(decoded, userCategory)
    @decoded = decoded
    @userCategory = userCategory
    if @userCategory === 'patient'
      puts 'user is a patient'
      @user = Patient.find(@decoded)
    elsif @userCategory === 'doctor'
      puts 'user is a doctor'
      @user = Doctor.find(@decoded)
    else
      puts 'user is neither a doctor or patient'
    end
    return @user
  end

  # def determine_user_model(props)
  #   @decoded = props
  #   if Doctor.exists?(@decoded)
  #     @user = Doctor.find(@decoded)
  #     puts 'here 1'
  #   elsif Patient.exists?(@decoded)
  #     @user = Patient.find(@decoded)
  #     puts 'here 2'
  #   else
  #     puts 'no user'
  #   end
  #   return @user
  # end

  # def determine_user_model(props)
  #   @decoded = props
  #   puts @decoded
  #   if Doctor.exists?(@decoded)
  #     @user = Patient.find(@decoded)
  #     puts 'here 2'
  #   else
  #     @user = Doctor.find(@decoded)
  #     puts 'here 1'
  #   end
  #   return @user
  # end


end
