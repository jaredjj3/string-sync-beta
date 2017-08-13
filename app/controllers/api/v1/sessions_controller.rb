class Api::V1::SessionsController < ApplicationController
  def create
    username = params[:user][:username]
    password = params[:user][:password]
    @user = User.find_by_credentials(username, password)

    if @user
      login(@user)
      render(:login, status: 200)
    else
      errors = { errors: { messages: ["invalid username or password"] } }
      render(json: errors, status: 422)
    end
  end

  def destroy
    logout
    render(json: {}, status: 200)
  end
end
