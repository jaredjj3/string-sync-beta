class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user
  helper_method :logged_in?

  private

    def render_errors(messages, status = 500)
      json_response = { type: :error, messages: Array.wrap(messages) }
      render(json: json_response, status: status)
    end

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
end
