class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :logged_in?

  private

    def current_user
      session_token = session[:session_token]
      return nil unless session_token
      @current_user ||= User.find_by(session_token: session_token)
    end

    def logged_in?
      !!current_user
    end

    def login(user)
      session[:session_token] = user.reset_session_token!
    end

    def logout
      return unless current_user
      current_user.reset_session_token!
      @current_user = nil
      session[:session_token] = nil
    end

    def logged_in_as?(role)
      raise ArgumentError.new("must be a symbol or a role") if !role.is_a?(Symbol) && !role.is_a?(Role)
      role = Role.where(name: role).first! if role.is_a?(Symbol)
      logged_in? && current_user.roles.include?(role)
    end
end
