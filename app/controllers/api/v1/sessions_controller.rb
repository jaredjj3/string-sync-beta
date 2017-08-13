class Api::SessionsController < ApplicationController
  def create
    email = params[:user][:email]
    password = params[:user][:password]
    @user = User.find_by_credentials(email, password)

    if @user
      login(@user)
      render("api/v1/users/show", status: 200)
    else
      render("api/v1/users/errors", status: 422)
    end
  end

  def destroy
    logout
    render(json: {}, status: 200)
  end
end
