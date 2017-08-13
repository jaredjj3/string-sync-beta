class Api::V1::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render(:show, status: 200)
    else
      render(json: @user.errors_as_json, status: 422)
    end
  end

  def show
    @user = User.find(params.require(:id))

    if @user && logged_in_as?(:admin)
      render(:show, status: 200)
    else
      errors = [{ type: :error, messages: ["unauthorized to show user"] }]
      render(json: errors, status: 401)
    end
  end

  def update
    @user = User.find(params[:id])

    if @user == current_user || logged_in_as?(:admin)
      if @user.update(user_params)
        render(:show, status: 200)
      else
        render(json: @user.errors_as_json, status: 301)
      end
    else
      errors = [{ type: :error, messages: ["unauthorized to update user"] }]
      render(json: errors, status: 401)
    end
  end

  def destroy
  end

  private
  
    def user_params
      params.
          require(:user).
          permit(*%i(email username password))
    end
end
