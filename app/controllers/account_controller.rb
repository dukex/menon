class AccountController < ApplicationController
  def show
    @enrollments = current_user.enrollments
  end
end