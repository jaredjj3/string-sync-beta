class Api::V1::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render(:show, status: 200)
    else
      render(json: @user.errors.full_messages, status: 422)
    end
  end

  def show
    @user = User.find(params.require(:id))
    authorized = @user && current_user.try(:has_role?, :admin)

    if authorized
      render(:show, status: 200)
    else
      render_errors("unauthorized to show user", 401)
    end
  end

  def update
    @user = User.find(params[:id])
    authorized = @user == current_user || logged_in_as?(:admin)

    if authorized
      if @user.update(user_params)
        render(:show, status: 200)
      else
        render_errors(user.errors.full_messages, 422)
      end
    else
      render_errors("unauthorized to update user", 401)
    end
  end

  def destroy
    @user = User.find(params[:id])
    authorized = logged_in_as?(:admin)

    if authorized
      if @user.destroy
        render(:show, status: 200)
      else
        render_errors(user.errors.full_messages, 422)
      end
    else
      render_errors("unauthorized to destroy user", 401)
    end
  end

  private

    def user_params
      params.
          require(:user).
          permit(*%i(email username password))
    end
end
